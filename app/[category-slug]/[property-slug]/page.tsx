import { getPropertyDetail } from "@/api/CMS.api";
import PropertyDetailsPageClient from "@/components/PropertyDetailsPage/PropertyDetailsPageClient";
import type {
  MasterSliderData,
  Property,
  PropertyDetailResponse,
  // PropertyInfoData,
  PropertyLocationCoOrdinatesProps,
} from "@/interfaces";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PropertyDetailtPageProps {
  params: {
    "category-slug": string;
    "property-slug": string;
  };
}

// Revalidate this page every 10 minutes
export const revalidate = 600;

function extractImageUrls(input: unknown): string[] {
  if (!input) return [];
  if (Array.isArray(input)) {
    // string[]
    if (input.every((x) => typeof x === "string")) return input as string[];
    // {url|image|src}[]
    return (input as unknown[])
      .map((x) => {
        if (!x || typeof x !== "object") return "";
        const obj = x as Record<string, unknown>;
        const url = obj.url ?? obj.image ?? obj.src ?? obj.path;
        return typeof url === "string" ? url : "";
      })
      .filter(Boolean);
  }
  return [];
}

export async function generateMetadata({
  params,
}: PropertyDetailtPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const propertyCategoryUrlSlug = resolvedParams["category-slug"];
  const propertyUrlSlug = resolvedParams["property-slug"];

  try {
    const detail = (await getPropertyDetail(
      propertyCategoryUrlSlug,
      propertyUrlSlug
    )) as PropertyDetailResponse;

    return {
      title: detail?.meta_data?.meta_title || detail?.property_name || "",
      description: detail?.meta_data?.meta_description || "",
      alternates: detail?.meta_data?.canonical_tag
        ? { canonical: detail.meta_data.canonical_tag }
        : undefined,
    };
  } catch (error) {
    console.error("Error fetching property detail for metadata:", error);
    return {};
  }
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailtPageProps) {
  const resolvedParams = await params;
  const propertyCategoryUrlSlug = resolvedParams["category-slug"];
  const propertyUrlSlug = resolvedParams["property-slug"];

  if (!propertyCategoryUrlSlug || !propertyUrlSlug) {
    notFound();
  }

  let propertyDetail: unknown = null;
  try {
    propertyDetail = await getPropertyDetail(
      propertyCategoryUrlSlug,
      propertyUrlSlug
    );
  } catch (error) {
    console.error(error);
    notFound();
  }

  const detail = (propertyDetail || {}) as PropertyDetailResponse;
  // Hero slide mapping (best-effort)
  const heroSlide: MasterSliderData | undefined = (() => {
    const title =
      detail?.banner_data?.banner_image_caption || detail?.property_name || "";
    const description = detail?.banner_data?.banner_image_description || "";

    const link = detail?.meta_data?.canonical_tag || "";

    const image = detail?.banner_data?.banner_image || null;
    const mobileImage = detail?.banner_data?.banner_image_mobile || null;
    const video = "";

    const buttonCaption =
      detail?.property_introduction_caption ||
      detail?.banner_data?.banner_image_caption ||
      "Discover";

    // Only return if we have at least a title (otherwise use client fallback)
    if (!title) return undefined;
    return {
      master_slider_title: title,
      master_slider_description: description,
      master_slider_link: link,
      master_slider_image: image,
      master_slider_image_mobile: mobileImage,
      master_slider_video: video,
      master_slider_button_caption: buttonCaption,
    };
  })();

  // // Property info mapping (best-effort)
  // const propertyInfo: PropertyInfoData | undefined = (() => {
  //   const location = detail?.property_band?.property_location || "";
  //   const configuration = detail?.property_band?.property_configuration || "";
  //   const status = detail?.property_band?.property_status || "";
  //   const price = detail?.property_band?.property_pricing || "";
  //   const brochureUrl = detail?.property_brochure || "#";
  //   const contactUrl = detail?.meta_data?.canonical_tag || "#";

  //   // If we have nothing useful, let the client component fallback
  //   if (!location && !configuration && !status && !price) return undefined;
  //   return { location, configuration, status, price, brochureUrl, contactUrl };
  // })();

  // Try to build carousel items from image gallery if present
  const interiorUrls = extractImageUrls(detail?.property_interior_sliders);
  const exteriorUrls = extractImageUrls(detail?.property_exterior_sliders);

  const makeCarouselItems = (urls: string[]): Property[] =>
    urls.filter(Boolean).map((url, idx) => ({
      property_name: detail?.property_name || `Image ${idx + 1}`,
      property_thumbnail: url,
      property_location: detail?.property_band?.property_location || "",
      property_link: detail?.meta_data?.canonical_tag || "",
    }));

  const interiorItems =
    interiorUrls.length > 0 ? makeCarouselItems(interiorUrls) : undefined;
  const exteriorItems =
    exteriorUrls.length > 0 ? makeCarouselItems(exteriorUrls) : undefined;

  const property_location_co_ordinates =
    detail?.property_location?.property_location_co_ordinates || "";
  return (
    <PropertyDetailsPageClient
      heroSlide={heroSlide}
      propertyInfo={detail}
      interiorItems={interiorItems}
      exteriorItems={exteriorItems}
      property_location_co_ordinates={
        property_location_co_ordinates as PropertyLocationCoOrdinatesProps
      }
    />
  );
}
