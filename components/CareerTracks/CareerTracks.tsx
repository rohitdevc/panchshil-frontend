"use client";

import { CareerTracksContent } from "@/app/careers/career-page.data";
import { useEffect, useRef, useState } from "react";
import { CareerTrackPostCard } from "@/components/CareerTracks/CareerTrackPostCard";

type CareerTracksProps = {
  content: CareerTracksContent;
};

export default function CareerTracks({ content }: CareerTracksProps) {
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
      {
        threshold: 0.1,
        rootMargin: "0px 0px -120px 0px",
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F2EEEA] py-14 md:py-20">
      <div className="max-w-[1540px] mx-auto px-6 md:px-10">
        <div
          className={`text-center mb-20 ${isInView ? "animate-fade-in-up" : "opacity-0"} px-4 md:px-0`}
        >
          <div className="text-lg tracking-[0.2em] font-medium text-gold-beige mb-2 d-none"></div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
            {content.subHeading}
          </h2>
          <p className="mt-2 text-sm md:text-base text-black/70">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
          {content.posts.map((post, index) => (
            <CareerTrackPostCard
              key={`${post.title}-${index}`}
              imageSrc={post.imageSrc}
              title={post.title}
              description={post.description}
              ctaHref={post.ctaHref}
              ctaLabel={post.ctaLabel}
              className={isInView ? "animate-fade-in-up-delay-2" : "opacity-0"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
