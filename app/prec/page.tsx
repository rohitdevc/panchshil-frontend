import PrecPageClient from "@/components/PrecPage/PrecPageClient";
import {
  PrecPageData,
  emptyPrecBenefits,
  emptyPrecFaqs,
  emptyPrecIntro,
  precPageDummyData,
} from "./prec-page.data";
import {
  getPrecBenefits,
  getPrecFaqs,
  getPrecIntro,
  getBanner,
  getMetaData,
} from "@/api/CMS.api";
import {
  PrecBenefitApiItem,
  PrecFaqApiItem,
  PrecIntroApiResponse,
  BannersProps,
  MetaDataProps,
} from "@/interfaces";
import type { Metadata } from "next";

async function getPageMetaData(): Promise<MetaDataProps | null> {
  try {
    return (await getMetaData("PREC")) as MetaDataProps;
  } catch (error) {
    console.error("Error fetching meta data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metaData = await getPageMetaData();
  const banner = (await getBanner("PREC")) as BannersProps;

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

function isPrecIntroPayload(data: unknown): data is PrecIntroApiResponse {
  return typeof data === "object" && data !== null;
}

function mapIntroFromApi(api: PrecIntroApiResponse): PrecPageData["intro"] {
  const heading = api.prec_heading?.trim() || api.prec_headling?.trim() || "";
  const rawDescription = api.prec_description ?? "";
  const paragraphs = rawDescription
    .split(/\r\n\r\n|\n\n+/)
    .map((p) => p.replace(/\r\n/g, "\n").trim())
    .filter(Boolean);
  const imageSrc = toAbsoluteAssetUrl(api.prec_image);

  return {
    heading,
    paragraphs,
    imageSrc,
    imageAlt: heading || "",
  };
}

function mapBenefitsFromApi(
  items: PrecBenefitApiItem[]
): PrecPageData["benefits"] {
  return {
    heading: "",
    items: items.map((row) => {
      const title = row.benefit_title ?? "";
      return {
        iconSrc: toAbsoluteAssetUrl(row.benefit_icon) || "",
        iconAlt: title || "Benefit",
        title,
        description: row.benefit_description ?? "",
      };
    }),
  };
}

function mapFaqsFromApi(items: PrecFaqApiItem[]): PrecPageData["faqs"] {
  return {
    kicker: "",
    heading: "",
    items: items.map((row) => ({
      question: row.faq_question ?? "",
      answer: row.faq_answer ?? "",
    })),
  };
}

export default async function PrecPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

  let introApi: PrecIntroApiResponse | null = null;
  let benefitsApi: PrecBenefitApiItem[] | null = null;
  let faqsApi: PrecFaqApiItem[] | null = null;

  try {
      introApi = (await getPrecIntro()) as PrecIntroApiResponse;
    
      benefitsApi = (await getPrecBenefits()) as PrecBenefitApiItem[];
    
      faqsApi = (await getPrecFaqs()) as PrecFaqApiItem[];
  } catch (error) {
    console.error("Error fetching PREC from CMS:", error);
  }

  let banner: BannersProps | null = null;
  try {
    banner = (await getBanner("PREC")) as BannersProps;
  } catch (error) {
    console.error("Error fetching banner:", error);
  }

  const data: PrecPageData = {
    ...precPageDummyData,
    intro: introApi ? mapIntroFromApi(introApi) : emptyPrecIntro,
    benefits:
      benefitsApi && benefitsApi.length > 0
        ? mapBenefitsFromApi(benefitsApi)
        : emptyPrecBenefits,
    faqs:
      faqsApi && faqsApi.length > 0 ? mapFaqsFromApi(faqsApi) : emptyPrecFaqs,
  };

  if (banner) {
    data.hero = {
      ...data.hero,
      imageSrc: toAbsoluteAssetUrl(banner.banner_image) || data.hero.imageSrc,
      title: banner.banner_image_caption || data.hero.title,
      description: banner.banner_image_description || data.hero.description,
    };
  }

  return <PrecPageClient data={data} />;
}
