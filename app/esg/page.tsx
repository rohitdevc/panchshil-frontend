import { EsgPageClient } from "@/components/EsgPage";
import { EsgPageData } from "./esg.data";
import {
  getEsgBanner,
  getEsgIntroduction,
  getEsgMilestones,
  getEsgPerformance,
  getEsgReports,
  getEsgReportsIntro,
  getEsgSafetyGovernance,
  getEsgTicker,
  getMetaData,
} from "@/api/CMS.api";
import {
  EsgBannerApiItem,
  EsgIntroductionApiResponse,
  EsgMilestoneApiItem,
  EsgPerformanceApiItem,
  EsgReportApiItem,
  EsgReportsIntroApiResponse,
  EsgSafetyGovernanceApiItem,
  EsgTickerApiItem,
  MetaDataProps,
} from "@/interfaces";
import type { Metadata } from "next";

// Revalidate this route every 30 minutes.
export const revalidate = 1800;
export const dynamic = "force-dynamic";

async function getPageMetaData(): Promise<MetaDataProps | null> {
  try {
    return (await getMetaData("ESG")) as MetaDataProps;
  } catch (error) {
    console.error("Error fetching meta data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metaData = await getPageMetaData();
  return {
    title: metaData?.meta_title || "",
    description: metaData?.meta_description || "",
    keywords: metaData?.meta_keywords || "",
    alternates: {
      canonical: metaData?.canonical_tag || "",
    },
  };
}

const toAbsoluteAssetUrl = (url: string | undefined): string => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT || "";
  if (!baseUrl) {
    return url;
  }

  return `${baseUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
};

export default async function EsgPage() {
  let esgBanner: EsgBannerApiItem | null = null;
  let esgMilestones: EsgMilestoneApiItem[] = [];
  let esgTicker: EsgTickerApiItem[] = [];
  let esgIntroduction: EsgIntroductionApiResponse | null = null;
  let esgPerformance: EsgPerformanceApiItem[] = [];
  let esgSafetyGovernance: EsgSafetyGovernanceApiItem[] = [];
  let esgReportsIntro: EsgReportsIntroApiResponse | null = null;
  let esgReportsList: EsgReportApiItem[] = [];

  try {
    esgBanner = (await getEsgBanner()) as EsgBannerApiItem;
  } catch (error) {
    console.error("Error fetching ESG banner:", error);
  }

  try {
    const response = (await getEsgMilestones()) as EsgMilestoneApiItem[];
    esgMilestones = Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Error fetching ESG milestones:", error);
  }

  try {
    const response = (await getEsgTicker()) as EsgTickerApiItem[];
    esgTicker = Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Error fetching ESG ticker:", error);
  }

  try {
    esgIntroduction =
      (await getEsgIntroduction()) as EsgIntroductionApiResponse;
  } catch (error) {
    console.error("Error fetching ESG introduction:", error);
  }

  try {
    const response = (await getEsgPerformance()) as EsgPerformanceApiItem[];
    esgPerformance = Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Error fetching ESG performance:", error);
  }

  try {
    const response =
      (await getEsgSafetyGovernance()) as EsgSafetyGovernanceApiItem[];
    esgSafetyGovernance = Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Error fetching ESG safety & governance:", error);
  }

  try {
    esgReportsIntro =
      (await getEsgReportsIntro()) as EsgReportsIntroApiResponse;
  } catch (error) {
    console.error("Error fetching ESG reports intro:", error);
  }

  try {
    const response = (await getEsgReports()) as EsgReportApiItem[];
    esgReportsList = Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Error fetching ESG reports:", error);
  }

  const data: EsgPageData = {
    milestones: esgMilestones,
    ticker: esgTicker,
    safetyGovernance: esgSafetyGovernance,
    reportsIntro: esgReportsIntro,
    reportsList: esgReportsList,
    performance: esgPerformance,
    introduction: esgIntroduction
      ? {
          ...esgIntroduction,
          intro_image:
            toAbsoluteAssetUrl(esgIntroduction.intro_image) || undefined,
        }
      : null,
    hero: {
      title: esgBanner?.banner_caption,
      description: esgBanner?.banner_description,
      imageSrc: toAbsoluteAssetUrl(esgBanner?.banner_image) || "",
    },
  };

  return <EsgPageClient data={data} />;
}
