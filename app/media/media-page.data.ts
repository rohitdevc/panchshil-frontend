import { CareerHeroContent } from "@/app/careers/career-page.data";

export type MediaStat = {
  value: string;
  label: string;
};

export type MediaCard = {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
};

export type MediaStep = {
  title: string;
  description: string;
};

export type MediaTestimonial = {
  name: string;
  role: string;
  quote: string;
};

export type MediaFaq = {
  question: string;
  answer: string;
};

export type FeaturedArticle = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  date: string;
  source: string;
  link: string;
};

export type MediaPageData = {
  hero: CareerHeroContent;
  featuredArticle: FeaturedArticle;
  media: FeaturedArticle[];
};

export const mediaPageDummyData: MediaPageData = {
  hero: {
    imageSrc: "/assets/images/media/media-page-banner.png",
    title: "Media & Press",
    description:
      "Updates, announcements and stories featuring panchshil's developments, milestones and industry presence.",
    // primaryCta: {
    //   label: "Join the network",
    //   href: "#join",
    // },
    // secondaryCta: {
    //   label: "How it works",
    //   href: "#how-it-works",
    // },
  },
  featuredArticle: {
    imageSrc: "/assets/images/media/organised-hawker.png",
    imageAlt: "City Gets Nukkad",
    title: "City Gets “Nukkad” The First Organised Hawkers Pack",
    date: "08Aug, 2025",
    source: "Hindustan Times",
    link: "#",
  },
  media: [
    {
      imageSrc: "/assets/images/media/ventive-hospitality.png",
      imageAlt: "Ventive Hospitality",
      title:
        "Ventive Hospitality Ipo: Blackstone-Backed Firm Raises ₹719.5 Crore From Anchor Investors Ahead Of Public Issue",
      date: "08Aug, 2025",
      source: "Hindustan Times",
      link: "#",
    },
  ],
};
