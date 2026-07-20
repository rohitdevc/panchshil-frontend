"use client";

import { EsgPerformanceApiItem } from "@/interfaces";
import React, { useState, useEffect } from "react";

interface TabItem {
  id: string;
  label: string;
}

const createTabs = (tabsData: EsgPerformanceApiItem[] = []): TabItem[] => [
  {
    id: "overview",
    label: "ALL IMPACT AREAS",
  },
  ...tabsData.map((item) => ({
    id: item?.performance_title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\./g, "")
      .replace(/\s+/g, "-"),
    label: item?.performance_title.replace(/\./g, "").toUpperCase(),
  })),
];

export default function EsgTabBar({
  performance,
}: {
  performance?: EsgPerformanceApiItem[];
}) {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const tabs = createTabs(performance ?? []);

  useEffect(() => {
    const handleScroll = () => {
      const headerOffset = 240; // Scrolled header (158px) + tab bar (~60px) + margin
      let currentActive = "overview";

      for (const tab of tabs) {
        const el = document.getElementById(tab.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the element's top is scrolled past our trigger line
          if (rect.top <= headerOffset + 20) {
            currentActive = tab.id;
          }
        }
      }
      setActiveTab(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount to set initial active tab
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTabClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 220; // Scrolled header (158px) + tab bar (~60px)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveTab(id);
    }
  };
  return (
    <div className="w-full bg-white border-b border-gray-200/40 py-4 px-4 sticky top-[98px] md:top-[158px] z-40 transition-all duration-300">
      <div className="max-w-[1540px] mx-auto flex items-center justify-start lg:justify-center overflow-x-auto no-scrollbar gap-2 md:gap-4 lg:gap-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={(e) => handleTabClick(e, tab.id)}
              className={`text-[10px] md:text-xs tracking-widest font-semibold font-sans uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#0C190E] border-2 border-[#B2D5AE] text-white px-5 py-2 rounded-full"
                  : "text-[#7F847E] hover:text-black px-4 py-2 border-2 border-transparent"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
