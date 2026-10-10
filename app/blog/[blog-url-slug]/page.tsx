import { BlogDetailsPageClient } from "@/components/BlogDetailsPage";
import { loadBlog } from "./blog-loader";
import { BlogDetailProp, BlogProp } from "@/interfaces";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlog } from "@/api/CMS.api";

interface BlogDetailtPageProps {
  params: Promise<{
    "blog-url-slug": string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const blogs = await getBlog();

  return (blogs as BlogProp[]).map((blog) => ({
    "blog-url-slug": blog.blog_url,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailtPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const blogUrlSlug = resolvedParams["blog-url-slug"];

  try {
    const detail = (await loadBlog(blogUrlSlug)) as BlogDetailProp;

    if (!detail) {
      notFound();
    }

    return {
      title: detail.meta_title || detail.blog_title,
      description: detail.meta_description || detail.blog_preview,
      alternates: detail.canonical_tag
        ? { canonical: detail.canonical_tag }
        : undefined,
      openGraph: {
        title: detail.meta_title,
        description: detail.meta_description,
        type: "website",
        url: detail.canonical_tag,
        siteName: "Panchshil Realty",
        images: [
          {
            url: detail.og_image,
            width: 1200,
            height: 630,
            alt: detail.meta_title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: detail.meta_title,
        description: detail.meta_description,
        images: [detail.og_image],
      },
    };
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailtPageProps) {
  const resolvedParams = await params;

  let blogDetail;

  try {
    const blogUrlSlug = resolvedParams["blog-url-slug"];

    blogDetail = (await loadBlog(blogUrlSlug)) as BlogDetailProp;
  } catch (error) {
    console.error(error);
    notFound();
  }

  return <BlogDetailsPageClient blog={blogDetail} />;
}
