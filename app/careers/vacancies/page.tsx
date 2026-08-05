import { CareerSearchPageClient } from "@/components/CareerSearchPage";
import { careerSearchPageData } from "./career-search-page.data";
import type { Metadata } from "next";
import { getBanner, getMetaData } from "@/api/CMS.api";
import { BannersProps, MetaDataProps } from "@/interfaces";
import { CareerHeroContent } from "../career-page.data";

export const revalidate = 600;
export const dynamic = "force-dynamic";
async function getPageMetaData(): Promise<MetaDataProps | null> {
  try {
    return (await getMetaData("Vacancies")) as MetaDataProps;
  } catch (error) {
    console.error("Error fetching meta data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metaData = await getPageMetaData();
  const banner = (await getBanner("Vacancies")) as BannersProps;

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

let banner: BannersProps | null = null;
try {
  banner = (await getBanner("Careers")) as BannersProps;
} catch (error) {
  console.error("Error fetching banner:", error);
}

const hero = {} as CareerHeroContent;
if (banner) {
  hero.imageSrc = toAbsoluteAssetUrl(banner.banner_image) || "";
  hero.title = banner.banner_image_caption;
  hero.description = banner.banner_image_description;
}

const pageContent = { ...careerSearchPageData };

pageContent.hero = {
  ...pageContent.hero,
  ...hero,
};

export default function CareerSearchPage() {
  return <CareerSearchPageClient data={pageContent} />;
}
