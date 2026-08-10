"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EsgPerformanceApiItem } from "@/interfaces";
import { findTypeMetrics } from "@/utils/utils";
import nl2br from "nl2br";
import parser from "html-react-parser";

export default function EsgPoliciesSection({
  performance,
}: {
  performance?: EsgPerformanceApiItem[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const policiesData = findTypeMetrics(performance, 0);

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
      id={policiesData?.performance_title
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\./g, "")
        .replace(/\s+/g, "-")}
      ref={sectionRef}
      className="w-full bg-[#F8F5EE] py-16 md:py-24 border-t border-[#E2DFD7]/30 transition-colors duration-300"
    >
      <div className="max-w-[1540px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="flex flex-col md:flex-row mb-7">
          <div className="flex flex-col">
            <span className="text-[#40A937] text-xs md:text-sm font-normal tracking-widest uppercase block mb-3 font-sans">
              — 01
            </span>

            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-display text-[#1F180D] leading-[1.1] tracking-tight font-medium">
              {policiesData?.performance_title}
            </h2>
          </div>
        </div>
        {policiesData?.performance_image && (
          <div className="w-full relative aspect-[21/8] min-h-[220px] md:min-h-[380px] overflow-hidden mb-12 md:mb-16 rounded-[2px] shadow-sm">
            <Image
              src={policiesData?.performance_image || ""}
              alt={policiesData?.performance_title}
              fill
              className="object-cover object-center"
            />
          </div>
        )}
        {policiesData?.performance_description && (
          <div className="lg:col-span-7">
            <p className="mt-4 text-sm md:text-base text-gray-600 font-sans font-light mb-8">
              {parser(nl2br(policiesData.performance_description))}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
