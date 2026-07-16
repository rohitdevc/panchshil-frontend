import { AwardsPageClient } from "@/components/AwardsPage";
import { getAwards, getAwardsAPI, getBanner, getMetaData } from "@/api/CMS.api";
import { AwardsApiItem, BannersProps, MetaDataProps } from "@/interfaces";
import type { Metadata } from "next";
import { CareerHeroContent } from "../careers/career-page.data";

// Revalidate this route every 30 minutes.
export const revalidate = 1800;
export const dynamic = "force-dynamic";

async function getPageMetaData(): Promise<MetaDataProps | null> {
  try {
    return (await getMetaData("Awards")) as MetaDataProps;
  } catch (error) {
    console.error("Error fetching meta data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metaData = await getPageMetaData();
  return {
    title: metaData?.meta_title || "",
    description: metaData?.meta_description || "",
    keywords: metaData?.meta_keywords || "",
    alternates: {
      canonical: metaData?.canonical_tag || "",
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

export default async function AwardsPage() {
  let awardsFromApi: AwardsApiItem[] = [];
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

  if (siteUrl) {
    try {
      const proxyResponse = (await getAwardsAPI(siteUrl)) as {
        success?: boolean;
        data?: unknown;
      };

      if (proxyResponse?.success && Array.isArray(proxyResponse.data)) {
        awardsFromApi = proxyResponse.data as AwardsApiItem[];
      }
    } catch (error) {
      console.error("Error fetching awards from proxy API:", error);
    }
  }

  if (awardsFromApi.length === 0) {
    try {
      const response = await getAwards();
      if (Array.isArray(response)) {
        awardsFromApi = response as AwardsApiItem[];
      }
    } catch (error) {
      console.error("Error fetching awards:", error);
    }
  }

  let banner: BannersProps | null = null;
  try {
    banner = (await getBanner("Awards")) as BannersProps;
  } catch (error) {
    console.error("Error fetching banner:", error);
  }

  const hero = {} as CareerHeroContent;
  if (banner) {
    hero.imageSrc = toAbsoluteAssetUrl(banner.banner_image) || "";
    hero.title = banner.banner_image_caption;
    hero.description = banner.banner_image_description;
  }

  const mappedAwards =
    awardsFromApi.length > 0
      ? awardsFromApi.map((award, index) => ({
          id: String(index + 1),
          title: award.award_title || "",
          imageSrc: toAbsoluteAssetUrl(award.award_image),
          imageAlt: award.award_title || "",
        }))
      : [];

  return (
    <AwardsPageClient
      data={{
        hero,
        awards: mappedAwards,
      }}
    />
  );
}
