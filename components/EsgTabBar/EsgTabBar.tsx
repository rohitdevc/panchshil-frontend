"use client";

import { EsgPerformanceApiItem, EsgPerformanceCategory } from "@/interfaces";
import React, { useState, useEffect, useRef } from "react";
import lodash from "lodash";

interface TabItem {
  id: string;
  label: string;
}

const createTabs = (tabsData: EsgPerformanceCategory): TabItem[] => {
  if (!tabsData) {
    return [];
  }

  return [
    ...(tabsData.performance_category_name === "Environmental"
      ? [
          {
            id: "overview",
            label: "ALL IMPACT AREAS",
          },
        ]
      : []),
    ...tabsData.performances.map((item) => ({
      id: item?.performance_title
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\./g, "")
        .replace(/\s+/g, "-"),
      label: item?.performance_title.replace(/\./g, "").toUpperCase(),
    })),
  ];
};

export default function EsgTabBar({
  performance_categories,
}: {
  performance_categories: EsgPerformanceCategory[];
}) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const tabs = createTabs(performance_categories[activeCategory]);

  useEffect(() => {
    const handleScroll = () => {
      const headerOffset = 240;
      let currentActive = 0;

      for (let i = 0; i < performance_categories.length; i++) {
        const key = i;
        const performance_category = performance_categories[key];

        const el = document.getElementById(
          lodash.kebabCase(performance_category.performance_category_name)
        );
        if (el) {
          const rect = el.getBoundingClientRect();

          if (rect.top <= headerOffset + 20) {
            currentActive = key;
          }

          if (
            key === performance_categories.length - 1 &&
            rect.bottom <= headerOffset
          ) {
            currentActive = -1;
          }
        }
      }
      setActiveCategory(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const headerOffset = 240;
      let currentActive = "overview";

      for (const tab of tabs) {
        const el = document.getElementById(tab.id);
        if (el) {
          const rect = el.getBoundingClientRect();

          if (rect.top <= headerOffset + 20) {
            currentActive = tab.id;
          }
        }
      }
      setActiveTab(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tabs]);

  useEffect(() => {
    const activeButton = tabRefs.current[activeTab];

    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeCategory === -1) {
      return;
    }

    const category = performance_categories[activeCategory];

    if (!category) {
      return;
    }

    const categoryId = lodash.kebabCase(category.performance_category_name);

    const activeButton = tabRefs.current[categoryId];

    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeCategory, performance_categories]);

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

  const handleCategoryTabClick = (
    e: React.MouseEvent,
    id: string,
    key: number
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 220;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveCategory(key);
    }
  };
  return (
    <div className="w-full bg-white border-b border-gray-200/40 py-4 px-4 sticky top-[98px] md:top-[158px] z-40 transition-all duration-300">
      <div
        className={`max-w-[1540px] mx-auto flex items-center justify-start lg:justify-center overflow-x-auto no-scrollbar gap-2 md:gap-4 lg:gap-6 ${tabs.length > 0 ? "border-b pb-2" : ""}`}
      >
        {performance_categories.map((performance_category, key) => {
          const isActive = activeCategory === key;
          return (
            <button
              key={lodash.kebabCase(
                performance_category.performance_category_name
              )}
              ref={(el) => {
                if (el)
                  tabRefs.current[
                    lodash.kebabCase(
                      performance_category.performance_category_name
                    )
                  ] = el;
              }}
              onClick={(e) => {
                handleCategoryTabClick(
                  e,
                  lodash.kebabCase(
                    performance_category.performance_category_name
                  ),
                  key
                );
              }}
              className={`text-[10px] md:text-xs tracking-widest font-semibold font-sans uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${isActive ? "bg-[#0C190E] border-2 border-[#B2D5AE] text-white px-5 py-2 rounded-full" : "text-[#7F847E] hover:text-black px-4 py-2 border-2 border-transparent"}`}
            >
              {performance_category.performance_category_name}
            </button>
          );
        })}
      </div>
      {tabs && tabs.length > 0 && (
        <div className="max-w-[1540px] mx-auto flex items-center justify-start lg:justify-center overflow-x-auto no-scrollbar gap-2 md:gap-4 lg:gap-6 pt-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  if (el) tabRefs.current[tab.id] = el;
                }}
                onClick={(e) => handleTabClick(e, tab.id)}
                className={`text-[10px] md:text-xs tracking-widest font-semibold font-sans uppercase transition-all duration-300 whitespace-nowrap cursor-pointer ${isActive ? "bg-[#0C190E] border-2 border-[#B2D5AE] text-white px-5 py-2 rounded-full" : "text-[#7F847E] hover:text-black px-4 py-2 border-2 border-transparent"}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
