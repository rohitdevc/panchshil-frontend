import ContactUsPageClient from "@/components/ContactUsPage/ContactUsPageClient";
import { getBanner, getMetaData } from "@/api/CMS.api";
import { BannersProps, MetaDataProps } from "@/interfaces";
import type { Metadata } from "next";
import { AboutUsHeroContent } from "@/app/about/about.data";

export const dynamic = "force-dynamic";

async function getPageMetaData(): Promise<MetaDataProps | null> {
  try {
    return (await getMetaData("Contact Us")) as MetaDataProps;
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

export default async function ContactPage() {
  let banner: BannersProps | null = null;
  try {
    banner = (await getBanner("Contact Us")) as BannersProps;
  } catch (error) {
    console.error("Error fetching banner:", error);
  }

  const hero: AboutUsHeroContent = {
    imageSrc: banner ? toAbsoluteAssetUrl(banner.banner_image) : "",
    title: banner?.banner_image_caption || "",
    description: banner?.banner_image_description || "",
  };

  return <ContactUsPageClient hero={hero} />;
}
