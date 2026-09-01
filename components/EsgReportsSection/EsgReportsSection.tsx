"use client";

import Image from "next/image";
import { EsgReportApiItem, EsgReportsIntroApiResponse } from "@/interfaces";

function formatFileSize(size?: string): string {
  return size ? `PDF • ${size}` : "PDF";
}

type Props = {
  reportsIntro?: EsgReportsIntroApiResponse | null;
  reportsList?: EsgReportApiItem[];
};

export default function EsgReportsSection({
  reportsIntro,
  reportsList,
}: Props) {
  if (reportsList?.length === 0)
    return null;
  return (
    <section id="esg-reports" className="w-full bg-[#FFFFFF] py-5 border-t border-[#E2DFD7]/30 transition-colors duration-300">
      <div className="max-w-[1540px] mx-auto px-6 md:px-10 lg:px-12">
        {typeof reportsIntro === "object" && (
          <>
            {/* Header split layout */}
            <div className="flex justify-center items-center mb-8 md:mb-4">
              {/* Left Side: Mockup Image */}
              <div className="lg:col-span-5 flex justify-start hidden">
                {reportsIntro?.reports_image && (
                  
                    <div className="w-full relative aspect-[5/3] max-w-full overflow-hidden shadow-sm">
                      <Image
                        src={reportsIntro?.reports_image}
                        alt="ESG Reports Mockup Banner"
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                )}
              </div>

              {/* Right Side: Text */}
              <div className="flex flex-col">
                <span className="text-[#40A937] text-xs md:text-sm font-normal tracking-widest uppercase block mb-3 font-sans">
                  - {reportsIntro?.reports_heading || ""}
                </span>

                <h2 className="text-3xl md:text-5xl lg:text-[56px] font-display text-[#1F180D] leading-[1.1] tracking-tight font-medium">
                  {reportsIntro?.reports_caption || ""}
                </h2>

                <p className="mt-4 text-sm md:text-base text-[#626A70] font-sans font-light max-w-xl">
                  {reportsIntro?.reports_description || ""}
                </p>
              </div>
            </div>
          </>
        )}

        {/* 3-column downloads grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 py-4 items-center">
          {(reportsList && reportsList.length > 0
            ? reportsList.map((r, idx) => ({
                meta: formatFileSize(r.report_pdf_file_size),
                title: r.report_name || "",
                href: r.report_pdf || "#",
                gridClass:
                  idx < (reportsList?.length || 0) - 1
                    ? "border-b md:border-b-0 md:border-r border-[#E2DFD7]/60"
                    : "border-none",
              }))
            : []
          ).map((report, idx) => (
            <a
              key={idx}
              href={report.href}
              target="_blank"
              className={`flex items-end justify-between group transition-all duration-300 px-8 py-8 min-h-[130px] hover:bg-[#f5f9fa]  ${report.gridClass}`}
            >
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs font-normal text-[#7F847E] font-sans tracking-wide uppercase">
                  {report.meta}
                </span>
                <h3 className="font-display text-lg md:text-[22px] font-normal text-[#1F180D] mt-2 group-hover:text-[#40A937] transition-colors leading-tight">
                  {report.title}
                </h3>
              </div>

              {/* Download Icon */}
              <div className="h-full ml-4 w-8  flex items-center justify-center text-black transition-all duration-300 group-hover:text-[#40A937] group-hover:-translate-y-[5px]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 31"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.93031 21.18L12.0003 27.25L18.0703 21.18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 0.75L12 26.75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Disclaimer Footer Text */}
        {typeof reportsIntro === "object" && reportsList && (
          <div className="w-full mt-2">
            <span className="text-[11px] md:text-xs text-gray-500 font-sans font-light tracking-wide block">
              All data is for FY 2025-26 unless stated otherwise.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
