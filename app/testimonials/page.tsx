import TestimonialsPageClient from "@/components/TestimonialsPage/TestimonialsPageClient";
import {
  TestimonialListItem,
  testimonialsPageDummyData,
} from "./testimonials-page.data";
import {
  getTestimonials,
  getTestimonialsAPI,
  getBanner,
  getMetaData,
} from "@/api/CMS.api";
import { TestimonialsApiItem, BannersProps, MetaDataProps } from "@/interfaces";
import type { Metadata } from "next";

// Revalidate this route every 30 minutes.
export const revalidate = 1800;
export const dynamic = "force-dynamic";
async function getPageMetaData(): Promise<MetaDataProps | null> {
  try {
    return (await getMetaData("Testimonials")) as MetaDataProps;
  } catch (error) {
    console.error("Error fetching meta data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metaData = await getPageMetaData();
  const banner = (await getBanner("Testimonials")) as BannersProps;

  return {
    title: metaData?.meta_title || "",
    description: metaData?.meta_description || "",
    keywords: metaData?.meta_keywords || "",
    alternates: {
      canonical: metaData?.canonical_tag || "",
    },
    openGraph: {
      title: metaData?.meta_title,
      description: metaData?.meta_description,
      type: "website",
      url: metaData?.canonical_tag,
      siteName: "Panchshil Realty",
      images: [
        {
          url: banner.og_image,
          width: 1200,
          height: 630,
          alt: metaData?.meta_title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaData?.meta_title,
      description: metaData?.meta_description,
      images: [banner.og_image],
    },
  };
}

const toAbsoluteAssetUrl = (imageUrl: string | undefined): string => {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT || "";
  if (!baseUrl) {
    return imageUrl;
  }

  return `${baseUrl.replace(/\/$/, "")}/${imageUrl.replace(/^\//, "")}`;
};

function splitQuoteAndDetails(content: string): {
  quote: string;
  details: string;
} {
  const bangSpace = content.indexOf("! ");
  if (bangSpace > 80 && bangSpace < content.length - 2) {
    return {
      quote: content.slice(0, bangSpace + 1),
      details: content.slice(bangSpace + 2).trim(),
    };
  }
  return { quote: content, details: "" };
}

function mapApiItemToListItem(
  item: TestimonialsApiItem,
  index: number
): TestimonialListItem {
  const content = item.testimonial_content ?? "";
  const { quote, details } = splitQuoteAndDetails(content);
  const author = item.testimonial_name ?? "";

  return {
    id: String(item.id ?? item._id ?? index + 1),
    category: "residential",
    quote,
    details,
    author,
    role: item.testimonial_designation ?? "",
    avatarSrc: toAbsoluteAssetUrl(item.testimonial_thumbnail),
    avatarAlt: author || "Testimonial profile",
  };
}

export default async function TestimonialsPage() {
  let testimonialsFromApi: TestimonialsApiItem[] = [];
  let banner: BannersProps | null = null;
  const metaData: MetaDataProps | null = null;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

  if (siteUrl) {
    try {
      const proxyResponse = (await getTestimonialsAPI(siteUrl)) as {
        success?: boolean;
        data?: unknown;
      };

      if (proxyResponse?.success && Array.isArray(proxyResponse.data)) {
        testimonialsFromApi = proxyResponse.data as TestimonialsApiItem[];
      }
    } catch (error) {
      console.error("Error fetching testimonials from proxy API:", error);
    }
  }

  if (testimonialsFromApi.length === 0) {
    try {
      const response = await getTestimonials();
      if (Array.isArray(response)) {
        testimonialsFromApi = response as TestimonialsApiItem[];
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  }

  try {
    banner = (await getBanner("Testimonials")) as BannersProps;
  } catch (error) {
    console.error("Error fetching banner:", error);
  }

  const hero = { ...testimonialsPageDummyData.hero };
  if (banner) {
    hero.imageSrc = toAbsoluteAssetUrl(banner.banner_image) || hero.imageSrc;
    hero.title = banner.banner_image_caption || hero.title;
    hero.description = banner.banner_image_description || hero.description;
  }

  const mappedTestimonials = testimonialsFromApi.map(mapApiItemToListItem);

  return (
    <TestimonialsPageClient
      data={{
        hero,
        testimonials: mappedTestimonials,
      }}
    />
  );
}
