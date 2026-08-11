"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCountUp } from "@/hooks/useCountUp";
import { EsgPerformanceApiItem } from "@/interfaces";
import { findTypeMetrics } from "@/utils/utils";

interface MetricItem {
  value: string;
  unit: string;
  label: string;
}

function parseNumericValue(value: string): {
  target: number;
  prefix: string;
  suffix: string;
} {
  const suffixMatch = value.match(/%/);
  const prefixMatch = value.match(/^~/);
  const clean = value.replace(/[~%]/g, "").replace(/,/g, "");
  return {
    target: parseFloat(clean) || 0,
    prefix: prefixMatch ? "~" : "",
    suffix: suffixMatch ? "%" : "",
  };
}

function formatNumber(num: number, decimals: number): string {
  if (decimals > 0) {
    return num.toLocaleString("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  return num.toLocaleString("en-IN");
}

function AnimatedMetric({
  value,
  isActive,
}: {
  value: string;
  isActive: boolean;
}) {
  const { target, prefix, suffix } = parseNumericValue(value);
  const animatedValue = useCountUp(target, isActive);
  const decimals = value.includes(".")
    ? value.split(".")[1].replace(/,/g, "").length
    : 0;
  const display = prefix + formatNumber(animatedValue, decimals) + suffix;
  return <>{display}</>;
}

type Props = {
  performance?: EsgPerformanceApiItem[];
};

export default function EsgEnergySection({ performance }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? 0 : index);
  };

  const energyData = findTypeMetrics(performance, 0);
  const metrics: MetricItem[] =
    energyData?.metrics!.map((m) => ({
      value: m.metric_value || "",
      unit: m.metric_config || "",
      label: m.metric_description || "",
    })) || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={energyData?.performance_title
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\./g, "")
        .replace(/\s+/g, "-")}
      ref={sectionRef}
      className="w-full bg-[#F8F5EE] py-16 md:py-24 transition-colors duration-300"
    >
      <div className="max-w-[1540px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-[#40A937] text-xs md:text-sm font-normal tracking-widest uppercase block mb-3 font-sans">
              — 01 / {energyData?.performance_tagline}
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-display text-[#1F180D] leading-[1.1] tracking-tight font-medium">
              {energyData?.performance_title}
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-600 font-sans font-light mb-8 max-w-md">
              {energyData?.performance_description}
            </p>
            <div className="w-full relative aspect-[4/3] max-w-[460px] overflow-hidden rounded-[2px] shadow-sm">
              <Image
                src={energyData?.performance_image || ""}
                alt="Solar Panels Banner"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="lg:col-span-7 lg:pt-16">
            {metrics &&
              metrics.length > 0 &&
              metrics.map((item, index) => {
                const isExpanded = expandedIndex === index;

                return (
                  <div key={index} className="border-b border-[#E2DFD7]/80">
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="cursor-pointer w-full py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between text-left group transition-colors duration-200"
                    >
                      <h3 className="font-display text-[22px] md:text-[26px] font-medium text-[#1F180D] mt-5 transition-colors duration-300 leading-tight">
                        {item.value}
                      </h3>

                      <div className="flex items-center gap-6 mt-2 md:mt-0 justify-between md:justify-end w-full md:w-auto">
                        <span className="font-display text-[10px] md:text-[11px] font-normal tracking-wider text-[#35393B]/80 font-sans">
                          {item.unit}
                        </span>
                        <svg
                          className={`w-4 h-4 text-[#7F847E]  transition-transform duration-300 transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded
                          ? "max-h-auto opacity-100 pb-10"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="font-sans text-sm text-[#626A70] mt-2 leading-relaxed font-light">
                        {item.label}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
