import { ServicesPageClient } from "@/components/ServicesPage";
import { servicesPageDummyData } from "./services.data";
import { getAboutServicesIntro, getServicesList } from "@/api/CMS.api";
import { ServicesIntroData, ServiceItem } from "@/interfaces";
import type { Metadata } from "next";
import { getBanner, getMetaData } from "@/api/CMS.api";
import { BannersProps, MetaDataProps } from "@/interfaces";

async function getPageMetaData(): Promise<MetaDataProps | null> {
  try {
    return (await getMetaData("Services")) as MetaDataProps;
  } catch (error) {
    console.error("Error fetching meta data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metaData = await getPageMetaData();
  const banner = (await getBanner("Services")) as BannersProps;

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

export default async function ServicesPage() {
  const apiCalls = [getAboutServicesIntro(), getServicesList()];

  const [servicesIntroRes, servicesListRes] =
    await Promise.allSettled(apiCalls);

  const mergedData = { ...servicesPageDummyData };

  if (servicesIntroRes.status === "fulfilled" && servicesIntroRes.value) {
    const introData = servicesIntroRes.value as ServicesIntroData;
    mergedData.servicesIntroData = {
      services_headling:
        introData.services_headling ||
        mergedData.servicesIntroData.services_headling,
      services_description:
        introData.services_description ||
        mergedData.servicesIntroData.services_description,
    };
  }

  if (servicesListRes.status === "fulfilled" && servicesListRes.value) {
    const services = servicesListRes.value as ServiceItem[];
    if (Array.isArray(services) && services.length > 0) {
      mergedData.servicesData = services.map((service) => ({
        service_name: service.service_name,
        service_description: service.service_description,
        service_thumbnail: service.service_thumbnail,
        service_capabilities: service.service_capabilities,
      }));
    }
  }

  return <ServicesPageClient data={mergedData} />;
}
