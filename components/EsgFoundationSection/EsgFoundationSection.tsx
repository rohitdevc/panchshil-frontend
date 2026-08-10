"use client";

import Image from "next/image";
import { EsgPerformanceApiItem } from "@/interfaces";
import { findTypeMetrics } from "@/utils/utils";
import nl2br from "nl2br";
import parser from "html-react-parser";

export default function EsgFoundationSection({
  performance,
}: {
  performance?: EsgPerformanceApiItem[];
}) {
  const foundationData = findTypeMetrics(performance, 3);

  return (
    <section
      id={foundationData?.performance_title
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\./g, "")
        .replace(/\s+/g, "-")}
      className="w-full bg-[#FFFFFF] py-16 md:py-24 border-t border-[#E2DFD7]/30 transition-colors duration-300"
    >
      <div className="max-w-[1540px] mx-auto px-6 md:px-10 lg:px-12">
        {/* Header centered */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#40A937] text-xs md:text-sm font-normal tracking-widest uppercase block mb-3 font-sans">
            — 04
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-[56px] font-display text-[#1F180D] leading-[1.1] tracking-tight font-medium">
            {foundationData?.performance_title}
          </h2>
        </div>

        {foundationData?.performance_image && (
          <div className="w-full relative aspect-[21/9] min-h-[260px] md:min-h-[420px] overflow-hidden rounded-[2px] shadow-sm">
            <Image
              src={foundationData?.performance_image || ""}
              alt={foundationData?.performance_title}
              fill
              className="object-cover object-center"
            />
          </div>
        )}

        {foundationData?.performance_description && (
          <div className="lg:col-span-7">
            <p className="mt-4 text-sm md:text-base text-gray-600 font-sans font-light mb-8">
              {parser(nl2br(foundationData.performance_description))}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
