"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogDetailsData } from "@/app/blog/[id]/blog-details.data";
import Image from "next/image";

type BlogDetailsPageClientProps = {
  data: BlogDetailsData;
};

export default function BlogDetailsPageClient({
  data,
}: BlogDetailsPageClientProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Header />

      <section className="pt-32 lg:pt-40 pb-12 lg:pb-24 px-4 md:px-8  mx-auto flex flex-col items-center">
        {/* Title */}
        <h1 className="font-display text-[28px] md:text-5xl text-center leading-snug lg:leading-[1.2] mb-10 md:mb-14 uppercase text-[#222222] whitespace-pre-line tracking-wide">
          {data.title}
        </h1>

        {/* Banner */}
        <div className="w-full relative aspect-[1.5/1] md:aspect-[2.2/1] mb-12 lg:mb-16">
          <Image
            src={data.bannerImg}
            alt={data.title.replace("\n", " ")}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <article className="w-full space-y-6 md:space-y-8 font-sans text-sm md:text-[15px] lg:text-base text-[#444444] leading-[1.8] tracking-wide font-light">
          {data.sections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              {section.heading && (
                <h2 className="font-sans text-xl md:text-2xl text-[#222222] mt-10 md:mt-12 mb-2 font-normal">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>
          ))}
        </article>
      </section>

      <Footer />
    </main>
  );
}
