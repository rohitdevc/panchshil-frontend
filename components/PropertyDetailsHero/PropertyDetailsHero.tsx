"use client";

import { MasterSliderData } from "@/interfaces";
import { CommonHeroMedia } from "@/components/CommonHeroMedia";
import { getDeviceType } from "@/utils/utils";
import { useLayoutEffect, useState } from "react";

const PropertyDetailsHero = ({
  shouldShowVideo,
  slide,
}: {
  shouldShowVideo: boolean;
  slide: MasterSliderData;
  setVideoErrors: (errors: Set<number>) => void;
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Hero URL needs a real viewport; first render stays `null` so SSR + hydration match
  // (placeholder in CommonHeroMedia). useLayoutEffect runs before paint.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const pickImageSrc = () => {
      const deviceType = getDeviceType();
      const mobile =
        slide?.master_slider_image_mobile ?? slide?.banner_image_mobile ?? null;
      const desktop = slide?.master_slider_image ?? slide?.banner_image ?? null;

      return deviceType === "mobile"
        ? (mobile ?? desktop ?? null)
        : (desktop ?? mobile ?? null);
    };

    const apply = () => setImageSrc(pickImageSrc());

    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [
    slide?.master_slider_image,
    slide?.master_slider_image_mobile,
    slide?.banner_image,
    slide?.banner_image_mobile,
  ]);

  return (
    <CommonHeroMedia
      shouldShowVideo={shouldShowVideo}
      videoSrc={slide.master_slider_video}
      imageSrc={imageSrc}
      imageAlt={slide.master_slider_title}
    />
  );
};

export default PropertyDetailsHero;
