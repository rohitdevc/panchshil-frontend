import { NextResponse } from "next/server";
import ApiException from "@/api/Api.exception";
import { getTestimonials } from "@/api/CMS.api";

export async function GET() {
  try {
    const result = await getTestimonials();

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);

    if (error instanceof ApiException) {
      const statusCode = error.statusCode || 500;
      return NextResponse.json(
        { error: error.message || "Failed to fetch testimonials" },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
