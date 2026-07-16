import TermsConditionsPageClient from "@/components/TermsConditionsPage/TermsConditionsPageClient";
import { termsConditionsPageData } from "./terms-conditions-page.data";
import { getBanner, getMetaData } from "@/api/CMS.api";
import { BannersProps, MetaDataProps } from "@/interfaces";
import type { Metadata } from "next";
export const dynamic = "force-dynamic";
async function getPageMetaData(): Promise<MetaDataProps | null> {
  try {
    return (await getMetaData("Terms and Conditions")) as MetaDataProps;
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

export default async function TermsConditionsPage() {
  let banner: BannersProps | null = null;

  try {
    banner = (await getBanner("Terms and Conditions")) as BannersProps;
  } catch (error) {
    console.error("Error fetching banner:", error);
  }

  const metaData = await getPageMetaData();

  const data = { ...termsConditionsPageData, metaData: metaData || {} };
  if (banner) {
    data.hero = {
      ...data.hero,
      imageSrc: toAbsoluteAssetUrl(banner.banner_image) || data.hero.imageSrc,
      title: banner.banner_image_caption || data.hero.title,
      description: banner.banner_image_description || data.hero.description,
    };
  }

  return <TermsConditionsPageClient data={data} />;
}
