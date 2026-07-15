import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { KNOWN_PROPERTY_CATEGORY_SLUGS } from "@/lib/property-category-slugs";
import { getAuthToken, getPropertyDetail } from "@/api/CMS.api";
import { getPropertyCategory } from "@/api/property";
import ApiException from "@/api/Api.exception";
import type { AuthTokenResponse, PropertyCategoryProps } from "@/interfaces";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  // Match: /categorySlug (single segment - redirect to /categorySlug/page/1)
  if (segments.length === 1) {
    const [categorySlug] = segments;

    if (KNOWN_PROPERTY_CATEGORY_SLUGS.has(categorySlug)) {
      try {
        // Validate category exists via API
        const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
        const token = tokenResponse?.token;

        if (token) {
          try {
            const raw = await getPropertyCategory(token, categorySlug);
            const category = raw as PropertyCategoryProps | null;
            if (
              category &&
              typeof category.property_category_title === "string" &&
              category.property_category_title.trim().length > 0
            ) {
              const targetUrl = new URL(`/${categorySlug}/page/1`, request.url);
              return NextResponse.redirect(targetUrl, 301);
            }
          } catch {
            // Category API error - fall through to known slug check
          }
        }
      } catch (error) {
        console.error("Middleware error validating category:", error);
      }

      // Fallback: if in known list, redirect with 301
      const targetUrl = new URL(`/${categorySlug}/page/1`, request.url);
      return NextResponse.redirect(targetUrl, 301);
    }
  }

  // Match: /categorySlug/page
  if (segments.length === 2) {
    const [categorySlug, pageSegment] = segments;

    if (
      KNOWN_PROPERTY_CATEGORY_SLUGS.has(categorySlug) &&
      pageSegment === "page"
    ) {
      const targetUrl = new URL(`/${categorySlug}/page/1`, request.url);

      return NextResponse.redirect(targetUrl, 301);
    }
  }

  // Match: /categorySlug/propertySlug - validate property exists
  if (segments.length === 2) {
    const [categorySlug, propertySlug] = segments;

    // Skip if numeric (backward compat - handle in page component)
    if (/^\d+$/.test(propertySlug)) {
      const targetUrl = new URL(`/${categorySlug}`, request.url);
      return NextResponse.redirect(targetUrl, 301);
    }

    // Check if it's a known category
    if (KNOWN_PROPERTY_CATEGORY_SLUGS.has(categorySlug)) {
      try {
        // Validate property exists
        const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
        const token = tokenResponse?.token;

        if (token) {
          try {
            await getPropertyDetail(token, categorySlug, propertySlug);
            // Property exists, continue to page
            return NextResponse.next();
          } catch (error) {
            // If 404 or "Invalid Property URL Slug", redirect to category
            if (error instanceof ApiException) {
              if (error.statusCode === 404) {
                const targetUrl = new URL(`/${categorySlug}`, request.url);
                return NextResponse.redirect(targetUrl, 301);
              }

              if (error.statusCode === 400 && error.response) {
                const apiResponse = error.response as {
                  errors?: Array<{ msg?: string }>;
                };
                if (
                  apiResponse.errors?.some((err) =>
                    err.msg?.includes("Invalid Property URL Slug")
                  )
                ) {
                  const targetUrl = new URL(`/${categorySlug}`, request.url);
                  return NextResponse.redirect(targetUrl, 301);
                }
              }
            }
          }
        }
      } catch (error) {
        console.error("Middleware error validating property:", error);
        // Continue to page on validation error - let page handle it
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:categorySlug",
    "/:categorySlug/page",
    "/:categorySlug/:propertySlug", // Match property detail routes
  ],
};
