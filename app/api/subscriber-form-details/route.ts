import { NextRequest, NextResponse } from "next/server";
import { getAuthToken, updateSubscriberFormDetails } from "@/api/CMS.api";
import { AuthTokenResponse } from "@/interfaces";
import ApiException from "@/api/Api.exception";

function getClientIp(request: NextRequest): string {
  // Check various headers for the real client IP
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip"); // Cloudflare
  const xClientIp = request.headers.get("x-client-ip");

  // Try to get IP from headers first
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    realIp ||
    cfConnectingIp ||
    xClientIp ||
    null;

  // Check if IP is localhost/loopback (::1, 127.0.0.1, etc.)
  const isLocalhost =
    !ip ||
    ip === "::1" ||
    ip === "127.0.0.1" ||
    ip === "localhost" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip);

  // If IP is localhost and we have forwarded-for with multiple IPs, try the second one
  if (isLocalhost && forwardedFor) {
    const ips = forwardedFor.split(",").map((ip) => ip.trim());
    // Skip localhost IPs and get the first public IP
    const publicIp = ips.find(
      (ip) =>
        ip &&
        ip !== "::1" &&
        ip !== "127.0.0.1" &&
        !ip.startsWith("192.168.") &&
        !ip.startsWith("10.") &&
        !ip.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./)
    );
    if (publicIp) {
      return publicIp;
    }
  }

  // Return the IP if it's valid, otherwise return "unknown"
  return ip && !isLocalhost ? ip : "127.0.0.1";
}

export async function POST(request: NextRequest) {
  try {
    // Parse form data from request
    const formData = await request.formData();
    const subscriberEmailId = formData.get("subscriber_email_id") as string;

    // Get IP address from request headers
    const ipAddress = getClientIp(request);

    // Validate required fields
    if (!subscriberEmailId) {
      return NextResponse.json(
        { error: "subscriber_email_id is required" },
        { status: 400 }
      );
    }

    let token: string | null = null;
    try {
      const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
      if (tokenResponse?.token && typeof tokenResponse.token === "string") {
        token = tokenResponse.token;
      }
    } catch (error) {
      console.error("Error fetching auth token:", error);
      return NextResponse.json(
        { error: "Failed to authenticate" },
        { status: 500 }
      );
    }

    if (!token) {
      return NextResponse.json(
        { error: "Authentication token not available" },
        { status: 500 }
      );
    }

    // Call the updateSubscriberFormDetails API
    const result = await updateSubscriberFormDetails(
      token,
      subscriberEmailId,
      ipAddress,
      request.headers.get("referer") || ""
    );
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error updating subscriber form details:", error);

    // Handle ApiException with structured error response
    if (error instanceof ApiException) {
      const statusCode = error.statusCode || 500;

      // Check if the error response has the errors array structure
      if (error.response && typeof error.response === "object") {
        const errorResponse = error.response as {
          errors?: Array<{ path?: string; msg?: string; message?: string }>;
          error?: {
            errors?: Array<{ path?: string; msg?: string; message?: string }>;
            message?: string;
          };
          message?: string;
        };

        // Check for errors array in the response (could be directly in response or nested)
        const errors = errorResponse.errors || errorResponse.error?.errors;

        if (errors && Array.isArray(errors) && errors.length > 0) {
          // Extract the first error message
          const firstError = errors[0];
          const errorMessage =
            firstError.msg ||
            firstError.message ||
            error.message ||
            "An error occurred";

          return NextResponse.json(
            {
              error: errorMessage,
              errors: errors,
            },
            { status: statusCode }
          );
        }

        // Check for error message directly
        if (errorResponse.message || errorResponse.error?.message) {
          return NextResponse.json(
            {
              error:
                errorResponse.message ||
                errorResponse.error?.message ||
                error.message,
            },
            { status: statusCode }
          );
        }
      }

      // Fallback to the exception message
      return NextResponse.json(
        { error: error.message || "Failed to update subscriber form details" },
        { status: statusCode }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: "Failed to update subscriber form details" },
      { status: 500 }
    );
  }
}
