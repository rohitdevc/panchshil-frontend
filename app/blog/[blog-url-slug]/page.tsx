import { BlogDetailsPageClient } from "@/components/BlogDetailsPage";
import { loadBlog } from "./blog-loader";
import { BlogDetailProp } from "@/interfaces";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface BlogDetailtPageProps {
  params: {
    "blog-url-slug": string;
  };
}

export const revalidate = 600;

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
