"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useThemeStore } from "@/store/themeStore";
import { useNavigationMenu } from "@/hooks/useNavigationMenu";
import { isAllowedPageForTheme } from "@/utils/utils";
import { useParams } from "next/navigation";
import { NavigationMenuItemProps } from "@/interfaces";
import Link from "next/link";

interface DevelopmentForYouProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

const DevelopmentForYou = ({
  title = "Representing Exceptional, Scale or delivery excellence",
  subtitle = "Development For You",
  description,
}: DevelopmentForYouProps = {}) => {
  const { theme } = useThemeStore();
  const navigationMenu = useNavigationMenu();
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const params = useParams();
  const isAllowedPage = isAllowedPageForTheme(
    params as { [key: string]: string }
  );
  const isDarkMode = isAllowedPage ? theme === "night" : false;
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
      className={`w-full py-10 md:py-10 transition-colors `}
    >
      <div className="mx-auto ">
        {/* Title and Description */}
        <div
          className={`text-center mb-10 ${
            isInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div
            className={`text-lg uppercase font-medium tracking-[0.2em] text-gold-beige mb-2`}
          >
            {title}
          </div>
          <h2
            className={`text-2xl uppercase md:text-[28px] font-display-semi transition-colors text-black`}
          >
            {subtitle}
          </h2>
          {description && (
            <p
              className={`mt-4 text-sm md:text-base max-w-[800px] mx-auto leading-relaxed text-black/80`}
            >
              {description}
            </p>
          )}
        </div>

        <div className="flex md:gap-4 md:flex-row flex-col justify-center">
          {navigationMenu[6]?.menu?.map(
            (item: NavigationMenuItemProps, i: number) => (
              <Link
                className={
                  "w-full  md:basis-[28.571%] shrink-0 grow-0 relative h-[300px] md:h-[420px] overflow-hidden"
                }
                href={item.menuURL}
                key={item.menuURL + i}
              >
                <Image
                  src={
                    isDarkMode
                      ? item.menuNightThumbnail || ""
                      : item.menuDayThumbnail || ""
                  }
                  alt={item.menuTitle}
                  fill
                  className="object-fill"
                  sizes="(min-width: 1024px) 28vw, 80vw"
                />

                {/* bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 via-black/50 to-transparent"></div>

                {/* text overlay */}
                <div className="absolute left-0 right-0 bottom-0 p-5 text-white">
                  <div className="mt-1 text-[15px] md:text-[16px] font-display-semi ">
                    {item.menuTitle}
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default DevelopmentForYou;
