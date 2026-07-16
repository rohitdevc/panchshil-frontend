"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CareerHero } from "@/components/CareerHero";
import { BlogsPageData } from "@/app/blog/blogs-page.data";
import { BlogsSharingSection } from "@/components/BlogsPage/BlogsSharingSection";
import { BlogsArticlesSection } from "@/components/BlogsPage/BlogsArticlesSection";

type BlogsPageClientProps = {
  data: BlogsPageData;
};

export default function BlogsPageClient({ data }: BlogsPageClientProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFFAF7]">
      <Header />

      <section className="min-h-screen flex flex-col bg-white">
        <CareerHero hero={data.hero} />
      </section>

      <BlogsSharingSection content={data.sharing} />

      <BlogsArticlesSection content={data.articles} />

      <Footer />
    </main>
  );
}
