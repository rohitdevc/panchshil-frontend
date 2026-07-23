import { FeaturedArticle } from "@/app/media/media-page.data";
import MediaArticleCard from "./MediaArticleCard";
import MediaLargeArticleCard from "./MediaLargeArticleCard";

type MediaInsightSectionProps = {
  content: FeaturedArticle[];
};

export default function MediaInsightSection({
  content,
}: MediaInsightSectionProps) {
  if (!content || content.length === 0) return null;

  const articles = content;

  return (
    <section className={`py-10 bg-[#FFFAF7]`}>
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm font-medium tracking-[0.2em] text-gold-beige uppercase">
          — Latest Coverage
        </p>
        {articles.length > 0 && (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
            {articles.map((article, idx) => (
              <div key={idx} className="flex-1">
                <MediaArticleCard article={article} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
