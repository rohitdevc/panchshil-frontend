"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCountUp } from "@/hooks/useCountUp";
import { CareerHeroContent } from "@/app/careers/career-page.data";
import { EsgMilestoneApiItem, EsgTickerApiItem } from "@/interfaces";

export interface EsgHeroProps {
  hero?: CareerHeroContent;
  milestones?: EsgMilestoneApiItem[];
  ticker?: EsgTickerApiItem[];
}

export interface EsgHeroCard {
  value: string;
  unit: string;
  label: string;
}

export interface EsgHeroTickerItem {
  number: string;
  text: string;
  ticker_count_config: string;
}

function parseNumericValue(value: string): {
  target: number;
  prefix: string;
  suffix: string;
} {
  const prefix = value.match(/^~/) ? "~" : "";
  const suffix = value.match(/%$/) ? "%" : "";
  const clean = value.replace(/^~/, "").replace(/%$/, "").replace(/,/g, "");
  return {
    target: parseFloat(clean) || 0,
    prefix,
    suffix,
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
  const decimals = 0;
  const display = prefix + formatNumber(animatedValue, decimals) + suffix;
  return <>{display}</>;
}

export default function EsgHero({
  hero = {} as CareerHeroContent,
  milestones = [],
  ticker = [],
}: EsgHeroProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  const cards: EsgHeroCard[] =
    milestones && milestones.length > 0
      ? milestones.map((m) => ({
          value: m.milestone_count || "",
          unit: m.milestone_count_config || "",
          label: m.milestone_description || "",
        }))
      : [];

  const tickerItems: EsgHeroTickerItem[] = ticker.map((t) => ({
    number: t.ticker_count || t.ticker_caption || "",
    text: t.ticker_count ? t.ticker_caption || "" : "",
    ticker_count_config: t.ticker_count_config || "",
  }));

  const defaultTicker: EsgHeroTickerItem[] = [
    ...tickerItems,
    ...tickerItems,
    ...tickerItems,
    ...tickerItems,
  ];

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
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#0F140D]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.imageSrc}
          alt="ESG at Panchshil Hero Banner"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Subtle dark overlay for readability */}
        <div className="absolute inset-0 bg-black/20 z-0" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-end w-full max-w-[1540px] mx-auto px-6 md:px-10 lg:px-12 pt-36 pb-8">
        <div className="w-full mb-12">
          {/* Badge */}
          <span className="text-[#40A937] text-xs md:text-sm font-normal tracking-widest uppercase block mb-4 animate-fade-in-up">
            - ESG AT PANCHSHIL
          </span>

          {/* Heading */}
          {hero.title && (
            <h1
              className="text-4xl md:text-5xl lg:text-[64px] font-display text-white leading-[1.1] tracking-tight max-w-4xl animate-fade-in-up-delay-1"
              dangerouslySetInnerHTML={{ __html: hero.title }}
            />
          )}

          {/* Description */}
          {hero.description && (
            <p
              className="mt-6 text-sm md:text-base lg:text-[17px] text-[#E5E7EB] max-w-3xl leading-relaxed animate-fade-in-up-delay-2 font-sans font-light"
              dangerouslySetInnerHTML={{ __html: hero.description }}
            />
          )}
        </div>

        {/* Backdrop Blurred Cards */}
        <div className="relative z-10 w-full animate-fade-in-up-delay-3 mt-4">
          <div className="flex overflow-x-auto gap-4 md:gap-5 pb-4 md:pb-0 no-scrollbar md:grid md:grid-cols-5 md:overflow-x-visible">
            {cards.map((card, index) => (
              <div
                key={index}
                className="w-[283px] md:w-full h-40 shrink-0 flex flex-col justify-between p-5 md:p-6  border border-white/10 backdrop-blur-[2px] transition-all duration-300 group hover:-translate-y-[3px]
                bg-linear-to-b from-white/3 to-white/1 hover:border-[#4ade80] hover:bg-emerald-950/20 hover:shadow-[0_0_30px_rgba(74,222,128,0.15)]"
              >
                <div>
                  <span className="text-3xl md:text-[36px] font-display text-white leading-none font-medium">
                    <AnimatedMetric value={card.value} isActive={isInView} />
                  </span>
                </div>
                <div className="flex flex-col mt-4">
                  {card.unit && (
                    <span className="text-[10px] md:text-[11px] font-semibold tracking-wider text-[#7F847E] font-sans">
                      {card.unit}
                    </span>
                  )}
                  <span className="text-xs md:text-[13px] text-[#40A937] font-sans font-medium mt-1 leading-snug">
                    {card.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Scrolling Ticker */}
      <div className="relative z-20 w-full  border-t border-b border-white/[0.05] backdrop-blur-[2px] py-4.5 overflow-hidden">
        <div className="flex whitespace-nowrap">
          {/* Main content group */}
          <div className="flex items-center gap-12 shrink-0 animate-marquee">
            {defaultTicker.map((item, idx) => (
              <div key={idx} className="flex items-center gap-12">
                <div className="flex items-center gap-2  tracking-widest uppercase ">
                  {item.number.match(/[A-Z]/) ? (
                    <span className="text-[#40A937] font-display-semi">
                      {item.number}
                    </span>
                  ) : (
                    <span className="text-white text-lg font-display-semi">
                      {item.number}
                    </span>
                  )}
                  {item.ticker_count_config && (
                    <span className="text-[10px] md:text-xs  text-[#7F847E] tracking-wide select-none align-baseline">
                      {item.ticker_count_config}
                    </span>
                  )}
                  {item.text && (
                    <span className="text-[#40A937] text-xs ">{item.text}</span>
                  )}
                </div>
                <span className="text-white/40 select-none px-2">•</span>
              </div>
            ))}
          </div>
          {/* Duplicate content group for seamless loop */}
          <div
            className="flex items-center gap-12 shrink-0 animate-marquee"
            aria-hidden="true"
          >
            {defaultTicker.map((item, idx) => (
              <div key={`dup-${idx}`} className="flex items-center gap-12">
                <div className="flex items-center gap-2 font-sans  tracking-widest uppercase font-semibold">
                  {item.number.match(/[A-Z]/) ? (
                    <span className="text-[#40A937] font-display-semi">
                      {item.number}
                    </span>
                  ) : (
                    <span className="text-white text-lg font-display-semi">
                      {item.number}
                    </span>
                  )}{" "}
                  {item.ticker_count_config && (
                    <span className="text-[10px] md:text-xs  text-[#7F847E] tracking-wide uppercase select-none align-baseline">
                      {item.ticker_count_config}
                    </span>
                  )}
                  {item.text && (
                    <span className="text-[#40A937] text-xs ">{item.text}</span>
                  )}
                </div>
                <span className="text-white/40 select-none px-2">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
