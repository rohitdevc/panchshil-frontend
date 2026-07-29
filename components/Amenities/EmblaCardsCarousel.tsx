"use client";

import {
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";

type Props = {
  slides: React.ReactNode[];
  slideClassName: string;
  isInView?: boolean;
  navMinSlides?: number;
  slidesToScroll?: number;
  viewportClassName?: string;
  containerClassName?: string;
};

export function EmblaCardsCarousel({
  slides,
  slideClassName,
  isInView = true,
  navMinSlides = 2,
  slidesToScroll = 1,
  viewportClassName = "embla-projects mx-2 md:mx-0",
  containerClassName = "embla-projects__container gap-6",
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: false,
    slidesToScroll,
    loop: false,
    containScroll: "trimSnaps",
  });

  const showNav = useMemo(
    () => slides.length > navMinSlides,
    [slides.length, navMinSlides]
  );

  const [scrollProgress, setScrollProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Reset carousel when slides change
  useEffect(() => {
    if (emblaApi && slides.length > 0) {
      emblaApi.reInit();
      emblaApi.scrollTo(0);
    }
  }, [emblaApi, slides]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    // Programmatic scroll (next/prev) may not emit frequent "scroll" events,
    // so keep progress in sync when snap selection changes.
    setScrollProgress(emblaApi.scrollProgress());
  }, [emblaApi]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    setScrollProgress(emblaApi.scrollProgress());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", onScroll);
    emblaApi.on("settle", onScroll);
    emblaApi.on("reInit", onSelect);
    const raf = requestAnimationFrame(() => {
      onSelect();
      onScroll();
    });
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", onScroll);
      emblaApi.off("settle", onScroll);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect, onScroll]);

  if (slides.length === 0) return null;

  return (
    <div
      className={`relative w-full ${
        isInView ? "animate-fade-in-up-delay-2" : "opacity-0"
      }`}
    >
      {/* Navigation arrows at top right (same as Amenities carousel) */}
      {showNav && (
        <div className="flex items-center justify-end gap-3 mb-4 mr-8">
          <button
            aria-label="Previous"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            className={`grid place-items-center text-gold-beige transition-opacity ${
              canPrev
                ? "opacity-100 cursor-pointer"
                : "opacity-40 cursor-not-allowed"
            }`}
          >
            <ArrowLeftIcon />
          </button>
          <button
            aria-label="Next"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            className={`grid place-items-center text-gold-beige transition-opacity ${
              canNext
                ? "opacity-100 cursor-pointer"
                : "opacity-40 cursor-not-allowed"
            }`}
          >
            <ArrowRightIcon />
          </button>
        </div>
      )}

      {/* Carousel container (same spacing as Amenities carousel) */}
      <div className="relative mb-4 overflow-hidden">
        <div className={viewportClassName} ref={emblaRef}>
          <div className={containerClassName}>
            {slides.map((slide, index) => (
              <div
                key={
                  isValidElement(slide) && slide.key != null
                    ? String(slide.key)
                    : String(index)
                }
                className={`embla-projects__slide ${slideClassName}`}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar (same as Amenities carousel) */}
      {showNav && (
        <div className="w-1/2 mx-auto">
          <div className="h-0.5 bg-gold-beige/20">
            <div
              className="h-full bg-gold-beige transition-[width] duration-200 ease-out"
              style={{ width: `${Math.max(2, scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
