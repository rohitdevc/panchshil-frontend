"use client";

import { useEffect, useMemo, useState } from "react";
import { CareerTrackPostCard } from "@/components/CareerTracks/CareerTrackPostCard";
import type { BlogsArticlesSectionData } from "@/app/blog/blogs-page.data";

type BlogsArticlesSectionProps = {
  content: BlogsArticlesSectionData;
};

export function BlogsArticlesSection({ content }: BlogsArticlesSectionProps) {
  const { categories, articles } = content;

  const [activeCategoryId, setActiveCategoryId] = useState(
    categories[0]?.id ?? "all"
  );

  const filtered = useMemo(() => {
    if (activeCategoryId === "all") return articles;
    return articles.filter((a) => a.categoryId === activeCategoryId);
  }, [articles, activeCategoryId]);

  const handleCategory = (id: string) => {
    setActiveCategoryId(id);
    //setCurrentPage(1);
  };

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-0">
        <nav
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-10 mb-12 md:mb-16 hidden"
          aria-label="Blog categories"
        >
          {categories.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategory(cat.id)}
                className={`text-xs md:text-sm uppercase font-medium tracking-[0.12em] pb-1 border-b-2 transition-colors ${isActive ? "text-gold-beige border-gold-beige" : "text-gold-beige/70 border-transparent hover:text-gold-beige"}`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 md:gap-y-16">
          {articles.map((article) => (
            <CareerTrackPostCard
              key={article.id}
              imageSrc={article.imageSrc}
              title={article.title}
              imageAlt={article.title}
              publishedOn={article.publishedOn}
              ctaHref={article.href}
              ctaLabel="Read More"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
