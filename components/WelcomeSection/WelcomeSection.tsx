"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  AboutIntroData,
  BannersProps,
  MilestonesProps,
  Stat,
} from "@/interfaces";

const VENTIVE_HOSPITALITY_TEXT = "For details, visit Ventive Hospitality.";
const VENTIVE_HOSPITALITY_URL = "https://www.ventivehospitality.com/";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderTextWithSingleLink(text: string | undefined | null) {
  if (!text) return null;
  if (!text.includes(VENTIVE_HOSPITALITY_TEXT)) return text;

  const parts = text.split(
    new RegExp(`(${escapeRegExp(VENTIVE_HOSPITALITY_TEXT)})`, "g")
  );

  return parts.map((part, idx) => {
    if (part === VENTIVE_HOSPITALITY_TEXT) {
      return (
        <a
          key={`ventive-link-${idx}`}
          href={VENTIVE_HOSPITALITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          {part}
        </a>
      );
    }

    return <span key={`ventive-text-${idx}`}>{part}</span>;
  });
}

export function useCountUp(
  targetValue: number,
  isActive: boolean,
  duration = 2000
) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let animationFrame: number;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(easedProgress * targetValue);
      setCurrentValue(value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [targetValue, isActive, duration]);

  return currentValue;
}

function StatCard({
  stat,
  isActive,
  delayClass,
}: {
  stat: Stat;
  isActive: boolean;
  delayClass: string;
}) {
  const displayValue = useCountUp(stat.value, isActive);
  const suffix = stat.suffix ?? "";

  return (
    <div
      className={`flex flex-col items-center ${
        isActive ? delayClass : "opacity-0"
      }`}
    >
      <span className="text-4xl md:text-5xl  font-display-semi text-black-chocolate mb-2">
        {displayValue}
        {suffix}
      </span>
      <span className="text-base md:text-lg font-normal text-black-chocolate">
        {stat.description}
      </span>
    </div>
  );
}

export function WelcomeSection({
  aboutIntroData,
  milestones,
  // banner,
}: {
  aboutIntroData: AboutIntroData;
  banner: BannersProps;
  milestones: MilestonesProps[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const isMobile = useIsMobile();

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
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Convert milestones to stats format with countdown animation support
  const stats: Stat[] = (milestones || []).map((milestone) => {
    // Parse milestone_title to extract number and suffix
    // Examples: "55+" -> value: 55, suffix: "+"
    //          "23" -> value: 23, suffix: ""
    const title = milestone.milestone_title || "";
    const match = title.match(/^(\d+)(.*)$/);

    if (match) {
      const value = parseInt(match[1], 10);
      const suffix = match[2] || ""; // Extract any suffix like "+"
      return {
        value,
        suffix,
        description: milestone.milestone_caption || "",
      };
    }

    // Fallback if parsing fails
    return {
      value: 0,
      suffix: "",
      description: milestone.milestone_caption || "",
    };
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Top Content Area with Background Color */}
      <div className="relative bg-[#FFFAF7] pt-16 md:pt-24">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          {/* Title */}
          <h2
            className={`text-2xl md:text-[28px]  font-display-semi mb-6 text-black-chocolate ${
              isInView ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {aboutIntroData?.about_intro_heading}
          </h2>

          {/* Description */}
          <p
            className={`text-lg md:text-lg  mb-12 max-w-4xl mx-auto leading-relaxed text-black-chocolate ${
              isInView ? "animate-fade-in-up-delay-1" : "opacity-0"
            }`}
          >
            {renderTextWithSingleLink(aboutIntroData?.about_intro_description)}
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => {
              const delayClasses = [
                "animate-fade-in-up-delay-2",
                "animate-fade-in-up-delay-3",
                "animate-fade-in-up-delay-4",
                "animate-fade-in-up-delay-5",
              ];
              return (
                <StatCard
                  key={`${stat.description}-${index}`}
                  stat={stat}
                  isActive={isInView}
                  delayClass={
                    delayClasses[index] || "animate-fade-in-up-delay-5"
                  }
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Image Section with Gradient Blend */}
      <div className="relative h-[60vh] md:h-[120vh] ">
        <div
          className={`absolute inset-0 ${
            isInView ? "animate-fade-in-delay" : "opacity-0"
          }`}
        >
          <video
            src={
              isMobile
                ? aboutIntroData?.about_intro_mobile_video
                : aboutIntroData?.about_intro_desktop_video
            }
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            className="w-full h-full object-fill"
            onError={(e) => {
              console.error(
                "Video failed to load:",
                aboutIntroData?.about_intro_desktop_video,
                e
              );
            }}
            onLoadedData={() => {
              // console.log(
              //   "Video loaded successfully:",
              //   aboutIntroData.about_intro_desktop_video
              // );
            }}
            onCanPlay={() => {
              // console.log(
              //   "Video can play:",
              //   aboutIntroData.about_intro_desktop_video
              // );
            }}
          />
        </div>

        {/* Gradient Overlay - blend from #FFFAF7 to transparent */}
        <div className="absolute inset-0 bg-linear-to-b from-[#FFFAF7] via-[#FFFAF7]/40 to-transparent pointer-events-none h-20"></div>
      </div>
    </section>
  );
}
