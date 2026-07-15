import Image from "next/image";
import { AboutUsVisibleImpactContent } from "@/app/about/about.data";

type AboutUsVisibleImpactProps = {
  content: AboutUsVisibleImpactContent;
};

export default function AboutUsVisibleImpact({
  content,
}: AboutUsVisibleImpactProps) {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black pb-5">
            {content.title}
          </h2>

          <div className="text-sm md:text-base text-black/80 leading-relaxed max-w-[640px]">
            {content.description}
          </div>

          {/* {content.points && content.points.length > 0 && (
            <div className="mt-5">
              {content.points.map((point) => (
                <p
                  key={point}
                  className="text-black/85 text-sm md:text-base py-2 font-display-semi"
                >
                  {point}
                </p>
              ))}
            </div>
          )} */}
          <div className="mt-5">
            <h3 className="text-black/85 text-lg py-1 font-display-semi">
              {content.about_intro_name}
            </h3>
            <p className="text-black/85 text-sm md:text-base py-1 ">
              {content.about_intro_designation}
            </p>
          </div>
        </div>

        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={content.imageSrc}
            alt={content.imageAlt}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
