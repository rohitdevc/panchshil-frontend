import { ClientsPageClient } from "@/components/ClientsPage";
import { ClientItem, clientsPageData } from "./clients.data";
import {
  getClients,
  getBanner,
  getMetaData,
} from "@/api/CMS.api";
import { ClientsApiItem, BannersProps, MetaDataProps } from "@/interfaces";
import type { Metadata } from "next";

async function getPageMetaData(): Promise<MetaDataProps | null> {
  try {
    return (await getMetaData("Clients")) as MetaDataProps;
  } catch (error) {
    console.error("Error fetching meta data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metaData = await getPageMetaData();
  const banner = (await getBanner("Clients")) as BannersProps;

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

export default async function ClientsPage() {
  let clientsFromApi: ClientsApiItem[] = [];
  

  try {
    const response = await getClients();
    if (Array.isArray(response)) {
      clientsFromApi = response as ClientsApiItem[];
    }
  } catch (error) {
    console.error("Error fetching clients:", error);
  }

  let banner: BannersProps | null = null;
  try {
    banner = (await getBanner("Clients")) as BannersProps;
  } catch (error) {
    console.error("Error fetching banner:", error);
  }

  const mappedClients =
    clientsFromApi.length > 0
      ? clientsFromApi.map((client, index) => {
          const clientName = client.client_name;
          return {
            id: String(client.id ?? client._id ?? index + 1),
            name: clientName,
            imageSrc: toAbsoluteAssetUrl(client.client_logo),
            imageAlt: clientName,
          };
        })
      : clientsPageData.clients;

  const hero = { ...clientsPageData.hero };
  if (banner) {
    hero.imageSrc = toAbsoluteAssetUrl(banner.banner_image) || hero.imageSrc;
    hero.title = banner.banner_image_caption || hero.title;
    hero.description = banner.banner_image_description || hero.description;
  }

  return (
    <ClientsPageClient
      data={{
        hero,
        clients: mappedClients as ClientItem[],
      }}
    />
  );
}
