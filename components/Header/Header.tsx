"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useNavigationMenu } from "@/hooks/useNavigationMenu";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

/** Matches desktop nav: About → external URL; other top-level items → `/${menuURL}`. */
function getTopLevelNavHref(item: {
  menuURL?: string;
  menuTitle?: string;
}): string {
  const link =
    item?.menuURL === "about"
      ? "https://www.panchshil.com/about"
      : item?.menuURL;
  if (!link) return "";
  return item?.menuTitle === "About" ? link : `/${link}`;
}

type HeaderProps = {
  blogDetails?: boolean;
};

export function Header({ blogDetails }: HeaderProps) {
  const navigationMenu = useNavigationMenu();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (!blogDetails) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;

        setIsScrolled(scrollPosition > 50);
      };

      handleScroll();

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      const activateBlogPage = () => {
        setIsScrolled(true);
      };

      activateBlogPage();

      return;
    }
  }, []);

  const isMobile = useIsMobile();
  return (
    <header
      className={`${
        isScrolled ? "fixed" : "absolute"
      } top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out`}
    >
      {/* Background overlay with fade effect */}
      <div
        className={`absolute shadow inset-0 bg-white/95 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative max-w-[1920px] mx-auto px-6 lg:px-12">
        {/* Logo and Mobile Menu Button */}
        <div
          className={`relative flex justify-start md:justify-center items-center transition-all duration-300 ease-in-out ${
            isScrolled ? "pt-4 pb-3" : "pt-8 pb-4"
          }`}
        >
          <Link href="/" className="flex flex-col items-center">
            <div
              className={`transition-transform duration-300 ease-in-out ${
                isScrolled ? "scale-75" : "scale-100"
              }`}
            >
              <Image
                src="/assets/images/panchshil-logo.png"
                alt="Panchshil"
                width={isMobile ? 70 : 98}
                height={isMobile ? 70 : 98}
                className="transition-all duration-300"
              />
            </div>
          </Link>

          <button
            type="button"
            className={`md:hidden absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 items-center justify-center rounded-full transition-colors duration-300 ${
              isScrolled ? "text-black-chocolate" : "text-white"
            }`}
            aria-label="Toggle navigation menu"
            onClick={toggleMobileMenu}
          >
            <span
              className={`block w-6 h-0.5 transition-transform duration-300 ${
                isScrolled ? "bg-black-chocolate" : "bg-white"
              } ${isMobileMenuOpen ? "translate-y-[6px] rotate-45" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 transition-opacity duration-300 ${
                isScrolled ? "bg-black-chocolate" : "bg-white"
              } ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
            ></span>
            <span
              className={`block w-6 h-0.5 transition-transform duration-300 ${
                isScrolled ? "bg-black-chocolate" : "bg-white"
              } ${isMobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
            ></span>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex justify-center">
          <ul
            className={`flex flex-wrap justify-center gap-3 lg:gap-12 transition-colors duration-300 ${
              isScrolled ? "text-black-chocolate" : "text-white"
            }`}
          >
            {navigationMenu?.map((item, i) => {
              return (
                <li key={item?.menuURL + i} className="relative">
                  <div
                    className={`relative ${item?.menu ? "pb-3" : ""}`}
                    onMouseEnter={() =>
                      item?.menu && setHoveredItem(item.menuURL)
                    }
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      href={getTopLevelNavHref(item)}
                      className="text-sm lg:text-lg hover:opacity-80 transition-opacity font-light block"
                    >
                      {item.menuTitle}
                    </Link>

                    {/* Dropdown Menu */}
                    {item?.menu && (
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 z-50 transition-all duration-200 ${
                          hoveredItem === item?.menuURL
                            ? "opacity-100 visible"
                            : "opacity-0 invisible pointer-events-none"
                        }`}
                        style={{ marginTop: "-0.5rem" }}
                      >
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg min-w-[160px] py-2">
                          <ul className="flex flex-col">
                            {item?.menu.map((childItem, j) => (
                              <li key={childItem?.menuURL + i + j}>
                                <Link
                                  href={childItem?.menuURL || ""}
                                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors hover:font-medium"
                                  onClick={closeMobileMenu}
                                >
                                  {childItem.menuTitle}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white text-black shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            {/* <span className="font-semibold text-lg text-black-chocolate">
              Menu
            </span> */}
            <button
              type="button"
              className="text-black-chocolate text-2xl"
              aria-label="Close menu"
              onClick={closeMobileMenu}
            >
              ×
            </button>
          </div>
          <nav className="p-6">
            <ul className="flex flex-col gap-4 text-black-chocolate">
              {navigationMenu?.map((item, i) => (
                <li key={item?.menuURL + i}>
                  <Link
                    href={getTopLevelNavHref(item)}
                    className="text-lg font-light hover:text-gray-600 transition-colors block"
                    onClick={closeMobileMenu}
                  >
                    {item?.menuTitle}
                  </Link>
                  {item?.menu && (
                    <ul className="mt-2 ml-4 space-y-2 text-sm text-gray-600">
                      {item?.menu.map((childItem, k) => (
                        <li key={childItem?.menuURL + k + i}>
                          <Link
                            href={childItem?.menuURL || ""}
                            className="block hover:text-black transition-colors"
                            onClick={closeMobileMenu}
                          >
                            {childItem?.menuTitle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
