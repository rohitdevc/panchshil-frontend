import { BlogsPageClient } from "@/components/BlogsPage";
import { blogsPageStaticData } from "./blogs-page.data";
import {
  getBlogFeatured,
  getBlog,
  getMetaData,
  getBanner,
} from "@/api/CMS.api";
import {
  BlogFeaturedProp,
  BlogProp,
  BannersProps,
  MetaDataProps,
} from "@/interfaces";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(utc);
dayjs.extend(advancedFormat);

import type { Metadata } from "next";
export const revalidate = 600;
export const dynamic = "force-dynamic";

async function getPageMetaData(): Promise<MetaDataProps | null> {
  try {
    return (await getMetaData("Blog")) as MetaDataProps;
  } catch (error) {
    console.error("Error fetching meta data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metaData = await getPageMetaData();
  const banner = (await getBanner("Blog")) as BannersProps;

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

export default async function BlogsPage() {
  const apiCalls = [getBanner("Blog"), getBlogFeatured(), getBlog()];

  const [bannerRes, blogFeaturedRes, blogsRes] =
    await Promise.allSettled(apiCalls);

  const mergedData = { ...blogsPageStaticData };

  if (bannerRes.status === "fulfilled" && bannerRes.value) {
    const banner = bannerRes.value as BannersProps;
    mergedData.hero = {
      ...mergedData.hero,
      imageSrc:
        toAbsoluteAssetUrl(banner.banner_image) || mergedData.hero.imageSrc,
      title: banner.banner_image_caption || mergedData.hero.title,
      description:
        banner.banner_image_description || mergedData.hero.description,
    };
  }

  if (blogFeaturedRes.status === "fulfilled" && blogFeaturedRes.value) {
    const blogFeaturedData = blogFeaturedRes.value as BlogFeaturedProp;

    mergedData.sharing = {
      ...mergedData.sharing,
      featured: {
        title: blogFeaturedData.blog_title,
        excerpt: blogFeaturedData.blog_preview,
        readMoreHref: blogFeaturedData.blog_url,
        imageSrc: blogFeaturedData.blog_thumbnail,
        imageAlt: blogFeaturedData.blog_title,
        publishedOn: dayjs(blogFeaturedData.blog_published_date).format(
          "Do MMM, YYYY"
        ),
      },
    };
  }

  if (blogsRes.status === "fulfilled" && blogsRes.value) {
    const blogData = blogsRes.value as BlogProp[];

    mergedData.articles = {
      categories: [{ id: "all", label: "ALL" }],
      articles: blogData.map((blog, key) => ({
        id: String(key),
        categoryId: "Panchshil",
        title: blog.blog_title,
        publishedOn: dayjs(blog.blog_published_date).format("Do MMM, YYYY"),
        imageSrc: blog.blog_thumbnail,
        href: blog.blog_url,
      })),
    };
  }

  return <BlogsPageClient data={mergedData} />;
}
