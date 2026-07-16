import { NextResponse } from "next/server";
import ApiException from "@/api/Api.exception";
import { getPrecFaqs } from "@/api/CMS.api";

export async function GET() {
  try {
    const result = await getPrecFaqs();

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching PREC FAQs:", error);

    if (error instanceof ApiException) {
      const statusCode = error.statusCode || 500;
      return NextResponse.json(
        { error: error.message || "Failed to fetch PREC FAQs" },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch PREC FAQs" },
      { status: 500 }
    );
  }
}
