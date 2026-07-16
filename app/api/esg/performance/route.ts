import { NextResponse } from "next/server";
import ApiException from "@/api/Api.exception";
import { getEsgPerformance } from "@/api/CMS.api";

export async function GET() {
  try {
    const result = await getEsgPerformance();

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching ESG performance:", error);

    if (error instanceof ApiException) {
      const statusCode = error.statusCode || 500;
      return NextResponse.json(
        { error: error.message || "Failed to fetch ESG performance" },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch ESG performance" },
      { status: 500 }
    );
  }
}
