"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PlayButton from "@/assets/images/play-button.png";
import { TestimonialData } from "@/interfaces";
import TestimonialBg from "@/assets/images/testimonial-bg.png";
import TestimonialVideoPoster from "@/assets/images/testimonial-video-poster.png";
// Type definitions for fullscreen API
interface VideoElementWithFullscreen extends HTMLVideoElement {
  webkitRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  msRequestFullscreen?: () => void;
}

interface DocumentWithFullscreen extends Document {
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
}

interface TestimonialsProps {
  testimonial?: TestimonialData;
}

export function Testimonials({ testimonial }: TestimonialsProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sample data - can be replaced with props from CMS
  const defaultTestimonial: TestimonialData = {
    name: "DONALD TRUMP JR.",
    title: "EXECUTIVE VICE PRESIDENT, TRUMP ORGANISATION",
    videoUrl:
      "https://www.panchshil.com/omnia/assets/videos/master-banner-530520572.mp4",
    posterImage:
      "https://www.panchshil.com/omnia/assets/images/video/video-267370287.webp",
  };

  const testimonialData = testimonial || defaultTestimonial;

  // Handle fullscreen video
  useEffect(() => {
    if (isVideoModalOpen && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });

      // Request fullscreen
      const videoElement = videoRef.current as VideoElementWithFullscreen;
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen().catch((error) => {
          console.error("Error entering fullscreen:", error);
        });
      } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen();
      } else if (videoElement.mozRequestFullScreen) {
        videoElement.mozRequestFullScreen();
      } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen();
      }
    }
  }, [isVideoModalOpen]);

  // Handle fullscreen exit
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as DocumentWithFullscreen;
      if (
        !doc.fullscreenElement &&
        !doc.webkitFullscreenElement &&
        !doc.mozFullScreenElement &&
        !doc.msFullscreenElement
      ) {
        setIsVideoModalOpen(false);
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <>
      {/* Testimonials Section */}
      <section className="relative w-full min-h-[600px] md:min-h-[800px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={TestimonialBg}
            alt="Testimonial Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Overlay - Right Side */}
        <div className="relative z-10 h-full flex items-center justify-end px-6 md:px-12 py-12 md:py-20">
          <div className="w-full max-w-[500px] md:max-w-[600px]  backdrop-blur-sm shadow-lg bg-[#FFFAF7] px-6 pb-10">
            {/* Testimonials Tab */}
            <div className="bg-white py-2 px-2">
              <button className="text-black text-sm md:text-base font-medium tracking-widest uppercase bg-[#F9F0E9] px-3 py-3 shadow">
                TESTIMONIALS
              </button>
            </div>

            {/* Video Thumbnail Container */}
            <div
              className="relative w-full aspect-video cursor-pointer group overflow-hidden"
              onClick={() => setIsVideoModalOpen(true)}
            >
              <Image
                src={TestimonialVideoPoster}
                alt={`${testimonialData.name} testimonial video`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <Image
                    src={PlayButton}
                    alt="Play Button"
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20"
                  />
                </div>
              </div>
            </div>
            <div className="my-3 bg-[#AB9B81] w-full h-px" />
            {/* Testimonial Info */}
            <div className=" py-4 md:py-3 ">
              <h4 className="text-black text-base md:text-lg font-normal uppercase tracking-wide mb-2">
                {testimonialData.name}
              </h4>
              <p className="text-black text-sm md:text-base font-normal uppercase tracking-wide">
                {testimonialData.title}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Video Modal */}
      {isVideoModalOpen && (
        <>
          <div className="fixed inset-0 z-[9999] bg-black">
            <button
              onClick={() => {
                setIsVideoModalOpen(false);
                if (videoRef.current) {
                  videoRef.current.pause();
                }
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                }
              }}
              className="absolute top-4 right-4 z-[99999] w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              aria-label="Close video"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <video
              ref={videoRef}
              src={testimonialData.videoUrl}
              className="w-full h-full object-contain"
              controls
              autoPlay
              playsInline
              onEnded={() => {
                setIsVideoModalOpen(false);
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                }
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
