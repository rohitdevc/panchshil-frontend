import { NextResponse } from "next/server";
import ApiException from "@/api/Api.exception";
import { getClients } from "@/api/CMS.api";

export async function GET() {
  try {
    const result = await getClients();

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching clients:", error);

    if (error instanceof ApiException) {
      const statusCode = error.statusCode || 500;
      return NextResponse.json(
        { error: error.message || "Failed to fetch clients" },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}
