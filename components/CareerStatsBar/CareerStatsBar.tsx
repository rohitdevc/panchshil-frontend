"use client";

import { useEffect, useRef, useState } from "react";
import { CareerPageDataProp } from "@/app/careers/career-page.data";

type CareerStatsBarProps = {
  stats: CareerPageDataProp["stats"];
};

function useCountUp(targetValue: number, isActive: boolean, duration = 1800) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let animationFrame = 0;
    const start = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrentValue(Math.round(targetValue * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [targetValue, isActive, duration]);

  return currentValue;
}

function CareerStatItem({
  value,
  suffix,
  label,
  isActive,
  showDivider,
}: {
  value: string;
  suffix?: string;
  label: string;
  isActive: boolean;
  showDivider: boolean;
}) {
  //const displayValue = useCountUp(Number(value), isActive);

  return (
    <div
      className={`relative flex flex-col items-center justify-center py-4 md:py-5 ${
        showDivider
          ? "md:after:absolute md:after:right-0 md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-10 md:after:w-px md:after:bg-black/20"
          : ""
      }`}
    >
      <span className="text-2xl md:text-[28px] leading-none font-display-semi text-black-chocolate">
        {value}
      </span>
      <span className="mt-1 text-base md:text-[20px] leading-tight font-display-semi text-black-chocolate">
        {label}
      </span>
    </div>
  );
}

export default function CareerStatsBar({ stats }: CareerStatsBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  // const [barHeight, setBarHeight] = useState(0);

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
      { threshold: 0.2 }
    );

    if (barRef.current) observer.observe(barRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (barRef.current) {
        // setBarHeight(barRef.current.offsetHeight);
      }
    };

    const onScroll = () => {
      setIsDocked(window.scrollY > 0);
    };

    updateHeight();
    onScroll();
    window.addEventListener("resize", updateHeight);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFooterVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const shouldShowDocked = isDocked && !isFooterVisible;

  return (
    <>
      {/* {shouldShowDocked && barHeight > 0 ? (
        <div aria-hidden="true" style={{ height: `${barHeight}px` }} />
      ) : null} */}

      <section
        className={`z-40 w-full bg-[#F2EEEA] h-auto md:h-[104px] border-y border-black/10 transition-all duration-300 ${
          shouldShowDocked
            ? "fixed bottom-0 left-0 right-0 shadow-[0_-6px_20px_rgba(0,0,0,0.12)] opacity-100 translate-y-0"
            : isDocked
              ? "fixed bottom-0 left-0 right-0 opacity-0 translate-y-full pointer-events-none"
              : "relative"
        }`}
      >
        <div ref={barRef} className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-2">
            {stats.map((stat, index) => (
              <CareerStatItem
                key={`${stat.label}-${index}`}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                isActive={isInView}
                showDivider={index !== stats.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
