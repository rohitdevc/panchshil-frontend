import {
  getServicesIntro,
  getServices,
  getAboutIntro,
  getPropertyCategories,
  getPropertiesIntro,
  getProperties,
  getFeaturedPropertiesIntro,
  getFeaturedProperties,
  getMasterSlider,
  getMetaData,
  getBanner,
  getFooterBlocks,
  getMilestones,
} from "@/api/CMS.api";
import HomeClient from "./HomeClient";
import type { Metadata } from "next";
import {
  PropertyCategories,
  PropertiesIntroProps,
  PropertiesData,
  FeaturedPropertiesIntroProps,
  FeaturedPropertiesProps,
  ServicesIntroProps,
  ServicesProps,
  AboutIntroData,
  MetaDataProps,
  BannersProps,
  FooterBlocksProps,
  MilestonesProps,
  MasterSliderData,
} from "@/interfaces";

// Enable page-level caching - revalidate every 10 minutes (600 seconds)
export const revalidate = 600;
export const dynamic = "force-dynamic";
async function getPageMetaData(): Promise<MetaDataProps | null> {
  try {
    return (await getMetaData("Home")) as MetaDataProps;
  } catch (error) {
    console.error("Error fetching meta data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metaData = await getPageMetaData();
  const banner = (await getBanner("Home")) as BannersProps;

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

export default async function Home() {
  const apiCalls = [
    getMetaData("Home"),
    getBanner("Home"),
    getServicesIntro(),
    getServices(),
    getAboutIntro(),
    getMilestones(),
    getPropertyCategories(),
    getPropertiesIntro(),
    getProperties(),
    getFeaturedPropertiesIntro(),
    getFeaturedProperties(),
    getMasterSlider(),
    getFooterBlocks(),
  ];

  const [
    metaData,
    banner,
    servicesIntro,
    services,
    aboutIntro,
    milestones,
    propertyCategories,
    propertiesIntro,
    properties,
    featuredPropertiesIntro,
    featuredProperties,
    masterSlider,
    footerBlocks,
  ] = await Promise.allSettled(apiCalls);

  const data = {
    metaData:
      metaData.status === "fulfilled"
        ? (metaData.value as MetaDataProps)
        : { meta_data_heading: "", meta_data_sub_heading: "" },
    banner:
      banner?.status === "fulfilled" ? (banner.value as BannersProps) : [],
    servicesIntro:
      servicesIntro?.status === "fulfilled"
        ? (servicesIntro.value as ServicesIntroProps)
        : { services_intro_heading: "", services_intro_sub_heading: "" },
    services:
      services?.status === "fulfilled"
        ? (services.value as ServicesProps[])
        : [],
    aboutIntro:
      aboutIntro?.status === "fulfilled"
        ? (aboutIntro.value as AboutIntroData)
        : {
            about_intro_heading: "",
            about_intro_description: "",
            about_intro_link: "",
            about_intro_image: "",
            about_intro_desktop_video: "",
            about_intro_mobile_video: "",
            about_intro_button_caption: "",
          },
    milestones:
      milestones?.status === "fulfilled"
        ? (milestones.value as MilestonesProps[])
        : [],
    propertyCategories:
      propertyCategories?.status === "fulfilled"
        ? (propertyCategories.value as PropertyCategories[])
        : [],
    propertiesIntro:
      propertiesIntro?.status === "fulfilled"
        ? (propertiesIntro.value as PropertiesIntroProps)
        : { properties_intro_heading: "", properties_intro_sub_heading: "" },
    properties:
      properties?.status === "fulfilled"
        ? (properties.value as PropertiesData | null)
        : null,
    featuredPropertiesIntro:
      featuredPropertiesIntro?.status === "fulfilled"
        ? (featuredPropertiesIntro.value as FeaturedPropertiesIntroProps)
        : {
            featured_properties_intro_heading: "",
            featured_properties_intro_sub_heading: "",
          },
    featuredProperties:
      featuredProperties?.status === "fulfilled"
        ? (featuredProperties.value as FeaturedPropertiesProps[])
        : [],
    masterSlider:
      masterSlider?.status === "fulfilled"
        ? (masterSlider.value as MasterSliderData[])
        : [],
    footerBlocks:
      footerBlocks?.status === "fulfilled"
        ? (footerBlocks.value as FooterBlocksProps[])
        : [],
  };

  return (
    <HomeClient
      metaData={data.metaData as MetaDataProps}
      banner={data.banner as BannersProps}
      servicesIntro={data.servicesIntro}
      services={data.services}
      aboutIntro={data.aboutIntro}
      milestones={data.milestones}
      propertyCategories={data.propertyCategories}
      propertiesIntro={data.propertiesIntro}
      properties={data.properties}
      featuredPropertiesIntro={data.featuredPropertiesIntro}
      featuredProperties={data.featuredProperties}
      masterSlider={data.masterSlider}
      footerBlocks={data.footerBlocks}
    />
  );
}
