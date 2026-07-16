import { NextResponse } from "next/server";
import ApiException from "@/api/Api.exception";
import { getAwards } from "@/api/CMS.api";

export async function GET() {
  try {
    const result = await getAwards();

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching awards:", error);

    if (error instanceof ApiException) {
      const statusCode = error.statusCode || 500;
      return NextResponse.json(
        { error: error.message || "Failed to fetch awards" },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch awards" },
      { status: 500 }
    );
  }
}
