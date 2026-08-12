"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCountUp } from "@/hooks/useCountUp";
import { EsgPerformanceApiItem } from "@/interfaces";
import { findTypeMetrics } from "@/utils/utils";

interface SubGridItem {
  value: string;
  label: string;
  desc: string;
}

interface SubGridItem {
  value: string;
  label: string;
  desc: string;
}

interface SafetyData {
  title: string;
  subtitle: string;
  subGrid?: SubGridItem[];
}

interface MetricItem {
  value: string;
  unit: string;
  label: string;
  borderClass: string;
}

type Props = {
  performance?: EsgPerformanceApiItem[];
};

const defaultPortfolioData = [
  {
    title: "Panchshil Portfolio",
    description:
      "Core Panchshil office park assets covered under Integrated Management System certifications.",
    assets: [
      "EON Free Zone I & II",
      "World Trade Centre Pune",
      "Panchshil Business Park East & West",
      "Tech Park One",
      "Panchshil Tech Park Shivajinagar",
      "Panchshil Avenue",
      "Quadra I",
    ],
  },
  {
    title: "Ventive Hospitality Portfolio",
    description:
      "Additional assets covered under the integrated certification framework.",
    assets: [
      "Business Bay",
      "International Convention Center",
      "Panchshil Tech Park Hinjewadi",
    ],
  },
];

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
  isTextValue: boolean;
} {
  const prefix = value.match(/^~/) ? "~" : "";
  const suffix = value.match(/%$/) ? "%" : "";
  const clean = value.replace(/^~/, "").replace(/%$/, "").replace(/,/g, "");

  if (/^\d+(\.\d+)?$/.test(clean)) {
    return { target: parseFloat(clean), prefix, suffix, isTextValue: false };
  }

  const leadingNumber = clean.match(/^([\d.]+)\s*/);
  if (leadingNumber) {
    return {
      target: parseFloat(leadingNumber[1]),
      prefix,
      suffix: " " + clean.slice(leadingNumber[0].length),
      isTextValue: false,
    };
  }

  return { target: 0, prefix: "", suffix: "", isTextValue: true };
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

function getDecimalPlaces(value: string) {
  const cleaned = value.replace(/[^0-9.-]/g, "");
  const parts = cleaned.split(".");
  return parts[1]?.length ?? 0;
}

function AnimatedMetric({
  value,
  isActive,
}: {
  value: string;
  isActive: boolean;
}) {
  const { target, prefix, suffix, isTextValue } = parseNumericValue(value);
  if (isTextValue) {
    return <>{value}</>;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const animatedValue = useCountUp(target, isActive);
  const decimals = getDecimalPlaces(value);
  const display = prefix + formatNumber(animatedValue, decimals) + suffix;
  return <>{display}</>;
}

export default function EsgCertificationsSection({ performance }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const certificationData = findTypeMetrics(performance, 5);

  const metrics: MetricItem[] =
    certificationData?.metrics!.map((m, i) => ({
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
      id={certificationData?.performance_title
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\./g, "")
        .replace(/\s+/g, "-")}
      ref={sectionRef}
      className="w-full bg-white pt-16 md:py-24 border-t border-[#E2DFD7]/30 transition-colors duration-300"
    >
      <div className="max-w-[1540px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-5">
          <div className="lg:col-span-6 flex flex-col">
            <span className="text-[#40A937] text-xs md:text-sm font-normal tracking-widest uppercase block mb-3 font-sans">
              — 06 / {certificationData?.performance_tagline || ""}
            </span>

            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-display text-[#1F180D] leading-[1.1] tracking-tight font-medium">
              {/* Certifications & <br />
              <span className="text-[#40A937]">Safety.</span> */}
              {certificationData?.performance_title || ""}
            </h2>

            <p className="mt-4 text-sm md:text-base text-gray-600 font-sans font-light max-w-xl">
              {certificationData?.performance_description || ""}
            </p>
          </div>

          <div className="lg:col-span-6 flex lg:justify-end justify-start">
            <div className="w-full relative aspect-[7/3] max-w-[600px] overflow-hidden rounded-[2px] shadow-sm">
              <Image
                src={certificationData?.performance_image || ""}
                alt="Certifications Facade Banner"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 py-6 mb-16 hidden">
          {metrics.map((item, index) => (
            <div key={index} className="bg-[#ddd]">
              <div
                className={`relative p-6 min-h-[186px] flex flex-col justify-between bg-[#F8F5EE] transition-all duration-300 hover:bg-[#fff]  hover:-translate-y-[3px] group ${item.borderClass} `}
              >
                <div className="relative">
                  <div className="mt-2">
                    <span className="font-display text-3xl md:text-[40px] lg:text-[44px] font-normal text-[#1F180D] leading-none tracking-tight">
                      <AnimatedMetric value={item.value} isActive={isInView} />
                    </span>
                    {item.unit && (
                      <span className="font-display text-[10px] md:text-xs font-normal text-[#7F847E] font-sans ml-1.5 tracking-wide align-baseline">
                        {item.unit}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] md:text-[11px] font-normal text-[#40A937] tracking-wider font-sans mt-4 block leading-normal">
                    {item.label}
                  </span>
                </div>

                <div className="w-[50px] h-[1px] bg-black/80 mt-5 transition-all duration-1000 group-hover:bg-[#40A937] group-hover:w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
