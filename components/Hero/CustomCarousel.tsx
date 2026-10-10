"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "../Button/Button";
import Link from "next/link";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { MasterSliderData } from "@/interfaces";

export function CustomCarousel({ slides }: { slides: MasterSliderData[] }) {
  const autoplay = useRef(
    Autoplay({ delay: 15000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
      watchDrag: true,
    },
    [autoplay.current]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [videoErrors, setVideoErrors] = useState<Set<number>>(new Set());

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      autoplay.current?.reset();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      autoplay.current?.reset();
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect(); // Call once to set initial state

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const currentSlide = slides?.[selectedIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Carousel */}
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides?.map((slide, index) => {
            const hasVideoError = videoErrors.has(index);
            const shouldShowVideo =
              slide?.master_slider_video && !hasVideoError;

            return (
              <div
                key={index}
                className="embla__slide flex-[0_0_100%] relative"
              >
                {shouldShowVideo ? (
                  <video
                    key={slide.master_slider_video}
                    src={slide.master_slider_video}
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      console.error(
                        "Video failed to load:",
                        slide.master_slider_video,
                        e
                      );
                      setVideoErrors((prev) => new Set(prev).add(index));
                    }}
                    onLoadedData={() => {
                      
                    }}
                    onCanPlay={() => {
                      
                    }}
                  />
                ) : (
                  <Image
                    src={slide?.master_slider_image ?? ""}
                    alt={slide?.master_slider_title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                )}
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between z-30 px-4 md:px-8 pointer-events-none">
        <button
          aria-label="Previous slide"
          onClick={scrollPrev}
          className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 border border-[#9E8C70] rounded-full   flex items-center justify-center transition-all hover:bg-white/30 active:scale-95"
        >
          <ArrowLeftIcon fill="#9E8C70" width={24} height={24} />
        </button>
        <button
          aria-label="Next slide"
          onClick={scrollNext}
          className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full  border border-[#9E8C70] flex items-center justify-center transition-all hover:bg-white/30 active:scale-95"
        >
          <ArrowRightIcon fill="#9E8C70" width={24} height={24} />
        </button>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-end justify-center z-40 pb-16 pointer-events-none">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          {/* Main Title */}
          <h1 className="text-2xl md:text-[28px] font-display-semi text-white mb-6 tracking-tight">
            {currentSlide?.master_slider_title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-lg lg:text-lg text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
            {currentSlide?.master_slider_description}
          </p>

          {/* CTA Button */}
          <Link
            href={currentSlide?.master_slider_link || "#"}
            className="pointer-events-auto z-50 relative"
          >
            <Button variant="hero-outline" size="lg">
              {currentSlide?.master_slider_button_caption}
            </Button>
          </Link>
          {/* <button className="relative w-36 h-12 pointer-events-auto">
              <span className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-40 hover:opacity-50 cursor-pointer text-white transition-opacity font-medium text-lg"></span>
              <div className=" w-full absolute z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                {currentSlide.ctaText}
              </div>
            </button> */}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-full max-w-[1200px] px-6 pointer-events-none">
        <div className="h-0.5 bg-white/30 overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-500 ease-out"
            style={{
              width: `${((selectedIndex + 1) / slides?.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
