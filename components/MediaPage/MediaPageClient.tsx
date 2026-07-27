"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CareerHero } from "@/components/CareerHero";
import { MediaPageData } from "@/app/media/media-page.data";
import MediaFeaturedArticles from "./MediaFeaturedArticles";
import MediaInsightSection from "./MediaInsightSection";
import { CiSearch } from "react-icons/ci";
import { useState, useMemo, useEffect } from "react";
import { fuse } from "@/api/fuse";

type MediaPageClientProps = {
  data: MediaPageData;
};

export default function MediaPageClient({ data }: MediaPageClientProps) {
  const [searchValue, setSearchValue] = useState("");

  const [showSearchResults, updateShowSearchResults] = useState(false);

  const search_results = useMemo(() => {
    if (!searchValue.trim()) {
      return [];
    }

    return fuse.search(searchValue).map((r) => r.item);
  }, [searchValue]);

  useEffect(() => {
    updateShowSearchResults(searchValue.trim().length > 0);
  }, [searchValue]);

  const handleSearchClick = (path: string) => {
    window.open(path, "_blank", "noopener,noreferrer");
  };
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFFAF7]">
      <Header />

      <section className="min-h-screen flex flex-col bg-white">
        <CareerHero hero={data.hero} />
      </section>
      <div className="border-b border-gold-beige/30 flex justify-end items-center gap-5 py-5 px-10">
        <div className="flex items-center gap-5 relative">
          <input
            type="search"
            placeholder="Search Stories..."
            className="outline-none py-2 px-3 peer w-60 border border-gold-beige"
            value={searchValue}
            onChange={(e) => {
              updateShowSearchResults(true);
              setSearchValue(e.target.value);
            }}
          />
          <CiSearch
            className="absolute right-25 top-1/2 -translate-y-1/2 text-gray-500 peer-not-placeholder-shown:hidden"
            size={18}
          />
          <span className="font-display">{data.media.length} Stories</span>
        </div>
      </div>
      <div
        className={`relative ${showSearchResults ? "max-h-screen" : "max-h-0"}`}
      >
        {showSearchResults && (
          <div className="w-full border-r border-l border-b border-gold-beige/30 md:w-xs xl:w-sm bg-white absolute right-0 flex transition-transform duration-300 ease-in-out">
            <ul className="w-full max-h-screen overflow-y-auto">
              {search_results.map((result, key) => (
                <li
                  key={key}
                  className="w-full block cursor-pointer py-3 px-5 hover:bg-gold-beige hover:text-white duration-300 transition-all"
                  onClick={() => handleSearchClick(result.path)}
                >
                  {result.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <MediaFeaturedArticles content={data.featuredArticle} />

      <MediaInsightSection content={data.media} />
      <div className="h-10 w-full bg-white"></div>
      <Footer />
    </main>
  );
}
