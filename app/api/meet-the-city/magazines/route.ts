import { NextResponse } from "next/server";
import ApiException from "@/api/Api.exception";
import { getMeetTheCityMagazines } from "@/api/CMS.api";

export async function GET() {
  try {
    const result = await getMeetTheCityMagazines();

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching Meet The City magazines:", error);

    if (error instanceof ApiException) {
      const statusCode = error.statusCode || 500;
      return NextResponse.json(
        { error: error.message || "Failed to fetch magazines" },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch magazines" },
      { status: 500 }
    );
  }
}
