import { NextRequest, NextResponse } from "next/server";
import { getAuthToken, submitContactEnquiryFormDetails } from "@/api/CMS.api";
import { AuthTokenResponse } from "@/interfaces";
import ApiException from "@/api/Api.exception";
import { checkRateLimit } from "@/lib/rate-limit";

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  const xClientIp = request.headers.get("x-client-ip");

  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    realIp ||
    cfConnectingIp ||
    xClientIp ||
    null;

  const isLocalhost =
    !ip ||
    ip === "::1" ||
    ip === "127.0.0.1" ||
    ip === "localhost" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip);

  if (isLocalhost && forwardedFor) {
    const ips = forwardedFor.split(",").map((ip) => ip.trim());
    const publicIp = ips.find(
      (ip) =>
        ip &&
        ip !== "::1" &&
        ip !== "127.0.0.1" &&
        !ip.startsWith("192.168.") &&
        !ip.startsWith("10.") &&
        !ip.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./)
    );
    if (publicIp) return publicIp;
  }

  return ip && !isLocalhost ? ip : "127.0.0.1";
}

export async function POST(request: NextRequest) {
  const blocked = await checkRateLimit(request, "contact");

  if (blocked) return blocked;

  try {
    const formData = await request.formData();
    const enquiryFirstName = formData.get("enquiry_first_name") as string;
    const enquiryLastName = formData.get("enquiry_last_name") as string;
    const enquiryReason = formData.get("enquiry_reason") as string;
    const enquiryEmailId = formData.get("enquiry_email_id") as string;
    const enquiryMobileNumber = formData.get("enquiry_mobile_number") as string;
    const enquiryMessage = formData.get("enquiry_message") as string;

    if (
      !enquiryFirstName ||
      !enquiryLastName ||
      !enquiryEmailId ||
      !enquiryMobileNumber
    ) {
      return NextResponse.json(
        {
          error:
            "enquiry_first_name, enquiry_last_name, enquiry_email_id, and enquiry_mobile_number are required",
        },
        { status: 400 }
      );
    }

    const ipAddress = getClientIp(request);

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

    const result = await submitContactEnquiryFormDetails(
      token,
      enquiryFirstName,
      enquiryLastName,
      enquiryReason || "",
      enquiryEmailId,
      enquiryMobileNumber,
      enquiryMessage || "",
      ipAddress,
      request.headers.get("referer") || ""
    );
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error submitting contact enquiry:", error);

    if (error instanceof ApiException) {
      const statusCode = error.statusCode || 500;
      if (error.response && typeof error.response === "object") {
        const errorResponse = error.response as {
          errors?: Array<{ path?: string; msg?: string; message?: string }>;
          error?: {
            errors?: Array<{ path?: string; msg?: string; message?: string }>;
            message?: string;
          };
          message?: string;
        };
        const errors = errorResponse.errors || errorResponse.error?.errors;
        if (errors && Array.isArray(errors) && errors.length > 0) {
          const firstError = errors[0];
          const errorMessage =
            firstError.msg ||
            firstError.message ||
            error.message ||
            "An error occurred";
          return NextResponse.json(
            { error: errorMessage, errors },
            { status: statusCode }
          );
        }
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
      return NextResponse.json(
        { error: error.message || "Failed to submit contact enquiry" },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit contact enquiry" },
      { status: 500 }
    );
  }
}
