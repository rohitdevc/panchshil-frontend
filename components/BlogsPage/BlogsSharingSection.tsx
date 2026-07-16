import Image from "next/image";
import Link from "next/link";
import type { BlogsSharingSectionData } from "@/app/blog/blogs-page.data";

type BlogsSharingSectionProps = {
  content: BlogsSharingSectionData;
};

export function BlogsSharingSection({ content }: BlogsSharingSectionProps) {
  const { heading, featured } = content;

  return (
    <section className="w-full bg-[#FFFAF7] py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-0">
        <div className="md:w-2/5">
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black-chocolate uppercase tracking-wide mb-10 md:mb-14 max-w-4xl">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div
            className="relative w-full max-w-[876px] mx-auto lg:mx-0"
            style={{ aspectRatio: "876 / 441" }}
          >
            <Image
              src={featured.imageSrc}
              alt={featured.imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) min(876px, 50vw), 100vw"
              priority
            />
          </div>

          <div className="flex flex-col justify-center lg:py-4">
            <p className="text-sm md:text-sm text-[#1F180D]/70 mb-4">
              Published on: {featured.publishedOn}
            </p>
            <h3 className="text-2xl md:text-[22px] font-display-semi text-black-chocolate tracking-tight mb-6">
              {featured.title}
            </h3>
            <p className="text-lg md:text-lg text-black-chocolate/90 leading-relaxed mb-8">
              {featured.excerpt}
            </p>
            <Link
              href={featured.readMoreHref}
              className="text-sm md:text-sm text-gold-beige underline underline-offset-4 decoration-gold-beige hover:opacity-90 w-fit"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
