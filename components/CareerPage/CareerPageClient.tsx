"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CareerHero } from "@/components/CareerHero";
import { CareerInsideLife } from "@/components/CareerInsideLife";
import { CareerFitInBanner } from "@/components/CareerFitInBanner";
import { CareerStatsBar } from "@/components/CareerStatsBar";
import { CareerGrowthExposure } from "@/components/CareerGrowthExposure";
import { CareerHowWeWork } from "@/components/CareerHowWeWork";
import { CareerTracks } from "@/components/CareerTracks";
import { CareerVisibleImpact } from "@/components/CareerVisibleImpact";
import { AmenitiesAwardsCertificates } from "@/components/Amenities";
import { CareerPageDataProp } from "@/app/careers/career-page.data";

type CareerPageClientProps = {
  data: CareerPageDataProp;
};

export default function CareerPageClient({ data }: CareerPageClientProps) {
  return (
    <main className="min-h-screen bg-[#FFFAF7]">
      <Header />
      <section className="min-h-screen flex flex-col bg-white">
        <CareerHero hero={data.hero} />
        <CareerStatsBar stats={data.stats} />
      </section>
      <CareerVisibleImpact content={data.visibleImpact} />
      <CareerTracks content={data.careerTracks} />
      <CareerHowWeWork content={data.howWeWork} />
      <CareerGrowthExposure content={data.growthExposure} />
      <AmenitiesAwardsCertificates
        subTitle={data.safetyAwards.subHeading}
        description={data.safetyAwards.description}
      />
      <CareerInsideLife content={data.insideLife} />
      <CareerFitInBanner content={data.fitInBanner} />
      <Footer />
    </main>
  );
}
