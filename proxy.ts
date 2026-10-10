import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { KNOWN_PROPERTY_CATEGORY_SLUGS } from "@/lib/property-category-slugs";
import { getPropertyDetail } from "@/api/CMS.api";
import ApiException from "@/api/Api.exception";
import propertyIndex from "@/generated/property-index.json";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  // /category/page
  if (segments.length === 2) {
    const [categorySlug, pageSegment] = segments;

    if (KNOWN_PROPERTY_CATEGORY_SLUGS.has(categorySlug) && pageSegment === "page") {
      const targetUrl = new URL(`/${categorySlug}/page/1`, request.url);

      return NextResponse.redirect(targetUrl, 301);
    }
  }

  // /category/page/number
  if (segments.length === 3) {
    const [categorySlug, pageSegment, pageNumber] = segments;

    if (KNOWN_PROPERTY_CATEGORY_SLUGS.has(categorySlug) && pageSegment === "page" && /^\d+$/.test(pageNumber)) {
      return NextResponse.next();
    }
  }

  // /category/property
  if (segments.length === 2) {
    const [categorySlug, propertySlug] = segments;

    if (/^\d+$/.test(propertySlug)) {
      const targetUrl = new URL(`/${categorySlug}`, request.url);

      return NextResponse.redirect(targetUrl, 301);
    }

    if (KNOWN_PROPERTY_CATEGORY_SLUGS.has(categorySlug)) {
      try {

        await getPropertyDetail(categorySlug, propertySlug);
        return NextResponse.next();
      } catch (error) {
        if (error instanceof ApiException) {
          if (error.statusCode === 404) {
            const targetUrl = new URL(`/${categorySlug}`, request.url);
            return NextResponse.redirect(targetUrl, 301);
          }

          if (
            error.statusCode === 400 &&
            error.response &&
            (error.response as {
              errors?: Array<{ msg?: string }>;
            }).errors?.some((err) =>
              err.msg?.includes("Invalid Property URL Slug")
            )
          ) {
            const targetUrl = new URL(`/${categorySlug}`, request.url);
            return NextResponse.redirect(targetUrl, 301);
          }
        }

        console.error("Middleware error validating property:", error);
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:categorySlug/page",
    "/:categorySlug/page/:pageNumber",
    "/:categorySlug/:propertySlug",
  ],
};