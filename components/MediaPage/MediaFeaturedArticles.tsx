import { MediaPageData } from "@/app/media/media-page.data";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { TiArrowRight } from "react-icons/ti";

type MediaFeaturedArticlesProps = {
  content: MediaPageData["featuredArticle"];
};

export default function MediaFeaturedArticles({
  content,
}: MediaFeaturedArticlesProps) {
  if (!content) return null;

  const article = content;

  return (
    <section className="py-10 bg-[#FFFAF7]">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm font-medium tracking-[0.2em] text-gold-beige uppercase mb-5">
          — Featured Story
        </p>
        <Link
          className="flex flex-col md:flex-row border border-[#D9D3CC] bg-white md:items-stretch"
          target="_blank"
          href={article.link}
        >
          <div className="w-full md:w-1/2">
            <Image
              src={article.imageSrc}
              alt={article.imageAlt}
              width={600}
              height={600}
              className="object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col p-6 md:p-8 gap-3 md:w/1/2">
            <span className="text-sm tracking-wider text-gold-beige">
              Featured · {article.source}
            </span>
            <div className="min-h-20">
              <h3 className="font-display-semi text-xl md:text-[22px] text-black leading-tight">
                {article.title}
              </h3>
            </div>

            <div className="mt-auto flex justify-between text-gold-beige border-t border-gold-beige pt-3">
              <span>{dayjs(article.date).format("DD MMM, YYYY")}</span>
              <span className="text-gold-beige text-sm font-medium hover:text-black hover:border-black transition-colors uppercase flex justify-center items-center">
                Read <TiArrowRight size={20} />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
