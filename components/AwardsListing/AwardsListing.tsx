"use client";

import Image from "next/image";
import type { AwardItem } from "@/app/awards-and-recognitions/awards.data";

type AwardsListingProps = {
  awards: AwardItem[];
  // itemsPerPage?: number;
};

export default function AwardsListing({ awards }: AwardsListingProps) {
  const paginatedAwards = awards;
  return (
    <section className="overflow-x-hidden bg-white py-10 md:py-14">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8">
        <div className="grid min-w-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {paginatedAwards.map((award) => (
            <article key={award.id} className="flex min-w-0 flex-col">
              <div className="flex items-center justify-center overflow-hidden px-2 py-5 bg-[#F7F5F4] h-85">
                <div className="relative h-full w-full">
                  <Image
                    src={award.imageSrc}
                    alt={award.imageAlt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="break-words leading-tight flex flex-col gap-3 bg-white px-2 py-2 border border-[#F7F5F4]">
                <div className="flex justify-between text-gold-beige text-sm">
                  <h2 className="uppercase text-sm tracking-wider">
                    {award.caption}
                  </h2>
                  <h4>{award.year}</h4>
                </div>
                <h3 className="text-base text-[#1f1f1f] font-display-semi">
                  {award.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
