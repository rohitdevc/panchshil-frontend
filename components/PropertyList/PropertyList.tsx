"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { useThemeStore } from "@/store/themeStore";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { Pagination } from "@/components/Pagination";

import Link from "next/link";
import { isAllowedPageForTheme } from "@/utils/utils";
import {
  normalizePropertyCitiesRaw,
  resolveCitiesForPropertyCountries,
  sanitizePropertyCountrySlugs,
} from "@/utils/propertyCities";
import { useParams, useSearchParams } from "next/navigation";
import {
  ActionButtonProps,
  PropertyItemProps,
  PropertyListProps,
} from "@/interfaces";

function ActionButton({
  children,
  href,
  onClick,
  isDarkMode,
  target = "_self",
}: ActionButtonProps & { target?: string }) {
  const baseClasses = `px-4 py-3 text-sm font-medium hover:opacity-90 transition-all shadow-sm w-fit ${
    !isDarkMode ? "bg-gold-beige text-white" : "bg-[#4E4E4E] text-white"
  }`;

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} text-center`}
        target={target}
      >
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} cursor-pointer`}>
      {children}
    </button>
  );
}

function PropertyItem({ property }: PropertyItemProps) {
  const { theme } = useThemeStore();
  const params = useParams();
  const isAllowedPage = isAllowedPageForTheme(
    params as { [key: string]: string }
  );
  const isDarkMode = isAllowedPage ? theme === "night" : false;
  // For now, we'll use the thumbnail as the only image
  // In a real scenario, you'd have multiple images
  const images = [
    !isDarkMode
      ? property?.property_thumbnail
      : property?.property_thumbnail_night_mode,
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: false,
    slidesToScroll: 1,
    loop: false,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const initializedRef = useRef(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // Set initial state only once using a ref to avoid linter warning
    if (!initializedRef.current) {
      initializedRef.current = true;
      // Use setTimeout to defer state update and avoid synchronous setState warning
      setTimeout(() => {
        setCanPrev(emblaApi.canScrollPrev());
        setCanNext(emblaApi.canScrollNext());
      }, 0);
    }

    // Subscribe to events
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // Cleanup event listeners
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[30%_70%] gap-0 mb-8 shadow-sm transition-colors ${
        !isDarkMode ? "bg-white" : "bg-black"
      }`}
    >
      {/* Left Column - Image Slider */}
      <div className="relative w-full h-[500px] md:h-[600px]">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {images?.map((image, index) => (
              <div key={index} className="flex-[0_0_100%] relative">
                <Image
                  src={image}
                  alt={property?.property_name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {images?.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              disabled={!canPrev}
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-opacity ${
                !isDarkMode
                  ? " border border-gray-300 "
                  : " border border-white "
              } ${!canPrev ? "opacity-50 cursor-not-allowed" : ""}`}
              aria-label="Previous image"
            >
              <ArrowLeftIcon fill={"#FFFFFF"} width={20} height={20} />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canNext}
              className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-opacity ${
                !isDarkMode
                  ? " border border-gray-300 "
                  : " border border-white "
              } ${!canNext ? "opacity-50 cursor-not-allowed" : ""}`}
              aria-label="Next image"
            >
              <ArrowRightIcon fill={"#FFFFFF"} width={20} height={20} />
            </button>
          </>
        )}
      </div>

      {/* Right Column - Property Details */}
      <div
        className={`px-6 py-4 md:pl-12 flex flex-col justify-between transition-colors ${
          !isDarkMode ? "bg-[#FFFAF7]" : "bg-black"
        }`}
      >
        <div>
          {/* Property Name */}
          <h2
            className={`text-2xl md:text-[28px] font-display-semi uppercase mb-3 transition-colors ${
              !isDarkMode ? "text-black" : "text-white"
            }`}
          >
            {property?.property_name}
          </h2>

          {/* Brief Description */}
          <p
            className={`text-sm md:text-md font-normal mb-6 transition-colors ${
              !isDarkMode ? "text-[#030303]" : "text-white"
            }`}
          >
            {property?.property_tagline}
          </p>

          {/* Specifications */}
          <div className="space-y-4 mb-8">
            {property?.property_basic_information?.map((spec, index) => (
              <div key={index} className="flex items-start gap-3">
                <div
                  className={`mt-0.5 shrink-0 transition-colors ${
                    !isDarkMode ? "text-[#030303]" : "text-white"
                  }`}
                >
                  <div className={isDarkMode ? "brightness-0 invert" : ""}>
                    <Image
                      src={spec.property_basic_information_icon}
                      alt={spec.property_basic_information_caption}
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                <p
                  className={`text-sm md:text-md transition-colors ${
                    !isDarkMode ? "text-[#030303]" : "text-white"
                  }`}
                >
                  {spec.property_basic_information_caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        {property?.buttons?.length > 0 && (
          <div className="flex flex-wrap gap-5">
            {property?.buttons?.map((button) => (
              <ActionButton
                key={button?.label}
                href={button?.url}
                isDarkMode={isDarkMode}
              >
                {button?.label}
              </ActionButton>
            ))}
            {/* {!property.listing_only && (
              <ActionButton
                href={`/${categorySlug}/${property.property_url_slug}` || "#"}
                isDarkMode={isDarkMode}
              >
                View Project
              </ActionButton>
            )}
            {property.property_brochure && (
              <ActionButton
                href={property.property_brochure || "#"}
                isDarkMode={isDarkMode}
                target="_blank"
              >
                Download Brochure
              </ActionButton>
            )}
            {!property.listing_only && (
              <ActionButton
                href={
                  `/${categorySlug}/${property.property_url_slug}?filter=floor-plan` ||
                  "#"
                }
                isDarkMode={isDarkMode}
              >
                View Floor Plans
              </ActionButton>
            )}
            {!property.listing_only && (
              <ActionButton
                href={
                  `/${categorySlug}/${property.property_url_slug}?filter=amenities` ||
                  "#"
                }
                isDarkMode={isDarkMode}
              >
                View Amenities
              </ActionButton>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
}

type PropertyListInnerProps = PropertyListProps & {
  propertyCountryKeys: string[];
};

function PropertyListInner({
  properties,
  allProperties,
  propertyCategoryUrlSlug,
  totalPropertyCount,
  propertyCities = [],
  propertyStatuses = [],
  footerRef,
  currentPage = 1,
  categorySlug,
  propertyCountryKeys,
}: PropertyListInnerProps) {
  const { theme } = useThemeStore();
  const params = useParams();
  const isAllowedPage = isAllowedPageForTheme(
    params as { [key: string]: string }
  );
  const isDarkMode = isAllowedPage ? theme === "night" : false;

  // Filter state management - initial cities from `?property-country=` when present
  const [selectedLocation, setSelectedLocation] = useState<string[]>(() =>
    propertyCountryKeys.length === 0
      ? []
      : resolveCitiesForPropertyCountries(
          propertyCities,
          propertyCountryKeys,
          allProperties,
          properties
        )
  );
  const [selectedProperty, setSelectedProperty] = useState<string[]>([]);
  const [isStickyBarVisible, setIsStickyBarVisible] = useState(true);

  // Detect when footer enters viewport
  useEffect(() => {
    const footerElement = footerRef?.current;
    if (!footerElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Hide sticky bar when footer is in view
          setIsStickyBarVisible(!entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of footer is visible
        rootMargin: "0px",
      }
    );

    observer.observe(footerElement);

    return () => {
      observer.disconnect();
    };
  }, [footerRef]);

  // URL-driven country keys can resolve after hydration; grouped cities API can normalize late - sync selection once keys + data can produce a list.
  useEffect(() => {
    const cities = resolveCitiesForPropertyCountries(
      propertyCities,
      propertyCountryKeys,
      allProperties,
      properties
    );

    if (propertyCountryKeys.length === 0 || cities.length === 0) return;

    queueMicrotask(() => {
      setSelectedLocation((prev) => (prev.length === 0 ? cities : prev));
    });
  }, [propertyCities, propertyCountryKeys, allProperties, properties]);

  // Handler functions for filter changes
  const handleLocationChange = (value: string[] | null) => {
    setSelectedLocation(value || []);
  };

  const handlePropertyChange = (value: string[] | null) => {
    setSelectedProperty(value || []);
  };

  const hasActiveFilters =
    selectedLocation.length > 0 || selectedProperty.length > 0;

  // Use full dataset when filters are active, otherwise current page only
  const sourceProperties =
    hasActiveFilters && allProperties && allProperties.length > 0
      ? allProperties
      : properties || [];

  // Apply filters to the chosen source properties
  const displayProperties = sourceProperties.filter((property) => {
    // Filter by location - check both property_city_name and property_basic_information
    let matchesLocation = true;
    if (selectedLocation.length > 0) {
      // Check if property_city_name matches
      const cityNameMatch = selectedLocation.includes(
        property.property_city_name
      );

      // Check if any property_basic_information_caption contains the selected location
      const basicInfoMatch =
        property.property_basic_information?.some((info) => {
          const caption = info.property_basic_information_caption || "";
          return selectedLocation.some((location) =>
            caption.toLowerCase().includes(location.toLowerCase())
          );
        }) || false;

      matchesLocation = cityNameMatch || basicInfoMatch;
    }

    // Filter by status (property_status)
    const matchesStatus =
      selectedProperty.length === 0 ||
      selectedProperty.includes(property.property_status);

    return matchesLocation && matchesStatus;
  });

  // Build base URL for pagination
  const baseUrl = propertyCategoryUrlSlug
    ? `${process.env.NEXT_PUBLIC_BASEPATH}${propertyCategoryUrlSlug}/page`
    : "";

  return (
    <>
      <div
        className={`container-standard md:px-16 px-4 pt-12 transition-colors`}
      >
        <div className="space-y-0">
          {displayProperties?.length > 0 ? (
            displayProperties.map((property, index) => (
              <PropertyItem
                key={index}
                property={property}
                categorySlug={categorySlug}
              />
            ))
          ) : (
            <div
              className={`text-center py-8 transition-colors ${
                !isDarkMode ? "text-gray-600" : "text-gray-400"
              }`}
            >
              No properties match the selected filters. Try adjusting your
              filters.
            </div>
          )}

          {/* Pagination */}
          {displayProperties?.length > 0 &&
            propertyCategoryUrlSlug &&
            !hasActiveFilters &&
            totalPropertyCount !== undefined &&
            totalPropertyCount > 0 && (
              <Pagination
                currentPage={currentPage}
                totalItems={totalPropertyCount}
                baseUrl={baseUrl}
              />
            )}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      {propertyCategoryUrlSlug && (
        <StickyBottomBar
          projectCount={
            hasActiveFilters ? displayProperties.length : totalPropertyCount
          }
          selectedLocation={selectedLocation}
          selectedProperty={selectedProperty}
          onLocationChange={handleLocationChange}
          onPropertyChange={handlePropertyChange}
          isVisible={isStickyBarVisible}
          propertyCities={propertyCities}
          propertyStatuses={propertyStatuses}
        />
      )}
    </>
  );
}

export function PropertyList(props: PropertyListProps) {
  const { propertyCountryKeysFromUrl, ...listProps } = props;
  const searchParams = useSearchParams();

  const propertyCitiesNormalized = useMemo(
    () =>
      normalizePropertyCitiesRaw(listProps.propertyCities) ??
      listProps.propertyCities,
    [listProps.propertyCities]
  );

  const clientCountryKeys = useMemo(
    () => searchParams.getAll("property-country").map((k) => k.trim()),
    [searchParams]
  );

  const propertyCountryKeys = useMemo(() => {
    const raw =
      clientCountryKeys.length > 0
        ? clientCountryKeys
        : (propertyCountryKeysFromUrl ?? []);
    return sanitizePropertyCountrySlugs(raw);
  }, [clientCountryKeys, propertyCountryKeysFromUrl]);

  const citiesSyncFingerprint = useMemo(() => {
    const pc = propertyCitiesNormalized;
    if (pc == null) return "";
    if (Array.isArray(pc) && pc.length === 0) return "";
    if (typeof pc === "object" && !Array.isArray(pc)) {
      if (Object.keys(pc as object).length === 0) return "";
    }
    return JSON.stringify(pc);
  }, [propertyCitiesNormalized]);

  const filterStateKey = `${propertyCountryKeys.slice().sort().join(",")}__${citiesSyncFingerprint}`;

  return (
    <PropertyListInner
      key={filterStateKey}
      {...listProps}
      propertyCities={propertyCitiesNormalized}
      propertyCountryKeys={propertyCountryKeys}
    />
  );
}
