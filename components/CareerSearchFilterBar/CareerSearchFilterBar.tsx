"use client";

import { useEffect, useRef, useState } from "react";

type CareerSearchFilterBarProps = {
  searchText: string;
  selectedLocation: string[];
  selectedSkill: string[];
  selectedFunction: string[];
  selectedExperience: string[];
  locationOptions: string[];
  skillOptions: string[];
  functionOptions: string[];
  experienceOptions: string[];
  onSearchTextChange: (value: string) => void;
  onLocationChange: (value: string[]) => void;
  onSkillChange: (value: string[]) => void;
  onFunctionChange: (value: string[]) => void;
  onExperienceChange: (value: string[]) => void;
};

const ALL_OPTION = "All";

function SearchIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#8e8e8e]"
      aria-hidden="true"
    >
      <path
        d="M21 21L16.6 16.6M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string[];
  options: string[];
  onChange: (value: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const allOptions = [ALL_OPTION, ...options];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    if (option === ALL_OPTION) {
      onChange([]);
      return;
    }

    const nextValues = value.includes(option)
      ? value.filter((item) => item !== option)
      : [...value, option];
    onChange(nextValues);
  };

  const displayLabel =
    value.length === 0
      ? label
      : value.length === 1
        ? value[0]
        : `${value.length} selected`;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-2 border-b border-[#bfbfbf] bg-transparent pb-3 pr-1 text-[18px] leading-tight text-[#272727] outline-none"
      >
        <span
          className={value.length > 0 ? "text-[#272727]" : "text-[#444444]"}
        >
          {displayLabel}
        </span>
        <span
          className={`text-[#646464] transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          ˅
        </span>
      </button>

      {isOpen ? (
        <div className="absolute bottom-full left-0 mb-2 border border-gold-beige shadow-lg min-w-[260px] max-h-60 overflow-y-auto z-20 bg-white">
          <ul>
            {allOptions.map((option, index) => {
              const isSelected =
                option === ALL_OPTION
                  ? value.length === 0
                  : value.includes(option);
              const isLast = index === allOptions.length - 1;

              return (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`w-full text-black-chocolate text-left px-4 py-2 cursor-pointer text-sm transition-colors flex items-center gap-2 ${
                      !isLast ? "border-b border-b-gold-beige" : ""
                    } ${
                      isSelected
                        ? "bg-gold-beige font-medium text-white"
                        : "bg-white text-black-chocolate"
                    }`}
                  >
                    <span
                      className={`w-3 h-3 border flex items-center justify-center ${
                        isSelected
                          ? "bg-gold-beige border-white"
                          : "border-black"
                      }`}
                    >
                      {isSelected ? (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : null}
                    </span>
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default function CareerSearchFilterBar({
  searchText,
  selectedLocation,
  selectedSkill,
  selectedFunction,
  selectedExperience,
  locationOptions,
  skillOptions,
  functionOptions,
  experienceOptions,
  onSearchTextChange,
  onLocationChange,
  onSkillChange,
  onFunctionChange,
  onExperienceChange,
}: CareerSearchFilterBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [isDocked, setIsDocked] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsDocked(window.scrollY > 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
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
    <section
      className={`z-40 w-full border-y border-black/10 bg-[#FFFAF7]/95 backdrop-blur transition-all duration-300 ${shouldShowDocked ? "fixed bottom-0 left-0 right-0 shadow-[0_-6px_20px_rgba(0,0,0,0.12)] opacity-100 translate-y-0" : isDocked ? "fixed bottom-0 left-0 right-0 opacity-0 translate-y-full pointer-events-none" : "relative"}`}
    >
      <div
        ref={barRef}
        className="mx-auto max-w-[1440px] px-4 md:px-8 py-6 md:py-8"
      >
        <div className="flex items-center gap-4 border-b border-[#bfbfbf] pb-3 mb-6 hidden">
          <SearchIcon />
          <input
            value={searchText}
            onChange={(event) => onSearchTextChange(event.target.value)}
            placeholder="Search"
            className="w-full bg-transparent text-[18px] text-[#272727] placeholder:text-[#7d7d7d] outline-none"
            type="text"
          />
          <button
            type="button"
            className="min-w-[108px] bg-[#ad9d7d] px-6 py-2.5 text-[16px] text-white transition-opacity hover:opacity-95"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          <FilterSelect
            label="Select Location"
            value={selectedLocation}
            options={locationOptions}
            onChange={onLocationChange}
          />
          <FilterSelect
            label="Your Relevant Skills"
            value={selectedSkill}
            options={skillOptions}
            onChange={onSkillChange}
          />
          <FilterSelect
            label="Select Functions"
            value={selectedFunction}
            options={functionOptions}
            onChange={onFunctionChange}
          />
          <FilterSelect
            label="Select Experience"
            value={selectedExperience}
            options={experienceOptions}
            onChange={onExperienceChange}
          />
        </div>
      </div>
    </section>
  );
}
