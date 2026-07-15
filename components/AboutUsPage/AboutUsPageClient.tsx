"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AboutUsHero } from "@/components/AboutUsHero";
import { AboutUsStatsBar } from "@/components/AboutUsStatsBar";
import { AboutUsVisibleImpact } from "@/components/AboutUsVisibleImpact";
import { AboutUsSustainability } from "@/components/AboutUsSustainability";
import { AboutUsAlliances } from "@/components/AboutUsAlliances";
import { AboutUsPageDummyData } from "@/app/about/about.data";
import DevelopmentForYou from "@/components/DevelopmentForYou";
import { AboutUsClients } from "../AboutUsClients";
import AboutUsMilestones from "@/components/AboutUsMilestones/AboutUsMilestones";
import AboutUsVideoBanner from "@/components/AboutUsVideoBanner/AboutUsVideoBanner";

type AboutUsPageClientProps = {
  data: AboutUsPageDummyData;
};

export default function AboutUsPageClient({ data }: AboutUsPageClientProps) {
  return (
    <main className="min-h-screen bg-[#FFFAF7]">
      <Header />
      <section className="min-h-screen flex flex-col bg-white">
        <AboutUsHero hero={data.hero} />
        <AboutUsStatsBar stats={data.stats} />
      </section>
      <AboutUsVisibleImpact content={data.visibleImpact} />
      <AboutUsMilestones content={data.milestones} />
      <AboutUsVideoBanner content={data.videoBanner} />
      <div className="bg-white">
        <DevelopmentForYou
          title={data.globalIntroduction?.global_heading || "WE ARE NOW"}
          subtitle={
            data.globalIntroduction?.global_caption || "FROM PUNE TO THE WORLD"
          }
          description={
            data.globalIntroduction?.global_description ||
            "With developments in Dubai, the Maldives, Sri Lanka and across Indian cities, panchshil brings global design sensibilities and international standards to every address-while staying deeply rooted in local context and community needs."
          }
        />
      </div>
      <AboutUsSustainability
        content={{
          slides: [
            {
              imageSrc:
                data.esg?.about_esg_image ||
                data.sustainability.slides[0]?.imageSrc,
              title: data.esg?.about_esg_description
                ? `CARING FOR PEOPLE, PLANET & LEGACY\n${data.esg.about_esg_caption || "OUR SUSTAINABILITY PROMISE"}`
                : data.sustainability.slides[0]?.title,
              description:
                data.esg?.about_esg_description ||
                data.sustainability.slides[0]?.description,
              ctaLabel: "Visit ESG Page",
              ctaHref: "/esg",
            },
          ],
        }}
      />
      <div>
        <AboutUsClients
          isAboutPage
          property_key_tenants={data.ourValuedClients}
          title={""}
          subtitle="OUR VALUED CLIENTS"
        />
      </div>
      <AboutUsAlliances content={data.alliances} />
      <Footer />
    </main>
  );
}
