"use client";

import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";

type BlogsPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function BlogsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: BlogsPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 pt-12 md:pt-16">
      <button
        type="button"
        aria-label="Previous page"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center justify-center w-10 h-10 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
      >
        <ArrowLeftIcon fill="#000000" width={16} height={16} />
      </button>

      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            aria-label={`Page ${page}`}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onPageChange(page)}
            className={`flex items-center justify-center min-w-10 h-10 px-2 border transition-colors text-sm cursor-pointer ${
              isActive
                ? "bg-gold-beige text-white border-gold-beige"
                : "border-gray-300 text-gray-700 hover:bg-gray-100 bg-white"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        aria-label="Next page"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center justify-center w-10 h-10 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
      >
        <ArrowRightIcon fill="#000000" width={16} height={16} />
      </button>
    </div>
  );
}
