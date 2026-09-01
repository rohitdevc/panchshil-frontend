"use client";

import Image from "next/image";
import { EsgPerformanceApiItem } from "@/interfaces";
import { findTypeMetrics } from "@/utils/utils";
import React from "react";

interface MetricItem {
  id: number;
  value: string;
  unit: string;
  label: string;
  borderClass: string;
}

const borderClasses = [
  "border-b md:border-r border-[#E2DFD7]/60",
  "border-b md:border-r border-[#E2DFD7]/60",
  "border-b border-[#E2DFD7]/60",
  "border-b md:border-b-0 md:border-r border-[#E2DFD7]/60",
  "border-b md:border-b-0 md:border-r border-[#E2DFD7]/60 last:border-b-0",
  "border-none",
];

export default function EsgTrainingSection({
  performance,
}: {
  performance?: EsgPerformanceApiItem[];
}) {
  const foundationData = findTypeMetrics(performance, 1);

  const metrics: MetricItem[] =
    foundationData?.metrics!.map((m, i) => ({
      id: i + 1,
      value: m.metric_value || "",
      unit: m.metric_config || "",
      label: m.metric_description || "",
      borderClass: borderClasses[i] || "",
    })) || [];

  function numberToAlphabet(index: number) {
    let result = "";

    do {
      result = String.fromCharCode((index % 26) + 65) + result;
      index = Math.floor(index / 26) - 1;
    } while (index >= 0);

    return result;
  }

  function numberToRoman(index: number): string {
    const num = index + 1;

    const romanMap = [
      { value: 1000, numeral: "M" },
      { value: 900, numeral: "CM" },
      { value: 500, numeral: "D" },
      { value: 400, numeral: "CD" },
      { value: 100, numeral: "C" },
      { value: 90, numeral: "XC" },
      { value: 50, numeral: "L" },
      { value: 40, numeral: "XL" },
      { value: 10, numeral: "X" },
      { value: 9, numeral: "IX" },
      { value: 5, numeral: "V" },
      { value: 4, numeral: "IV" },
      { value: 1, numeral: "I" },
    ];

    let result = "";
    let remaining = num;

    for (const { value, numeral } of romanMap) {
      while (remaining >= value) {
        result += numeral;
        remaining -= value;
      }
    }

    return result;
  }

  return (
    <section
      id={foundationData?.performance_title
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\./g, "")
        .replace(/\s+/g, "-")}
      className="w-full bg-[#FFFFFF] py-16 border-t border-[#E2DFD7]/30 transition-colors duration-300"
    >
      <div className="max-w-[1540px] mx-auto px-6 md:px-10 lg:px-12">
        {/* Header centered */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#40A937] text-xs md:text-sm font-normal tracking-widest uppercase block mb-3 font-sans">
            — 02
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

        <div className="w-full flex flex-col border-t border-[#E2DFD7]/80">
          {metrics.map((categoryData, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              <span
                className="font-display text-2xl md:text-3xl font-normal text-[#1F180D] leading-none tracking-tight uppercase py-10 border-b border-[#E2DFD7]/80"
                key={categoryIndex}
              >
                {numberToRoman(categoryIndex)}. {categoryData.value}
              </span>
              {categoryData.label &&
                categoryData.label.split("\r\n").length > 0 &&
                categoryData.label.split("\r\n").map((item, index) => {
                  return (
                    <div key={index} className="border-b border-[#E2DFD7]/80">
                      <span className="w-full py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between text-left group transition-colors duration-200">
                        <span className="font-display text-lg md:text-[22px] font-medium text-[#1F180D]  transition-colors leading-tight">
                          <span className="uppercase">
                            {numberToAlphabet(index)}.{" "}
                          </span>
                          {item}
                        </span>
                      </span>
                    </div>
                  );
                })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
