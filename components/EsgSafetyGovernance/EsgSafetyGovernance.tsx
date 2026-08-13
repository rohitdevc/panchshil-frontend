"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCountUp } from "@/hooks/useCountUp";
import { EsgSafetyGovernanceCategoryApiItem } from "@/interfaces";

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

interface AccordionItem {
  categoryName: string;
  safetyData: SafetyData[];
}

type Props = {
  safetyGovernance?: EsgSafetyGovernanceCategoryApiItem[];
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

const PortfolioCoverage = ({ data }: { data: typeof defaultPortfolioData }) => {
  return (
    data &&
    data.length > 0 && (
      <section className=" py-10 border-t border-[#E2DFD7]/80">
        <div className="mx-auto ">
          <p className="mb-10 text-xs uppercase tracking-[0.45em] text-[#40a937]">
            Portfolio Coverage - Assets
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            {data.map((portfolio) => (
              <div
                key={portfolio.title}
                className="bg-[#F8FCFD] p-10 min-h-[400px]"
              >
                <h2 className="font-serif text-2xl leading-tight text-[#1C2A22]">
                  {portfolio.title}
                </h2>

                <p className="mt-1 text-sm leading-8 text-[#5D6963]">
                  {portfolio.description}
                </p>

                <ul className="mt-5 space-y-6">
                  {portfolio.assets.map((item) => (
                    <li key={item} className="flex items-center gap-3 mb-4">
                      <span className="block h-[1px] w-4 bg-[#40a937]" />
                      <span className="text-sm leading-none text-[#2E483C]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default function EsgSafetyGovernance({ safetyGovernance }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  const acData: AccordionItem[] =
    safetyGovernance && safetyGovernance.length > 0
      ? safetyGovernance.map((categoryData) => ({
          categoryName: categoryData.safety_and_governance_category_title,
          safetyData: categoryData.safety_and_governances.map((item) => ({
            title: item.safety_and_governance_title || "",
            subtitle: item.safety_and_governance_caption || "",
            subGrid: (item.metrics || []).map((m) => ({
              value: m.metric_value || "",
              label: m.metric_caption || "",
              desc: m.metric_description || "",
            })),
          })),
        }))
      : [];

  const isoAssets = safetyGovernance
    ?.flatMap((category) => category.safety_and_governances ?? [])
    .find(
      (item) =>
        item.safety_and_governance_title === "ISO Integrated Management Systems"
    )?.assets;

  const pfData: typeof defaultPortfolioData =
    isoAssets && isoAssets.length > 0
      ? isoAssets.map((a) => ({
          title: a.asset_title || "",
          description: a.asset_caption || "",
          assets: a.asset_properties || [],
        }))
      : [];

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

  const [expandedIndex, setExpandedIndex] = useState<string | null>("");

  const toggleAccordion = (index: string) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
    <div className="w-full">
      <div id="safety-governance" className="w-full scroll-mt-24">
        <div className="w-full flex flex-col border-t border-[#E2DFD7]/80">
          {acData.map((categoryData, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              <span
                className="font-display text-2xl md:text-3xl font-normal text-[#1F180D] leading-none tracking-tight uppercase py-10 border-b border-[#E2DFD7]/80"
                key={categoryIndex}
              >
                {numberToRoman(categoryIndex)}. {categoryData.categoryName}
              </span>
              {categoryData.safetyData &&
                categoryData.safetyData.length > 0 &&
                categoryData.safetyData.map((item, index) => {
                  const isExpanded =
                    expandedIndex === `${categoryIndex}-${index}`;

                  return (
                    <div key={index} className="border-b border-[#E2DFD7]/80">
                      <button
                        onClick={() =>
                          toggleAccordion(`${categoryIndex}-${index}`)
                        }
                        className="cursor-pointer w-full py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between text-left group transition-colors duration-200"
                      >
                        <span className="font-display text-lg md:text-[22px] font-medium text-[#1F180D]  transition-colors leading-tight">
                          <span className="uppercase">
                            {numberToAlphabet(index)}.{" "}
                          </span>
                          {item.title}
                        </span>

                        <div className="flex items-center gap-6 mt-2 md:mt-0 justify-between md:justify-end w-full md:w-auto">
                          <span className="font-display text-[10px] md:text-[11px] font-normal tracking-wider text-[#35393B]/80 font-sans">
                            {item.subtitle}
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
                        {item.subGrid && (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                              {item.subGrid.map((sub, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="flex flex-col border-t border-[#E2DFD7]/80 pt-8 p-6 transition-all duration-300  group"
                                >
                                  <span className="font-display text-2xl md:text-3xl font-normal text-[#1F180D] leading-none tracking-tight">
                                    {sub.value}
                                  </span>
                                  <span className="text-[10px] md:text-[11px] font-normal text-[#40A937] tracking-wider font-sans mt-2 block">
                                    {sub.label}
                                  </span>
                                  <p className="font-sans text-xs text-[#626A70] mt-2 leading-relaxed font-light">
                                    {sub.desc}
                                  </p>
                                </div>
                              ))}
                            </div>
                            {item.title ===
                              "ISO Integrated Management Systems" && (
                              <PortfolioCoverage data={pfData} />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="w-full mt-5">
        <span className="text-[11px] md:text-xs text-gray-500 font-sans font-light tracking-wide block">
          All data is for FY 2025-26 unless stated otherwise.
        </span>
      </div>
    </div>
  );
}
