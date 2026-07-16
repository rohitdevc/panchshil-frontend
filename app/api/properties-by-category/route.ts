import { NextRequest, NextResponse } from "next/server";
import ApiException from "@/api/Api.exception";
import API_CONSTANTS from "@/api/constants";

// Pagination constant - items per page
const PER_PAGE_LIMIT = 5;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyCategoryUrlSlug = searchParams.get(
      "property_category_url_slug"
    );
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;

    // Validate required fields
    if (!propertyCategoryUrlSlug) {
      return NextResponse.json(
        { error: "property_category_url_slug is required" },
        { status: 400 }
      );
    }

    // Validate page number
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 400 }
      );
    }

    // Calculate pagination parameters
    const limit = PER_PAGE_LIMIT * page;
    const skip = PER_PAGE_LIMIT * (page - 1);

    // Build the API URL with query parameters
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT || "";
    const apiPath = API_CONSTANTS.PROPERTIES_BY_CATEGORY.replace(
      "{property_category_url_slug}",
      propertyCategoryUrlSlug
    );
    const apiUrl = `${baseUrl}${apiPath}?limit=${limit}&skip=${skip}`;

    // Call the API directly using fetch
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching for paginated requests
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiException(
        `Failed to fetch properties: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      data: result,
      page,
      limit,
      skip,
    });
  } catch (error) {
    console.error("Error fetching properties by category:", error);

    // Handle ApiException with structured error response
    if (error instanceof ApiException) {
      const statusCode = error.statusCode || 500;

      // Check if the error response has the errors array structure
      if (error.response && typeof error.response === "object") {
        const errorResponse = error.response as {
          errors?: Array<{ path?: string; msg?: string; message?: string }>;
          error?: {
            errors?: Array<{ path?: string; msg?: string; message?: string }>;
            message?: string;
          };
          message?: string;
        };

        // Check for errors array in the response (could be directly in response or nested)
        const errors = errorResponse.errors || errorResponse.error?.errors;

        if (errors && Array.isArray(errors) && errors.length > 0) {
          // Extract the first error message
          const firstError = errors[0];
          const errorMessage =
            firstError.msg ||
            firstError.message ||
            error.message ||
            "An error occurred";

          return NextResponse.json(
            {
              error: errorMessage,
              errors: errors,
            },
            { status: statusCode }
          );
        }

        // Check for error message directly
        if (errorResponse.message || errorResponse.error?.message) {
          return NextResponse.json(
            {
              error:
                errorResponse.message ||
                errorResponse.error?.message ||
                error.message,
            },
            { status: statusCode }
          );
        }
      }

      // Fallback to the exception message
      return NextResponse.json(
        { error: error.message || "Failed to fetch properties by category" },
        { status: statusCode }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: "Failed to fetch properties by category" },
      { status: 500 }
    );
  }
}
