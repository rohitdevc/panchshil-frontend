"use client";

import Link from "next/link";
import { useState } from "react";
import { PropertyDetailResponse } from "@/interfaces";
import { EnquiryForm } from "./EnquiryForm";

export function PropertyInfo({
  propertyInfo,
}: {
  propertyInfo: PropertyDetailResponse | undefined;
}) {
  const info = propertyInfo;
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <section className="fixed bottom-0 left-0 right-0 z-50 w-full bg-[#FFFAF7] py-2 md:py-3 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 lg:gap-4">
          {/* Left side - Property Information */}
          <div className="flex flex-wrap items-center gap-x-3 md:gap-x-5 gap-y-1.5 flex-1">
            {/* Location */}
            <span className="text-black-chocolate text-xs md:text-sm font-normal">
              {info?.property_band?.property_location}
            </span>

            {/* Separator */}
            <span className="hidden sm:inline-block w-px h-4 bg-gray-300"></span>

            {/* Configuration */}
            <span className="text-black-chocolate text-xs md:text-sm font-normal">
              {info?.property_band?.property_configuration}
            </span>

            {/* Separator */}
            <span className="hidden sm:inline-block w-px h-4 bg-gray-300"></span>

            {/* Status */}
            <span className="text-black-chocolate text-xs md:text-sm font-normal">
              {info?.property_band?.property_status}
            </span>

            {/* Separator */}
            <span className="hidden sm:inline-block w-px h-4 bg-gray-300"></span>

            {/* Price */}
            <span className="text-black-chocolate text-xs md:text-sm font-normal">
              {info?.property_band?.property_pricing}
            </span>
          </div>

          {/* Right side - Action Buttons */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            {
              info?.property_brochure && (
              <Link
                href={info?.property_brochure || "#"}
                className="flex-1 lg:flex-none bg-[#35393B] hover:bg-black text-white px-3 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium transition-colors duration-200 whitespace-nowrap text-center"
                target="_blank"
              >
                Download Brochure
              </Link>
            )
            }
            <Link
              href={info?.property_brochure || "#"}
              className="flex-1 lg:flex-none bg-[#35393B] hover:bg-black text-white px-3 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium transition-colors duration-200 whitespace-nowrap text-center cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setIsEnquiryOpen(true);
              }}
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      <EnquiryForm
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        propertyName={info?.property_name}
        propertyBrochure={info?.property_brochure}
      />
    </section>
  );
}
