import Image from "next/image";
import Link from "next/link";
import { FeaturedArticle } from "@/app/media/media-page.data";
import dayjs from "dayjs";
import { TiArrowRight } from "react-icons/ti";

type MediaArticleCardProps = {
  article: FeaturedArticle;
};

export default function MediaArticleCard({ article }: MediaArticleCardProps) {
  return (
    <Link
      className="flex flex-col border border-[#D9D3CC] bg-white group h-full"
      target="_blank"
      href={article.link}
    >
      <div className="relative w-full h-60">
        <Image
          src={article.imageSrc}
          alt={article.imageAlt}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8 gap-3">
        <span className="font-medium tracking-[0.2em] text-gold-beige uppercase">
          {article.source}
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
  );
}
