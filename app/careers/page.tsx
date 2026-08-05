import { CareerPageClient } from "@/components/CareerPage";
import type { Metadata } from "next";
import {
  getCareersMilestones,
  getCareersIntro,
  getCareersCategoriesIntro,
  getCareersCategories,
  getCareersWorkCultureIntro,
  getCareersWorkCulture,
  getCareersGrowthIntro,
  getCareersGrowth,
  getCareersAwardsIntro,
  getAwards,
  getCareersLifeAtPanchshilIntro,
  getCareersLifeAtPanchshil,
  getCareersFooterIntro,
} from "@/api/CMS.api";
import {
  IntroProps,
  AwardsApiItem,
  CareersMilestonesProps,
  CareersWorkCultureProps,
  CareersLifeAtPanchshilProps,
  CareersCategoryProps,
  CareersGrowthProps,
} from "@/interfaces";
import { getBanner, getMetaData } from "@/api/CMS.api";
import { BannersProps, MetaDataProps } from "@/interfaces";
import {
  CareerHeroContent,
  CareerPageDataProp,
  CareerVisibleImpactContent,
  CareerTracksContent,
  CareerHowWeWorkContent,
  CareerGrowthExposureContent,
  CareerSafetyAwardsContent,
  CareerInsideLifeContent,
  CareerFitInBannerContent,
} from "./career-page.data";

export const revalidate = 600;
export const dynamic = "force-dynamic";
async function getPageMetaData(): Promise<MetaDataProps | null> {
  try {
    return (await getMetaData("Careers")) as MetaDataProps;
  } catch (error) {
    console.error("Error fetching meta data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metaData = await getPageMetaData();
  const banner = (await getBanner("Careers")) as BannersProps;

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

export default async function CareersPage() {
  const apiCalls = [
    getCareersMilestones(),
    getCareersIntro(),
    getCareersCategoriesIntro(),
    getCareersCategories(),
    getCareersWorkCultureIntro(),
    getCareersWorkCulture(),
    getCareersGrowthIntro(),
    getCareersGrowth(),
    getCareersAwardsIntro(),
    getAwards(),
    getCareersLifeAtPanchshilIntro(),
    getCareersLifeAtPanchshil(),
    getCareersFooterIntro(),
  ];

  const [
    careers_milestones,
    careers_intro,
    careers_categories_intro,
    careers_categories,
    careers_work_culture_intro,
    careers_work_culture,
    careers_growth_intro,
    careers_growth,
    careers_awards_intro,
    careers_awards,
    careers_life_at_panchshil_intro,
    careers_life_at_panchshil,
    careers_footer_intro,
  ] = await Promise.allSettled(apiCalls);

  let banner: BannersProps | null = null;
  try {
    banner = (await getBanner("Careers")) as BannersProps;
  } catch (error) {
    console.error("Error fetching banner:", error);
  }

  const hero = {} as CareerHeroContent;
  if (banner) {
    hero.imageSrc = toAbsoluteAssetUrl(banner.banner_image) || "";
    hero.title = banner.banner_image_caption;
    hero.description = banner.banner_image_description;
  }

  const content: CareerPageDataProp = {
    hero: {} as CareerHeroContent,
    stats: {} as Array<{
      value: string;
      suffix?: string;
      label: string;
    }>,
    visibleImpact: {} as CareerVisibleImpactContent,
    careerTracks: {} as CareerTracksContent,
    howWeWork: {} as CareerHowWeWorkContent,
    growthExposure: {} as CareerGrowthExposureContent,
    safetyAwards: {} as CareerSafetyAwardsContent,
    insideLife: {} as CareerInsideLifeContent,
    fitInBanner: {} as CareerFitInBannerContent,
    departments: {} as Array<{
      title: string;
      imageSrc: string;
    }>,
  };

  if (careers_milestones.status === "fulfilled" && careers_milestones.value) {
    const milestones = careers_milestones.value as CareersMilestonesProps[];

    content.stats = milestones.map((milestone) => ({
      value: milestone.milestone_count,
      label: milestone.milestone_name,
    }));
  }

  if (careers_intro.status === "fulfilled" && careers_intro.value) {
    const careers_introduction = careers_intro.value as IntroProps;

    content.visibleImpact = {
      title: careers_introduction.intro_title,
      description: careers_introduction.intro_caption,
      points: careers_introduction.intro_description
        ? careers_introduction.intro_description.split("\r\n")
        : [],
      imageSrc: careers_introduction.intro_image,
      imageAlt: careers_introduction.intro_title,
    };
  }

  if (
    careers_categories_intro.status === "fulfilled" &&
    careers_categories_intro.value
  ) {
    const categories_intro = careers_categories_intro.value as IntroProps;

    content.careerTracks = {
      subHeading: categories_intro.intro_title,
      description: categories_intro.intro_description,
      posts: [],
    };

    if (careers_categories.status === "fulfilled" && careers_categories.value) {
      const categories = careers_categories.value as CareersCategoryProps[];

      categories.forEach((category) => {
        content.careerTracks.posts.push({
          title: category.category_title,
          description: category.category_caption,
          imageSrc: category.category_thumbnail,
          ctaLabel: "Read More",
          ctaHref: "/careers/search",
        });
      });
    }
  }

  if (
    careers_work_culture_intro.status === "fulfilled" &&
    careers_work_culture_intro.value
  ) {
    const work_culture_intro = careers_work_culture_intro.value as IntroProps;

    content.howWeWork = {
      title: work_culture_intro.intro_title,
      description: work_culture_intro.intro_description,
      items: [],
    };

    if (
      careers_work_culture.status === "fulfilled" &&
      careers_work_culture.value
    ) {
      const work_cultures =
        careers_work_culture.value as CareersWorkCultureProps[];

      work_cultures.forEach((work_culture) => {
        content.howWeWork.items.push({
          title: work_culture.work_culture_title,
          description: work_culture.work_culture_description,
          iconSrc: work_culture.work_culture_icon,
        });
      });
    }
  }

  if (
    careers_growth_intro.status === "fulfilled" &&
    careers_growth_intro.value
  ) {
    const growth_intro = careers_growth_intro.value as IntroProps;

    content.growthExposure = {
      subHeading: growth_intro.intro_title,
      description: growth_intro.intro_description,
      slides: [],
    };

    if (careers_growth.status === "fulfilled" && careers_growth.value) {
      const growthRes = careers_growth.value as CareersGrowthProps[];

      growthRes.forEach((growth) => {
        content.growthExposure.slides.push({
          title: growth.growth_title,
          description: growth.growth_description,
          imageSrc: growth.growth_image,
        });
      });
    }
  }

  if (
    careers_awards_intro.status === "fulfilled" &&
    careers_awards_intro.value
  ) {
    const awards_intro = careers_awards_intro.value as IntroProps;

    content.safetyAwards = {
      subHeading: awards_intro.intro_title,
      description: awards_intro.intro_description,
      property_award_certificates: [],
    };

    if (careers_awards.status === "fulfilled" && careers_awards.value) {
      const awardsRes = careers_awards.value as AwardsApiItem[];

      awardsRes.slice(0, 10).forEach((award) => {
        content.safetyAwards.property_award_certificates.push({
          property_award_certificate_caption: award.award_caption,
          property_award_certificate_image: award.award_image || "",
        });
      });
    }
  }

  if (
    careers_life_at_panchshil_intro.status === "fulfilled" &&
    careers_life_at_panchshil_intro.value
  ) {
    const life_at_panchshil_intro =
      careers_life_at_panchshil_intro.value as IntroProps;

    content.insideLife = {
      subHeading: life_at_panchshil_intro.intro_title,
      description: life_at_panchshil_intro.intro_description,
      ctaLabel: "EXPLORE LIFE @ PANCHSHIL",
      ctaHref: "/careers/life-at-panchshil",
      slides: [],
    };

    if (
      careers_life_at_panchshil.status === "fulfilled" &&
      careers_life_at_panchshil.value
    ) {
      const lifeAtPanchshilRes =
        careers_life_at_panchshil.value as CareersLifeAtPanchshilProps[];

      lifeAtPanchshilRes.forEach((life_at_panchshil) => {
        content.insideLife.slides.push({
          title: life_at_panchshil.life_at_panchshil_title,
          imageSrc: life_at_panchshil.life_at_panchshil_image,
        });
      });
    }
  }

  if (
    careers_footer_intro.status === "fulfilled" &&
    careers_footer_intro.value
  ) {
    const footer_intro = careers_footer_intro.value as IntroProps;

    content.fitInBanner = {
      title: footer_intro.intro_title,
      imageSrc: footer_intro.intro_image,
      description: "",
      primaryCtaLabel: "Explore Career Opportunities",
      primaryCtaHref: "/careers/search",
      secondaryCtaLabel: "Discover Life @ Panchshil",
      secondaryCtaHref: "/careers/life-at-panchshil",
    };
  }

  content.hero = hero;

  return <CareerPageClient data={content} />;
}
