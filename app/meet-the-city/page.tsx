import MeetTheCityPageClient from "@/components/MeetTheCityPage/MeetTheCityPageClient";
import {
  MeetTheCityEdition,
  MeetTheCityPageData,
  emptyMeetTheCityEditions,
  meetTheCityPageDummyData,
} from "./meet-the-city-page.data";
import {
  getMeetTheCityMagazines,
  getMeetTheCityMagazinesAPI,
  getBanner,
  getMetaData,
} from "@/api/CMS.api";
import {
  MeetTheCityMagazineApiItem,
  BannersProps,
  MetaDataProps,
} from "@/interfaces";
import type { Metadata } from "next";
// Revalidate this route every 30 minutes.
export const revalidate = 1800;
export const dynamic = "force-dynamic";
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
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

  let magazinesFromApi: MeetTheCityMagazineApiItem[] | null = null;

  if (siteUrl) {
    try {
      const raw = await getMeetTheCityMagazinesAPI(siteUrl);
      const wrapped = raw as { success?: boolean; data?: unknown };
      if (wrapped?.success && Array.isArray(wrapped.data)) {
        magazinesFromApi = wrapped.data as MeetTheCityMagazineApiItem[];
      }
    } catch (error) {
      console.error(
        "Error fetching Meet The City magazines from proxy API:",
        error
      );
    }
  }

  if (magazinesFromApi === null || magazinesFromApi.length === 0) {
    try {
      const response = await getMeetTheCityMagazines();
      if (Array.isArray(response) && response.length > 0) {
        magazinesFromApi = response as MeetTheCityMagazineApiItem[];
      }
    } catch (error) {
      console.error("Error fetching Meet The City magazines:", error);
    }
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
