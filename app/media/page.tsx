import MediaPageClient from "@/components/MediaPage/MediaPageClient";
import {
  getFeaturedMedia,
  getMedia,
  getBanner,
  getMetaData,
} from "@/api/CMS.api";
import { MediaProp, BannersProps, MetaDataProps } from "@/interfaces";
import {
  FeaturedArticle,
  MediaPageData,
  mediaPageDummyData,
} from "./media-page.data";
import type { Metadata } from "next";
import { CareerHeroContent } from "../careers/career-page.data";

// Revalidate this route every 30 minutes.
export const revalidate = 1800;
export const dynamic = "force-dynamic";

async function getPageMetaData(): Promise<MetaDataProps | null> {
  try {
    return (await getMetaData("Media")) as MetaDataProps;
  } catch (error) {
    console.error("Error fetching meta data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metaData = await getPageMetaData();
  const banner = (await getBanner("Media")) as BannersProps;

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

export default async function MediaPage() {
  const mediaPageData: MediaPageData = {
    hero: {} as CareerHeroContent,
    featuredArticle: {} as FeaturedArticle,
    media: [] as FeaturedArticle[],
  };

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

  const mediasFromApi = (await getMedia()) as MediaProp[];

  let banner: BannersProps | null = null;
  try {
    banner = (await getBanner("Media")) as BannersProps;
  } catch (error) {
    console.error("Error fetching banner:", error);
  }

  const hero = {} as CareerHeroContent;
  if (banner) {
    hero.imageSrc = toAbsoluteAssetUrl(banner.banner_image) || "";
    hero.title = banner.banner_image_caption;
    hero.description = banner.banner_image_description;
  }

  const featuredMediaData = (await getFeaturedMedia()) as MediaProp;

  const featuredArticle = {} as FeaturedArticle;

  if (featuredMediaData) {
    featuredArticle.title = featuredMediaData.media_title || "";
    featuredArticle.source = featuredMediaData.media_publisher;
    featuredArticle.date = featuredMediaData.media_published_date || "";
    featuredArticle.imageSrc = toAbsoluteAssetUrl(
      featuredMediaData.media_thumbnail
    );
    featuredArticle.imageAlt = featuredMediaData.media_title || "";
    featuredArticle.link = featuredMediaData.media_url;
  }

  mediaPageData.featuredArticle = featuredArticle;

  const media =
    mediasFromApi.length > 0
      ? mediasFromApi.map((media, index) => ({
          id: String(index + 1),
          title: media.media_title || "",
          source: media.media_publisher,
          date: media.media_published_date,
          imageSrc: toAbsoluteAssetUrl(media.media_thumbnail),
          imageAlt: media.media_title || "",
          link: media.media_url || "",
        }))
      : [];

  mediaPageData.hero = hero;
  mediaPageData.media = media;
  return <MediaPageClient data={mediaPageData} />;
}
