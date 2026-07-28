import Link from "next/link";
import { CareerInsideLifeContent } from "@/app/careers/career-page.data";
import { Button } from "@/components/Button";
import CareerInsideLifeCarousel from "./CareerInsideLifeCarousel";

type CareerInsideLifeProps = {
  content: CareerInsideLifeContent;
};

export default function CareerInsideLife({ content }: CareerInsideLifeProps) {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-[1680px] mx-auto px-6 md:px-10">
        <div className="max-w-[980px] mx-auto text-center mb-10 md:mb-14">
          <div className="text-lg tracking-[0.2em] font-medium text-gold-beige mb-2 d-none"></div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black mb-3">
            {content.subHeading}
          </h2>
          <p className="text-sm md:text-base text-black/75 leading-relaxed">
            {content.description}
          </p>
          <div className="mt-5">
            <Link href={content.ctaHref}>
              <Button variant="signature-outline" size="lg">
                {content.ctaLabel}
              </Button>
            </Link>
          </div>
        </div>

        <CareerInsideLifeCarousel slides={content.slides} />
      </div>
    </section>
  );
}
