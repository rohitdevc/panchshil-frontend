import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { KNOWN_PROPERTY_CATEGORY_SLUGS } from "@/lib/property-category-slugs";
import { getPropertyDetail } from "@/api/CMS.api";
import ApiException from "@/api/Api.exception";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 1) {
    const [categorySlug] = segments;

    if (KNOWN_PROPERTY_CATEGORY_SLUGS.has(categorySlug)) {
      const targetUrl = new URL(`/${categorySlug}/page/1`, request.url);
      return NextResponse.redirect(targetUrl, 301);
    }
  } else if (segments.length === 2) {
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

    if (KNOWN_PROPERTY_CATEGORY_SLUGS.has(categorySlug)) {
      try {
        try {
          await getPropertyDetail(categorySlug, propertySlug);
          return NextResponse.next();
        } catch (error) {
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
      } catch (error) {
        console.error("Middleware error validating property:", error);

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
