"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import ListHeroBanner from "@/components/ListHeroBanner/ListHeroBanner";
import { PropertyList } from "@/components/PropertyList";
import { useRef } from "react";
import DevelopmentForYou from "@/components/DevelopmentForYou";
import ListContactBanner from "@/components/ListContactBanner";
import { useThemeStore } from "@/store/themeStore";
import { isAllowedPageForTheme } from "@/utils/utils";
import { useParams } from "next/navigation";
import OurOtherProjects from "@/components/OurOtherProjects";
import {
  CategoryFooterBlocksProps,
  PropertyCategories,
  PropertyCategoryProps,
  PropertyProps,
} from "@/interfaces";

interface ListClientProps {
  propertyCategory?: PropertyCategoryProps;
  propertyCities?:
    | string[]
    | Array<Record<string, string[]>>
    | Record<string, string[]>;
  propertyStatuses?: string[];
  otherPropertyCategories?: PropertyCategories[];
  propertyFooterBlocks?: CategoryFooterBlocksProps;
  properties?: PropertyProps[];
  allProperties?: PropertyProps[];
  currentPage?: number;
  propertyCountryKeysFromUrl?: string[];
}

export default function ListClient({
  propertyCategory,
  propertyCities,
  propertyStatuses,
  properties,
  allProperties,
  otherPropertyCategories,
  propertyFooterBlocks,
  currentPage = 1,
  propertyCountryKeysFromUrl,
}: ListClientProps) {
  const { theme } = useThemeStore();
  const params = useParams();
  const isAllowedPage = isAllowedPageForTheme(
    params as { [key: string]: string }
  );
  const isDarkMode = isAllowedPage ? theme === "night" : false;
  const footerRef = useRef<HTMLElement>(null);

  // Get category slug from params
  const categorySlug = params?.["category-slug"] as string | undefined;

  return (
    <>
      <main
        className={`min-h-screen ${isDarkMode ? "bg-[#232323]" : "bg-[#FFFAF7]"}`}
      >
        <Header isDarkMode={isDarkMode} />
        <ListHeroBanner
          propertyCategory={propertyCategory as PropertyCategoryProps}
        />
        {/* Properties List */}
        <PropertyList
          properties={properties || []}
          allProperties={allProperties || []}
          propertyCategoryUrlSlug={categorySlug}
          totalPropertyCount={propertyCategory?.property_count}
          propertyCities={propertyCities}
          propertyCountryKeysFromUrl={propertyCountryKeysFromUrl}
          propertyStatuses={propertyStatuses}
          footerRef={footerRef}
          currentPage={currentPage}
          categorySlug={categorySlug}
        />
        <DevelopmentForYou />
        <OurOtherProjects
          otherPropertyCategories={
            otherPropertyCategories as PropertyCategories[]
          }
        />
        <ListContactBanner
          propertyFooterBlocks={
            propertyFooterBlocks as CategoryFooterBlocksProps
          }
        />
        <Footer ref={footerRef} />
      </main>
    </>
  );
}
