import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/api/CMS.api";
import { submitPropertyEnquiryFormDetails } from "@/api/property";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const tokenData = (await getAuthToken()) as { token?: string };
    const token = tokenData?.token;

    if (!token) {
      return NextResponse.json(
        { error: "Failed to retrieve auth token" },
        { status: 500 }
      );
    }

    const ipAddressHeader =
      req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
    let ipAddress = ipAddressHeader
      ? ipAddressHeader.split(",")[0]?.trim()
      : "0.0.0.0";

    if (!ipAddress || ipAddress === "::1") {
      ipAddress = "0.0.0.0";
    }

    // submitPropertyEnquiryFormDetails also returns parsed JSON
    const apiData = (await submitPropertyEnquiryFormDetails(
      token,
      body.firstName,
      body.lastName,
      body.contactNumber,
      body.email,
      body.propertyName,
      body.message ?? "",
      ipAddress,
      body.referer_url || req.headers.get("referer") || ""
    )) as unknown;

    return NextResponse.json(apiData);
  } catch (error: unknown) {
    console.error("Error submitting property enquiry form:", error);

    if (typeof error === "object" && error !== null && "response" in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const apiError = (error as any).response;
      console.error(
        "Property enquiry API error response:",
        JSON.stringify(apiError, null, 2)
      );
    }

    return NextResponse.json(
      { error: "Unexpected error while submitting enquiry" },
      { status: 500 }
    );
  }
}
