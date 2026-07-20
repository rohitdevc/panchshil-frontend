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

export default function EsgWaterSection({
  performance,
}: {
  performance?: EsgPerformanceApiItem[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const waterData = findTypeMetrics(performance, "water");

  const metrics: MetricItem[] =
    waterData?.metrics!.map((m, i) => ({
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

  return (
    <section
      id={waterData?.performance_title
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\./g, "")
        .replace(/\s+/g, "-")}
      ref={sectionRef}
      className="w-full bg-[#FFFFFF] py-16 md:py-24 border-t border-[#E2DFD7]/30 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="absolute top-10 left-[-150px] w-[600px] h-[600px] pointer-events-none opacity-[0.06] select-none z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full text-black">
          <circle
            cx="50"
            cy="50"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
          />
          <circle
            cx="50"
            cy="50"
            r="50"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
          />
          <circle
            cx="50"
            cy="50"
            r="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
          />
          <circle
            cx="50"
            cy="50"
            r="70"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
          />
        </svg>
      </div>

      <div className="max-w-[1540px] mx-auto px-6 md:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 md:mb-10">
          <div className="lg:col-span-6 flex flex-col">
            <span className="text-[#40A937] text-xs md:text-sm font-normal tracking-widest uppercase block mb-3 font-sans">
              - 02 / {waterData?.performance_tagline}
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-display text-[#1F180D] leading-[1.1] tracking-tight font-medium">
              Water.
            </h2>
            <p className="mt-4 text-sm md:text-base text-[#626A70] font-sans font-light max-w-md">
              {waterData?.performance_description}
            </p>
          </div>
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.06] select-none z-0 -translate-1/2">
            <svg viewBox="0 0 100 100" className="w-full h-full text-black">
              <circle
                cx="50"
                cy="50"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.1"
              />
              <circle
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.1"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.1"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.1"
              />
              <circle
                cx="50"
                cy="50"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.1"
              />
              <circle
                cx="50"
                cy="50"
                r="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.1"
              />
              <circle
                cx="50"
                cy="50"
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.1"
              />
            </svg>
          </div>
          <div className="lg:col-span-6 flex justify-end">
            <div className="w-full relative aspect-[21/10] max-w-[560px] overflow-hidden rounded-[2px] shadow-sm">
              <Image
                src={waterData?.performance_image || ""}
                alt="Water Droplet Banner"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 pt-0">
          {metrics.map((item, index) => (
            <div key={index} className="bg-[#ddd]">
              <div
                className={`px-6 py-8 min-h-[150px] flex flex-col justify-center bg-white transition-all duration-300 hover:bg-[#f8f5ee] hover:-translate-y-[3px] group ${item.borderClass}`}
              >
                <div>
                  <span className="font-display text-3xl md:text-[40px] lg:text-[44px] font-normal text-[#1F180D] leading-none tracking-tight">
                    <AnimatedMetric value={item.value} isActive={isInView} />
                  </span>
                  {item.unit && (
                    <span className="font-display text-[10px] md:text-xs font-normal text-[#7F847E] font-sans ml-1.5 tracking-wide align-baseline">
                      {item.unit}
                    </span>
                  )}
                </div>
                <div className="w-44">
                  <span className="text-[10px] md:text-[11px] font-normal text-[#40A937] tracking-wider font-sans mt-3 block leading-relaxed">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-10 right-[-150px] w-[600px] h-[600px] pointer-events-none opacity-[0.06] select-none z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full text-black">
          <circle
            cx="50"
            cy="50"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
          />
          <circle
            cx="50"
            cy="50"
            r="50"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
          />
          <circle
            cx="50"
            cy="50"
            r="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
          />
          <circle
            cx="50"
            cy="50"
            r="70"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
          />
        </svg>
      </div>
    </section>
  );
}
