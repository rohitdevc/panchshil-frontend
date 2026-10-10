import MeetTheCityPageClient from "@/components/MeetTheCityPage/MeetTheCityPageClient";
import {
  MeetTheCityEdition,
  MeetTheCityPageData,
  emptyMeetTheCityEditions,
  meetTheCityPageDummyData,
} from "./meet-the-city-page.data";
import {
  getMeetTheCityMagazines,
  getBanner,
  getMetaData,
} from "@/api/CMS.api";
import {
  MeetTheCityMagazineApiItem,
  BannersProps,
  MetaDataProps,
} from "@/interfaces";
import type { Metadata } from "next";

async function getPageMetaData(): Promise<MetaDataProps | null> {
  try {
    return (await getMetaData("Meet The City")) as MetaDataProps;
  } catch (error) {
    console.error("Error fetching meta data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metaData = await getPageMetaData();
  const banner = (await getBanner("Meet The City")) as BannersProps;

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

function mapMagazinesFromApi(
  items: MeetTheCityMagazineApiItem[]
): MeetTheCityEdition[] {
  return items
    .map((row, index) => {
      const title = row.magazine_edition?.trim() ?? "";
      const imageSrc = toAbsoluteAssetUrl(row.magazine_thumbnail);
      const pdfUrl = toAbsoluteAssetUrl(row.magazine_pdf);

      return {
        id: String(index + 1),
        title,
        imageSrc,
        imageAlt: title
          ? `Meet The City ${title}`
          : "Meet The City magazine cover",
        pdfUrl: pdfUrl || undefined,
      };
    })
    .filter((edition) => edition.imageSrc.length > 0);
}

export default async function MeetTheCityPage() {
  let magazinesFromApi: MeetTheCityMagazineApiItem[] | null = null;

  try {
    const response = await getMeetTheCityMagazines();
    if (Array.isArray(response) && response.length > 0) {
      magazinesFromApi = response as MeetTheCityMagazineApiItem[];
    }
  } catch (error) {
    console.error("Error fetching Meet The City magazines:", error);
  }

  let banner: BannersProps | null = null;
  try {
    banner = (await getBanner("Meet The City")) as BannersProps;
  } catch (error) {
    console.error("Error fetching banner:", error);
  }

  const editions =
    magazinesFromApi && magazinesFromApi.length > 0
      ? mapMagazinesFromApi(magazinesFromApi)
      : emptyMeetTheCityEditions;

  const hero = { ...meetTheCityPageDummyData.hero };
  if (banner) {
    hero.imageSrc = toAbsoluteAssetUrl(banner.banner_image) || hero.imageSrc;
    hero.title = banner.banner_image_caption || hero.title;
    hero.description = banner.banner_image_description || hero.description;
  }

  const data: MeetTheCityPageData = {
    hero,
    editions,
  };

  return <MeetTheCityPageClient data={data} />;
}
