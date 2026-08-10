"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { EsgHero } from "@/components/EsgHero";
import { EsgTabBar } from "@/components/EsgTabBar";
import { EsgOverviewSection } from "@/components/EsgOverviewSection";
import { EsgEnergySection } from "@/components/EsgEnergySection";
import { EsgWaterSection } from "@/components/EsgWaterSection";
import { EsgWasteSection } from "@/components/EsgWasteSection";
import { EsgMobilitySection } from "@/components/EsgMobilitySection";
import { EsgIndoorAirSection } from "@/components/EsgIndoorAirSection";
import { EsgCertificationsSection } from "@/components/EsgCertificationsSection";
import { EsgSafetyGovernance } from "@/components/EsgSafetyGovernance";
import { EsgReportsSection } from "@/components/EsgReportsSection";
import { CareerHeroContent } from "@/app/careers/career-page.data";
import { EsgCHARMSection } from "@/components/EsgCHARMSection";
import { EsgPanchshilPulseSection } from "@/components/EsgPanchshilPulseSection";
import { EsgOccupierSection } from "@/components/EsgOccupierSection";
import { EsgFoundationSection } from "@/components/EsgFoundationSection";
import { EsgPoliciesSection } from "@/components/EsgPoliciesSection";

import {
  EsgIntroductionApiResponse,
  EsgMilestoneApiItem,
  EsgPerformanceApiItem,
  EsgReportApiItem,
  EsgReportsIntroApiResponse,
  EsgSafetyGovernanceCategoryApiItem,
  EsgTickerApiItem,
  EsgPerformanceCategory,
} from "@/interfaces";

type EsgPageClientProps = {
  data: {
    hero: CareerHeroContent;
    milestones: EsgMilestoneApiItem[] | [];
    ticker: EsgTickerApiItem[] | [];
    introduction: EsgIntroductionApiResponse | null;
    performance_categories: EsgPerformanceCategory[];
    safetyGovernance: EsgSafetyGovernanceCategoryApiItem[];
    reportsIntro: EsgReportsIntroApiResponse | object | null;
    reportsList: EsgReportApiItem[] | [];
  };
};

export default function EsgPageClient({ data }: EsgPageClientProps) {
  return (
    <main className="min-h-screen bg-[#0F140D]">
      <Header />
      <EsgHero
        hero={data.hero}
        milestones={data.milestones}
        ticker={data.ticker}
      />
      <EsgTabBar performance_categories={data.performance_categories} />
      <div id="environmental">
        <EsgOverviewSection
          introduction={data.introduction}
          performance={data.performance_categories[0].performances}
        />
        <EsgEnergySection
          performance={data.performance_categories[0].performances}
        />
        <EsgWaterSection
          performance={data.performance_categories[0].performances}
        />
        <EsgWasteSection
          performance={data.performance_categories[0].performances}
        />
        <EsgIndoorAirSection
          performance={data.performance_categories[0].performances}
        />
        <EsgMobilitySection
          performance={data.performance_categories[0].performances}
        />
        <EsgCertificationsSection
          performance={data.performance_categories[0].performances}
        />
      </div>
      <div id="social">
        <EsgCHARMSection
          performance={data.performance_categories[1].performances}
        />
        <EsgPanchshilPulseSection
          performance={data.performance_categories[1].performances}
        />
        <EsgOccupierSection
          performance={data.performance_categories[1].performances}
        />
        <EsgFoundationSection
          performance={data.performance_categories[1].performances}
        />
      </div>
      <div id="governance">
        <EsgPoliciesSection
          performance={data.performance_categories[2].performances}
        />
      </div>
      <EsgSafetyGovernance safetyGovernance={data.safetyGovernance} />
      <EsgReportsSection
        reportsIntro={data.reportsIntro}
        reportsList={data.reportsList}
      />
      <Footer />
    </main>
  );
}
