import {
  getPropertyCategory,
  getPropertyCities,
  getPropertyStatuses,
  getOtherPropertyCategories,
  getPropertyFooterBlocks,
  getPropertiesByCategory,
} from "@/api/property";
import {
  CategoryFooterBlocksProps,
  PropertyCategories,
  PropertyCategoryProps,
  PropertyListProps,
  PropertyProps,
} from "@/interfaces";
import { PER_PAGE_LIMIT } from "@/api/constants";
import {
  normalizePropertyCitiesRaw,
  parsePropertyCountryKeysFromPageSearchParams,
} from "@/utils/propertyCities";
import ListClient from "../../../ListClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 600; // 10 minutes

interface PaginatedListPageProps {
  params: Promise<{
    "category-slug": string;
    page: string;
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  params,
}: PaginatedListPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const propertyCategoryUrlSlug = resolvedParams["category-slug"];

  let propertyCategory: PropertyCategoryProps | null = null;

  try {
    if (propertyCategoryUrlSlug) {
      try {
        const categoryResponse = await getPropertyCategory(
          propertyCategoryUrlSlug
        );
        propertyCategory = categoryResponse as PropertyCategoryProps;
      } catch (error) {
        console.error("Error fetching property category for metadata:", error);
      }
    }
  } catch (error) {
    notFound();
  }

  return {
    title:
      propertyCategory?.meta_title ||
      "Panchshil - India's Leading Luxury Developer",
    description:
      propertyCategory?.meta_description ||
      "Since 2002, Panchshil Realty has set benchmarks in design, delivery and urban placemaking.",
    alternates: propertyCategory?.canonical_tag
      ? { canonical: propertyCategory.canonical_tag }
      : undefined,
  };
}

export default async function PaginatedListPage({
  params,
  searchParams,
}: PaginatedListPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const propertyCountryKeysFromUrl =
    parsePropertyCountryKeysFromPageSearchParams(resolvedSearchParams);

  const propertyCategoryUrlSlug = resolvedParams["category-slug"];
  const pageParam = resolvedParams.page;
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  if (isNaN(page) || page < 1) {
    notFound();
  }

  const apiCalls = propertyCategoryUrlSlug
    ? [
        getPropertyCategory(propertyCategoryUrlSlug),
        getPropertyCities(propertyCategoryUrlSlug),
        getPropertyStatuses(propertyCategoryUrlSlug),
        // Paginated properties for default view
        getPropertiesByCategory(
          propertyCategoryUrlSlug,
          PER_PAGE_LIMIT,
          PER_PAGE_LIMIT * (page - 1)
        ),
        // Full list of properties for filtering (no limit/skip)
        getPropertiesByCategory(propertyCategoryUrlSlug),
        getOtherPropertyCategories(propertyCategoryUrlSlug),
        getPropertyFooterBlocks(),
      ]
    : Array.from({ length: 1 }, () => Promise.resolve(null));

  const [
    propertyCategory,
    propertyCities,
    propertyStatuses,
    properties,
    allProperties,
    otherPropertyCategories,
    propertyFooterBlocks,
  ] = await Promise.allSettled(apiCalls);

  const data = {
    propertyCategory:
      propertyCategory?.status === "fulfilled" ? propertyCategory?.value : null,
    propertyCities:
      propertyCities?.status === "fulfilled" ? propertyCities?.value : null,
    propertyStatuses:
      propertyStatuses?.status === "fulfilled" ? propertyStatuses?.value : null,
    properties: properties?.status === "fulfilled" ? properties?.value : null,
    allProperties:
      allProperties?.status === "fulfilled" ? allProperties?.value : null,
    otherPropertyCategories:
      otherPropertyCategories?.status === "fulfilled"
        ? otherPropertyCategories?.value
        : null,
    propertyFooterBlocks:
      propertyFooterBlocks?.status === "fulfilled"
        ? propertyFooterBlocks?.value
        : null,
  };

  const category = data.propertyCategory as PropertyCategoryProps | null;
  if (
    !category ||
    typeof category.property_category_title !== "string" ||
    !category.property_category_title.trim()
  ) {
    notFound();
  }

  const propertyCitiesForClient =
    normalizePropertyCitiesRaw(data.propertyCities) ??
    (data.propertyCities as PropertyListProps["propertyCities"]);

  return (
    <ListClient
      propertyCategory={data.propertyCategory as PropertyCategoryProps}
      propertyCities={
        propertyCitiesForClient as PropertyListProps["propertyCities"]
      }
      propertyStatuses={data.propertyStatuses as string[]}
      properties={data.properties as PropertyProps[]}
      allProperties={data.allProperties as PropertyProps[]}
      otherPropertyCategories={
        data.otherPropertyCategories as PropertyCategories[]
      }
      propertyFooterBlocks={
        data.propertyFooterBlocks as CategoryFooterBlocksProps
      }
      currentPage={page}
      propertyCountryKeysFromUrl={propertyCountryKeysFromUrl}
    />
  );
}
