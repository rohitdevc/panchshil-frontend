import { AboutUsPageClient } from "@/components/AboutUsPage";
import { aboutUsPageDummyData } from "./about.data";
import {
  getAboutUsIntro,
  getAboutUsVision,
  getAboutUsMission,
  getAboutUsCoreValuesIntro,
  getAboutUsCoreValues,
  getAboutUsCommitmentIntro,
  getAboutUsMilestones,
  getAboutUsGrowthChronicles,
  getAboutUsVideo,
  getAboutUsGlobalIntroduction,
  getAboutUsEsg,
  getAboutUsClients,
  getAboutUsPartners,
  getBanner,
  getMetaData,
} from "@/api/CMS.api";
import {
  AboutUsIntroData,
  AboutUsVision,
  AboutUsMission,
  AboutUsCoreValuesIntro,
  AboutUsCoreValues,
  AboutUsCommitmentIntro,
  AboutUsMilestonesApiItem,
  GrowthChronicleItem,
  AboutVideoData,
  GlobalContent,
  AboutEsgContent,
  AboutClient,
  AboutPartnerTab,
  BannersProps,
  MetaDataProps,
} from "@/interfaces";
import type { Metadata } from "next";

async function getPageMetaData(): Promise<MetaDataProps | null> {
  try {
    return (await getMetaData("About")) as MetaDataProps;
  } catch (error) {
    console.error("Error fetching meta data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metaData = await getPageMetaData();
  const banner = (await getBanner("About")) as BannersProps;

  return {
    title: metaData?.meta_title || "",
    description: metaData?.meta_description || "",
    keywords: metaData?.meta_keywords || "",
    alternates: {
      canonical: metaData?.canonical_tag || "",
    },
    openGraph: {
      title: metaData?.meta_title,
      description: metaData?.meta_description,
      type: "website",
      url: metaData?.canonical_tag,
      siteName: "Panchshil Realty",
      images: [
        {
          url: banner.og_image,
          width: 1200,
          height: 630,
          alt: metaData?.meta_title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaData?.meta_title,
      description: metaData?.meta_description,
      images: [banner.og_image],
    },
  };
}

const toAbsoluteAssetUrl = (imageUrl: string | undefined): string => {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT || "";
  if (!baseUrl) {
    return imageUrl;
  }

  return `${baseUrl.replace(/\/$/, "")}/${imageUrl.replace(/^\//, "")}`;
};

export default async function AboutUsPage() {
  const apiCalls = [
    getBanner("About"),
    getAboutUsIntro(),
    getAboutUsVision(),
    getAboutUsMission(),
    getAboutUsCoreValuesIntro(),
    getAboutUsCoreValues(),
    getAboutUsCommitmentIntro(),
    getAboutUsMilestones(),
    getAboutUsGrowthChronicles(),
    getAboutUsVideo(),
    getAboutUsGlobalIntroduction(),
    getAboutUsEsg(),
    getAboutUsClients(),
    getAboutUsPartners(),
  ];

  const [
    bannerRes,
    aboutIntroRes,
    aboutVisionRes,
    aboutMissionRes,
    aboutCoreValuesIntroRes,
    aboutCoreValuesRes,
    aboutCommitmentRes,
    milestonesRes,
    growthChroniclesRes,
    videoRes,
    globalIntroRes,
    esgRes,
    clientsRes,
    partnersRes,
  ] = await Promise.allSettled(apiCalls);

  const mergedData = { ...aboutUsPageDummyData };
  if (aboutIntroRes.status === "fulfilled" && aboutIntroRes.value) {
    const introData = aboutIntroRes.value as AboutUsIntroData;
    mergedData.visibleImpact = {
      ...mergedData.visibleImpact,
      title: introData.about_intro_caption || mergedData.visibleImpact.title,
      description: introData.about_intro_content ? (
        <div
          className="flex flex-col gap-4 whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: introData.about_intro_content }}
        />
      ) : (
        mergedData.visibleImpact.description
      ),
      imageSrc:
        introData.about_intro_image || mergedData.visibleImpact.imageSrc,
      about_intro_name: introData.about_intro_name,
      about_intro_designation: introData.about_intro_designation,
    };
  }

  if (aboutVisionRes.status === "fulfilled" && aboutVisionRes.value) {
    const introData = aboutVisionRes.value as AboutUsVision;
    mergedData.vision = {
      ...introData,
    };
  }

  if (aboutMissionRes.status === "fulfilled" && aboutMissionRes.value) {
    const introData = aboutMissionRes.value as AboutUsMission;
    mergedData.mission = {
      ...introData,
    };
  }

  if (
    aboutCoreValuesIntroRes.status === "fulfilled" &&
    aboutCoreValuesIntroRes.value
  ) {
    const introData = aboutCoreValuesIntroRes.value as AboutUsCoreValuesIntro;
    mergedData.core_values_intro = {
      ...introData,
    };
  }

  if (aboutCoreValuesRes.status === "fulfilled" && aboutCoreValuesRes.value) {
    const coreValuesData = aboutCoreValuesRes.value as AboutUsCoreValues[];
    mergedData.core_values = coreValuesData;
  }

  if (aboutCommitmentRes.status === "fulfilled" && aboutCommitmentRes.value) {
    const introData = aboutCommitmentRes.value as AboutUsCommitmentIntro;
    mergedData.commitment_intro = {
      ...introData,
    };
  }

  if (milestonesRes.status === "fulfilled" && milestonesRes.value) {
    const milestonesData = milestonesRes.value as AboutUsMilestonesApiItem[];
    if (Array.isArray(milestonesData) && milestonesData.length > 0) {
      mergedData.stats = milestonesData.map((milestone) => {
        const countString = milestone.milestone_count || "0";
        const numericValue = parseInt(countString.replace(/\D/g, "")) || 0;
        const suffixValue = countString.replace(/\d/g, "");

        return {
          value: numericValue,
          suffix: suffixValue,
          label: milestone.milestone_title,
        };
      });
    }
  }

  if (growthChroniclesRes.status === "fulfilled" && growthChroniclesRes.value) {
    const growthData = growthChroniclesRes.value as GrowthChronicleItem[];
    if (Array.isArray(growthData) && growthData.length > 0) {
      mergedData.milestones = {
        ...mergedData.milestones,
        milestones: growthData.map((item, index) => {
          const fallback =
            aboutUsPageDummyData.milestones.milestones[index] ||
            aboutUsPageDummyData.milestones.milestones[0];

          return {
            year: item.growth_chronicle_year.toString(),
            title: fallback.title,
            description: item.growth_chronicles.map((growth_chronicle) => ({
              title: growth_chronicle.growth_chronicle_caption,
              content: growth_chronicle.growth_chronicle_caption,
              imageSrc:
                growth_chronicle.growth_chronicle_image || fallback.imageSrc,
            })),
            imageSrc: fallback.imageSrc,
            imageAlt: fallback.imageAlt,
          };
        }),
      };
    }
  }

  if (videoRes.status === "fulfilled" && videoRes.value) {
    mergedData.videoBanner = videoRes.value as AboutVideoData;
  }

  if (globalIntroRes.status === "fulfilled" && globalIntroRes.value) {
    mergedData.globalIntroduction = globalIntroRes.value as GlobalContent;
  }

  if (esgRes.status === "fulfilled" && esgRes.value) {
    mergedData.esg = esgRes.value as AboutEsgContent;
  }

  if (clientsRes.status === "fulfilled" && clientsRes.value) {
    const clients = clientsRes.value as AboutClient[];
    if (Array.isArray(clients) && clients.length > 0) {
      mergedData.ourValuedClients = clients.map((client) => ({
        property_key_tenant_caption: client.client_name,
        property_key_tenant_image: client.client_logo,
      }));
    }
  }

  if (partnersRes.status === "fulfilled" && partnersRes.value) {
    const partnerTabs = partnersRes.value as AboutPartnerTab[];
    if (Array.isArray(partnerTabs) && partnerTabs.length > 0) {
      mergedData.alliances = {
        ...mergedData.alliances,
        tabs: partnerTabs.map((tab) => ({
          tabLabel: tab.partner_tab,
          slides: tab.partners.map((partner) => ({
            title: partner.partner_name,
            description: partner.partner_description,
            linkLabel: "Read More",
            linkHref: partner.partner_website,
          })),
        })),
      };
    }
  }

  if (bannerRes.status === "fulfilled" && bannerRes.value) {
    const banner = bannerRes.value as BannersProps;
    mergedData.hero = {
      ...mergedData.hero,
      imageSrc:
        toAbsoluteAssetUrl(banner.banner_image) || mergedData.hero.imageSrc,
      title: banner.banner_image_caption || mergedData.hero.title,
      description:
        banner.banner_image_description || mergedData.hero.description,
    };
  }

  return <AboutUsPageClient data={mergedData} />;
}
