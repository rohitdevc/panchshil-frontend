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

import { EsgReportsSection } from "@/components/EsgReportsSection";
import { CareerHeroContent } from "@/app/careers/career-page.data";
import { EsgCHARMSection } from "@/components/EsgCHARMSection";
import { EsgPanchshilPulseSection } from "@/components/EsgPanchshilPulseSection";
import { EsgOccupierSection } from "@/components/EsgOccupierSection";
import { EsgFoundationSection } from "@/components/EsgFoundationSection";
import { EsgPoliciesSection } from "@/components/EsgPoliciesSection";
import { EsgTrainingSection } from "@/components/EsgTrainingSection";

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
import EsgStatisticsYear from "./EsgStatisticsYear";

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
          sequence={5}
        />
        <EsgStatisticsYear caption={data.performance_categories[0].performance_category_caption} />
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
        <EsgTrainingSection
          performance={data.performance_categories[2].performances}
        />
      </div>
      <EsgReportsSection
        reportsIntro={data.reportsIntro}
        reportsList={data.reportsList}
      />
      <div id="entity-level-sustainability">
        {
          data.performance_categories[4].performances && data.performance_categories[4].performances.map((performance, key) => (
            <EsgCertificationsSection key={key} performance={data.performance_categories[4].performances} sequence={key} />
          ))
        }
        <EsgStatisticsYear caption={data.performance_categories[4].performance_category_caption} />
      </div>
      <Footer />
    </main>
  );
}
