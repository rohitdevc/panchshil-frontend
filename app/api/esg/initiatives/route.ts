import { NextResponse } from "next/server";
import ApiException from "@/api/Api.exception";
import { getEsgInitiatives } from "@/api/CMS.api";

export async function GET() {
  try {
    const result = await getEsgInitiatives();

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching ESG initiatives:", error);

    if (error instanceof ApiException) {
      const statusCode = error.statusCode || 500;
      return NextResponse.json(
        { error: error.message || "Failed to fetch ESG initiatives" },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch ESG initiatives" },
      { status: 500 }
    );
  }
}
