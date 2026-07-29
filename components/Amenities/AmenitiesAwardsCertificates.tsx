"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EmblaCardsCarousel } from "./EmblaCardsCarousel";
import type { PropertyAwardCertificate } from "@/interfaces";

type Props = {
  title?: string;
  subTitle?: string;
  description?: string;
  property_award_certificates?: PropertyAwardCertificate[] | null;
};

export function AmenitiesAwardsCertificates({
  title = "AMENITIES",
  subTitle = "AWARDS & CERTIFICATES",
  description,
  property_award_certificates,
}: Props) {
  const items = property_award_certificates ?? [];

  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  const slides = items.map((item, index) => (
    <div
      key={`${item.property_award_certificate_caption}-${index}`}
      className="w-full pb-10"
    >
      <div className="flex flex-col items-center justify-center overflow-hidden px-2 py-5 bg-[#F7F5F4] h-85">
        <div className="relative h-full w-full">
          <Image
            src={item.property_award_certificate_image}
            alt={item.property_award_certificate_caption}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="mt-5 text-center text-sm md:text-base text-black-chocolate px-8 w-[479px] max-w-full mx-auto">
          {item.property_award_certificate_caption}
        </div>
      </div>
    </div>
  ));

  if (items?.length === 0) return null;
  return (
    <section ref={sectionRef} className="w-full py-20 bg-white">
      <div className="mx-auto">
        <div
          className={`text-center mb-12 px-4 md:px-0 ${
            isInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="text-lg font-medium tracking-[0.2em] text-gold-beige mb-2">
            {title}
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
            {subTitle}
          </h2>
          {description ? (
            <p className="mt-3 max-w-[980px] mx-auto text-sm md:text-base text-black/75 leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>

        <EmblaCardsCarousel
          slides={slides}
          isInView={isInView}
          navMinSlides={3}
          slidesToScroll={1}
          containerClassName="embla-projects__container gap-6"
          slideClassName="basis-[88%] sm:basis-[62%] md:basis-[calc((100%-48px)/3)] shrink-0 grow-0 last:mr-4 md:first:ml-8"
        />
      </div>
    </section>
  );
}
