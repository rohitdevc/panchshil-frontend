import { NextResponse } from "next/server";
import { getAuthToken } from "@/api/CMS.api";
import { getEnquiryPropertyList } from "@/api/property";

export async function GET() {
  try {
    const propertiesData = await getEnquiryPropertyList();

    return NextResponse.json(propertiesData);
  } catch (error) {
    console.error("Error fetching enquiry property list:", error);
    return NextResponse.json(
      { error: "Unexpected error while fetching properties" },
      { status: 500 }
    );
  }
}
