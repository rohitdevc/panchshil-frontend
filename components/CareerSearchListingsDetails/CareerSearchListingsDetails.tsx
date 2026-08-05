"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { CareerSearchJob } from "@/app/careers/vacancies/career-search-page.data";

type CareerSearchListingsDetailsProps = {
  jobs: CareerSearchJob[];
  itemsPerPage: number;
};

export default function CareerSearchListingsDetails({
  jobs,
  itemsPerPage,
}: CareerSearchListingsDetailsProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const asideScrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id ?? "");
  const [activeSectionDomId, setActiveSectionDomId] = useState("");

  const totalPages = Math.max(1, Math.ceil(jobs.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedJobs = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    return jobs.slice(startIndex, startIndex + itemsPerPage);
  }, [safeCurrentPage, itemsPerPage, jobs]);

  const selectedJob =
    paginatedJobs.find((job) => job.id === selectedJobId) ?? paginatedJobs[0];
  const defaultActiveSectionDomId =
    selectedJob && selectedJob.sections[0]
      ? `${selectedJob.id}-${selectedJob.sections[0].id}`
      : "";
  const activeSectionDomIdForSelectedJob =
    selectedJob &&
    selectedJob.sections.some(
      (section) => `${selectedJob.id}-${section.id}` === activeSectionDomId
    )
      ? activeSectionDomId
      : defaultActiveSectionDomId;

  const handleJumpToSection = (sectionId: string) => {
    setActiveSectionDomId(sectionId);
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const gridElement = gridRef.current;
    if (!gridElement) {
      return;
    }

    const handleGridWheel = (event: WheelEvent) => {
      if (window.innerWidth < 1024) {
        return;
      }

      const asideElement = asideScrollRef.current;
      if (!asideElement) {
        return;
      }

      const delta = event.deltaY;
      const atTop = asideElement.scrollTop <= 0;
      const atBottom =
        asideElement.scrollTop + asideElement.clientHeight >=
        asideElement.scrollHeight - 1;

      const canScrollAsideDown = delta > 0 && !atBottom;
      const canScrollAsideUp = delta < 0 && !atTop;

      if (canScrollAsideDown || canScrollAsideUp) {
        event.preventDefault();
        asideElement.scrollTop += delta;
      }
    };

    gridElement.addEventListener("wheel", handleGridWheel, { passive: false });

    return () => {
      gridElement.removeEventListener("wheel", handleGridWheel);
    };
  }, []);

  return (
    <section id="job-listings" className="bg-[#efefef] py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-[34%_66%] border border-[#cfcfcf] bg-white"
        >
          <aside className="border-r border-[#cfcfcf] lg:flex lg:flex-col lg:max-h-[calc(100vh-170px)]">
            <div
              ref={asideScrollRef}
              className="divide-y divide-[#d8d8d8] lg:flex-1 lg:overflow-y-auto"
            >
              {paginatedJobs.map((job) => {
                const isSelected = selectedJob
                  ? selectedJob.id === job.id
                  : false;

                return (
                  <button
                    key={job.id}
                    type="button"
                    onClick={() => setSelectedJobId(job.id)}
                    className={`w-full text-left px-7 py-6 transition-colors ${
                      isSelected
                        ? "bg-[#ad9d7d] text-white"
                        : "bg-white text-[#1f1f1f] hover:bg-[#f7f4ee]"
                    }`}
                  >
                    <h3 className="text-[25px] leading-tight font-display-semi">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-[25px] leading-tight font-display-semi">
                      ({job.employmentType})
                    </p>

                    <div
                      className={`mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] font-semibold tracking-[0.12em] uppercase ${
                        isSelected ? "text-white/95" : "text-[#222222]"
                      }`}
                    >
                      <span>{job.location}</span>
                      <span
                        className={
                          isSelected ? "text-white/70" : "text-[#8f8f8f]"
                        }
                      >
                        |
                      </span>
                      <span>{job.department}</span>
                    </div>

                    <p
                      className={`mt-4 text-[17px] leading-[1.45] ${
                        isSelected ? "text-white/95" : "text-[#3b3b3b]"
                      }`}
                    >
                      {job.summary}
                    </p>

                    <div className="mt-5">
                      <span
                        className={`inline-flex items-center justify-center px-7 py-2.5 text-[14px] font-medium transition-colors ${
                          isSelected
                            ? "bg-white text-[#ad9d7d]"
                            : "bg-[#ad9d7d] text-white"
                        }`}
                      >
                        Learn More
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-3 px-6 py-8 border-t border-[#d8d8d8] bg-white">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={safeCurrentPage === 1}
                className="h-10 w-10 border border-[#c8c8c8] text-[#7d7d7d] disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                ←
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 min-w-10 border px-3 text-[14px] transition-colors ${
                      page === safeCurrentPage
                        ? "bg-[#ad9d7d] border-[#ad9d7d] text-white"
                        : "bg-white border-[#c8c8c8] text-[#4f4f4f] hover:bg-[#f7f4ee]"
                    }`}
                    aria-current={page === safeCurrentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                disabled={safeCurrentPage === totalPages}
                className="h-10 w-10 border border-[#c8c8c8] text-[#7d7d7d] disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                →
              </button>
            </div>
          </aside>

          <article className="px-6 py-7 md:px-10 md:py-9 bg-[#fbfbfb]">
            {selectedJob ? (
              <>
                <div className="flex flex-col items-start justify-between gap-4 border-b border-[#d7d7d7] pb-5">
                  <div>
                    <h2 className="text-[30px] leading-tight text-[#1b1b1b] font-display-semi">
                      {selectedJob.title}
                    </h2>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] font-semibold tracking-[0.12em] uppercase text-[#222222]">
                      <span>{selectedJob.location}</span>
                      <span className="text-[#8f8f8f]">|</span>
                      <span>{selectedJob.department}</span>
                      <span className="text-[#8f8f8f]">|</span>
                      <span>{selectedJob.employmentType}</span>
                    </div>
                  </div>

                  <Link
                    href={selectedJob.applyHref}
                    className="inline-flex items-center justify-center px-8 py-3 text-[14px] font-medium bg-[#ad9d7d] text-white hover:opacity-95 transition-opacity"
                  >
                    Apply Now
                  </Link>
                </div>

                <nav className="flex flex-wrap gap-x-6 gap-y-2 border-b border-[#d7d7d7] py-5">
                  {selectedJob.sections.map((section) => {
                    const domId = `${selectedJob.id}-${section.id}`;
                    const isActive = activeSectionDomIdForSelectedJob === domId;

                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => handleJumpToSection(domId)}
                        className={`text-[12px] font-semibold tracking-[0.12em] uppercase transition-colors border-b ${
                          isActive
                            ? "text-[#ad9d7d] border-[#ad9d7d] font-semibold"
                            : "text-[#ad9d7d] border-transparent hover:border-[#ad9d7d] opacity-65 hover:opacity-100 hover:font-semibold"
                        }`}
                      >
                        {section.label}
                      </button>
                    );
                  })}
                </nav>

                <div className="pt-6">
                  {selectedJob.sections.map((section) => {
                    const domId = `${selectedJob.id}-${section.id}`;

                    return (
                      <section
                        id={domId}
                        key={section.id}
                        className="scroll-mt-28 border-b border-[#d7d7d7] py-7 last:border-b-0"
                      >
                        <h3 className="text-[25px] md:text-[30px] leading-tight text-[#1f1f1f] font-display-semi">
                          {section.title}
                        </h3>

                        {section.paragraphs?.length ? (
                          <div className="mt-5 space-y-4">
                            {section.paragraphs.map((paragraph) => (
                              <p
                                key={paragraph}
                                className="text-[17px] leading-normal text-[#363636]"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        ) : null}

                        {section.points?.length ? (
                          <ul className="mt-5 space-y-4">
                            {section.points.map((point) => (
                              <li
                                key={point}
                                className="text-[17px] leading-normal text-[#363636]"
                              >
                                {point}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </section>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="min-h-[500px] flex items-center justify-center text-center px-6">
                <div>
                  <h3 className="text-[34px] leading-tight text-[#1f1f1f] font-display-semi">
                    No Jobs Found
                  </h3>
                  <p className="mt-3 text-[16px] text-[#4a4a4a]">
                    Try updating the search or filter criteria to see matching
                    openings.
                  </p>
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
