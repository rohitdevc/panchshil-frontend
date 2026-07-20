"use client";

import Image from "next/image";
import { EsgPerformanceApiItem } from "@/interfaces";
import { findTypeMetrics } from "@/utils/utils";

interface MetricItem {
  value: string;
  label: string;
}

export default function EsgIndoorAirSection({
  performance,
}: {
  performance?: EsgPerformanceApiItem[];
}) {
  const indoorAirData = findTypeMetrics(performance, 3);

  const metrics: MetricItem[] =
    indoorAirData?.metrics!.map((m, i) => ({
      id: i + 1,
      value: m.metric_value || "",
      unit: m.metric_config || "",
      label: m.metric_description || "",
    })) || [];
  return (
    <section
      id={indoorAirData?.performance_title
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
            - 04 / {indoorAirData?.performance_tagline || ""}
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-[56px] font-display text-[#1F180D] leading-[1.1] tracking-tight font-medium">
            {indoorAirData?.performance_title || ""}
          </h2>

          <p className="mt-2 text-sm md:text-base text-gray-600 font-sans font-light tracking-wide">
            {indoorAirData?.performance_description || ""}
          </p>
        </div>

        {/* Full-width Banner Image */}
        <div className="w-full relative aspect-[21/9] min-h-[260px] md:min-h-[420px] overflow-hidden rounded-[2px] shadow-sm">
          <Image
            src={indoorAirData?.performance_image || ""}
            alt="Indoor Air Quality Banner"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* 3x2 Grid of Metrics */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 pt-10">
          {metrics.map((item, index) => (
            <div
              key={index}
              className={`relative p-8 min-h-[140px] flex flex-col justify-between bg-transparent `}
            >
              <div className="relative">
                {/* Index number in the top-right corner of each cell */}

                <div className="mt-2">
                  <span className="font-display text-3xl md:text-[40px] font-normal text-[#1F180D] leading-none tracking-tight">
                    {item.value}
                  </span>
                </div>
                {/* Bottom Accent line */}
                <div className="w-12 h-px bg-[#40A937] mt-5" />

                <span className="text-[10px] md:text-[11px] font-normal text-[#40A937] tracking-wider font-sans mt-4 block leading-normal">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
