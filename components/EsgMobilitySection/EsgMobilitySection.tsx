"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import mobilityBanner from "@/assets/images/esg/mobility-banner.png";
import { useCountUp } from "@/hooks/useCountUp";
import { EsgPerformanceApiItem } from "@/interfaces";
import { findTypeMetrics } from "@/utils/utils";

interface MetricItem {
  value: string;
  unit?: string;
  label: string;
  borderClass: string;
  isTextValue?: boolean;
}

const borderClasses = [
  " md:border-t border-white/10",
  "md:border-t border-white/10",
  "border-t border-white/10",
  "border-b md:border-b-0 md:border-t border-white/10",
  "border-b md:border-b-0 md:border-t border-white/10 last:border-b-0",
  "border-b md:border-b-0 md:border-t border-white/10 last:border-b-0",
];

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

export default function EsgMobilitySection({
  performance,
}: {
  performance?: EsgPerformanceApiItem[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const mobilityData = findTypeMetrics(performance, 4);

  const metrics: MetricItem[] =
    mobilityData?.metrics!.map((m, i) => ({
      id: i + 1,
      value: m.metric_value || "",
      unit: m.metric_config || "",
      label: m.metric_description || "",
      borderClass: borderClasses[i] || "",
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
  const regex = /\d/;
  return (
    <section
      id={mobilityData?.performance_title
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\./g, "")
        .replace(/\s+/g, "-")}
      ref={sectionRef}
      className="w-full relative min-h-[600px] flex flex-col justify-between py-16 md:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={mobilityData?.performance_image || mobilityBanner}
          alt="Mobility Banner Background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/100 to-black/20" />
      </div>

      <div className="max-w-[1540px] w-full mx-auto px-6 md:px-10 lg:px-12 relative z-10 flex-1 flex flex-col justify-between">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20">
          <div className="flex flex-col">
            <span className="text-[#40A937] text-xs md:text-sm font-normal tracking-widest uppercase block mb-3 font-sans">
              - 05 / {mobilityData?.performance_tagline || ""}
            </span>

            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-display text-white leading-[1.1] tracking-tight font-medium">
              {mobilityData?.performance_title || ""}
            </h2>
          </div>

          <div className="mt-4 md:mt-0">
            <p className="text-sm md:text-base text-white/70 font-sans font-light tracking-wide md:text-right">
              {mobilityData?.performance_description || ""}
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6 pt-4">
          {metrics.map((item, index) => (
            <div
              key={index}
              className={`p-8 md:p-6 min-h-[140px] flex flex-col justify-between bg-transparent transition-all duration-300 group ${item.borderClass}`}
            >
              <div>
                <div>
                  <span
                    className={`font-display text-white leading-none tracking-tight font-normal transition-colors duration-300 group-hover:text-white ${
                      item.isTextValue
                        ? "text-2xl md:text-3xl lg:text-[34px]"
                        : "text-3xl md:text-[40px] lg:text-[44px]"
                    }`}
                  >
                    {!regex.test(item.value) ? (
                      item.value
                    ) : (
                      <AnimatedMetric value={item.value} isActive={isInView} />
                    )}
                  </span>
                  {item.unit && (
                    <span className="text-[10px] md:text-xs font-semibold text-white/50 font-sans ml-1.5 tracking-wide align-baseline transition-colors duration-300 group-hover:text-white/75">
                      {item.unit}
                    </span>
                  )}
                </div>

                <span className="text-[10px] md:text-[11px] font-normal text-[#40A937] tracking-wider font-sans mt-3 block leading-relaxed uppercase">
                  {item.label}
                </span>
              </div>

              <div className="w-0 h-[1px] bg-white/20 mt-5 transition-all duration-1000 group-hover:bg-[#40A937] group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
