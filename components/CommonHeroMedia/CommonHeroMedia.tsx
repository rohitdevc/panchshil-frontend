import Image from "next/image";
import { StaticImageData } from "next/image";

type CommonHeroMediaProps = {
  imageSrc?: string | StaticImageData | null;
  imageAlt: string;
  videoSrc?: string;
  shouldShowVideo?: boolean;
  overlayClassName?: string;
};

export default function CommonHeroMedia({
  imageSrc,
  imageAlt,
  videoSrc,
  shouldShowVideo = false,
  overlayClassName = "bg-black/20",
}: CommonHeroMediaProps) {
  return (
    <>
      {shouldShowVideo && videoSrc ? (
        <video
          key={videoSrc}
          src={videoSrc}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          crossOrigin="anonymous"
          onError={(e) => {
            console.error("Video failed to load:", videoSrc, e);
          }}
        />
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-900" aria-hidden />
      )}

      <div
        className={`absolute inset-0 pointer-events-none ${overlayClassName}`}
      ></div>
    </>
  );
}
