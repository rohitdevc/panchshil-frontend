import { NextResponse } from "next/server";
import ApiException from "@/api/Api.exception";
import { getContactUsReasons } from "@/api/CMS.api";

export async function GET() {
  try {
    const result = await getContactUsReasons();

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching contact us reasons:", error);

    if (error instanceof ApiException) {
      const statusCode = error.statusCode || 500;
      return NextResponse.json(
        { error: error.message || "Failed to fetch contact us reasons" },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch contact us reasons" },
      { status: 500 }
    );
  }
}
