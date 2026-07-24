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
  getPrecBenefitsAPI,
  getPrecFaqs,
  getPrecFaqsAPI,
  getPrecIntro,
  getPrecIntroAPI,
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
// Revalidate this route every 30 minutes.
export const revalidate = 1800;
export const dynamic = "force-dynamic";
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
  const metaDataApi: MetaDataProps | null = null;

  if (siteUrl) {
    try {
      const [introRes, benefitsRes, faqsRes] = await Promise.all([
        getPrecIntroAPI(siteUrl),
        getPrecBenefitsAPI(siteUrl),
        getPrecFaqsAPI(siteUrl),
      ]);

      const unwrap = (raw: unknown): unknown => {
        const w = raw as { success?: boolean; data?: unknown };
        return w?.success && w.data !== undefined ? w.data : null;
      };

      const introData = unwrap(introRes);
      if (isPrecIntroPayload(introData)) {
        introApi = introData;
      }

      const benefitsData = unwrap(benefitsRes);
      if (Array.isArray(benefitsData)) {
        benefitsApi = benefitsData as PrecBenefitApiItem[];
      }

      const faqsData = unwrap(faqsRes);
      if (Array.isArray(faqsData)) {
        faqsApi = faqsData as PrecFaqApiItem[];
      }
    } catch (error) {
      console.error("Error fetching PREC from proxy API:", error);
    }
  }

  const needIntro = introApi === null;
  const needBenefits = benefitsApi === null || benefitsApi.length === 0;
  const needFaqs = faqsApi === null || faqsApi.length === 0;

  if (needIntro || needBenefits || needFaqs) {
    try {
      if (needIntro) {
        const raw = await getPrecIntro();
        if (isPrecIntroPayload(raw)) {
          introApi = raw;
        }
      }
      if (needBenefits) {
        const raw = await getPrecBenefits();
        if (Array.isArray(raw) && raw.length > 0) {
          benefitsApi = raw as PrecBenefitApiItem[];
        }
      }
      if (needFaqs) {
        const raw = await getPrecFaqs();
        if (Array.isArray(raw) && raw.length > 0) {
          faqsApi = raw as PrecFaqApiItem[];
        }
      }
    } catch (error) {
      console.error("Error fetching PREC from CMS:", error);
    }
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
