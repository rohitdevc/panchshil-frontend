"use client";

import Image from "next/image";
import {
  EsgIntroductionApiResponse,
  EsgPerformanceApiItem,
} from "@/interfaces";

const borderClasses = [
  "border-b md:border-r border-[#E2DFD7]/60",
  "border-b md:border-r border-[#E2DFD7]/60",
  "border-b border-[#E2DFD7]/60",
  "border-b md:border-b-0 md:border-r border-[#E2DFD7]/60",
  "border-b md:border-b-0 md:border-r border-[#E2DFD7]/60 last:border-b-0",
  "border-none",
];

type Props = {
  introduction?: EsgIntroductionApiResponse | null;
  performance?: EsgPerformanceApiItem[];
};

export default function EsgOverviewSection({
  introduction,
  performance,
}: Props) {
  return (
    <section
      id="overview"
      className="w-full bg-[#F8F5EE] pt-16 md:pt-24 transition-colors duration-300"
    >
      <div className="max-w-[1540px] mx-auto px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="w-full mb-10 md:mb-14">
          <span className="text-[#40A937] text-xs md:text-sm font-normal tracking-widest uppercase block mb-3 font-sans">
            — 01 / OVERVIEW
          </span>

          {introduction?.intro_heading && (
            <h2
              className="text-3xl md:text-5xl lg:text-[56px] font-display text-[#1F180D] leading-[1.15] tracking-tight font-medium [&_p]:inline [&_span]:text-[#40A937]"
              dangerouslySetInnerHTML={{ __html: introduction.intro_heading }}
            />
          )}

          <p className="mt-2 text-sm md:text-base lg:text-[17px] text-[#626A70] font-sans font-light tracking-wide">
            {introduction?.intro_caption}
          </p>
        </div>

        {/* Banner Image */}
        <div className="w-full relative aspect-[21/9] min-h-[260px] md:min-h-[400px] overflow-hidden mb-12 md:mb-16 rounded-[2px] shadow-sm">
          <Image
            src={introduction?.intro_image || ""}
            alt="Our ESG Impact Banner"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* 3x2 Grid of Impact Areas */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 ">
          {performance?.map((item, index) => (
            <div
              key={index}
              className={`relative p-8 md:p-12 lg:p-14 min-h-[220px] md:min-h-[300px] flex flex-col justify-between bg-transparent transition-all duration-300 hover:bg-[#07150A] hover:-translate-y-[2px] group ${borderClasses[index] || borderClasses[borderClasses.length - 1]}`}
            >
              <div>
                {/* Number */}
                <span className="font-display text-[44px] md:text-[54px] lg:text-[60px] font-medium text-[#E2DFD7] leading-none transition-colors duration-300 group-hover:text-[#40A937] block">
                  {index + 1 > 9 ? "" : 0}
                  {index + 1}
                </span>

                {/* Title */}
                <h3 className="font-display text-[22px] md:text-[26px] font-medium text-[#1F180D] mt-5 transition-colors duration-300 group-hover:text-white leading-tight">
                  {item.performance_title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs md:text-[13px] lg:text-sm text-gray-600 mt-3 leading-relaxed transition-colors duration-300 group-hover:text-white/80 font-light">
                  {item.performance_short_desc}
                </p>
              </div>

              {/* Bottom Horizontal Accent Line */}
              <div className="w-12 h-px bg-[#AB9B81] transition-all duration-300 group-hover:bg-[#40A937] group-hover:w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
