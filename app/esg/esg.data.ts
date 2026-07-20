import { CareerHeroContent } from "@/app/careers/career-page.data";
import {
  EsgIntroductionApiResponse,
  EsgMilestoneApiItem,
  EsgPerformanceApiItem,
  EsgReportApiItem,
  EsgReportsIntroApiResponse,
  EsgSafetyGovernanceCategoryApiItem,
  EsgTickerApiItem,
  MetaDataProps,
} from "@/interfaces";

export type EsgAccordionItem = {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type EsgAccordionContent = {
  heading: string;
  title: string;
  description: string;
  defaultOpen: number;
  items: EsgAccordionItem[];
};

export type EsgPeopleCommunitiesSlide = {
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type EsgPeopleCommunitiesContent = {
  heading: string;
  title: string;
  tabs: Array<{
    tabLabel: string;
    slides: EsgPeopleCommunitiesSlide[];
  }>;
};

export type EsgSteeringCommitteeCard = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type EsgSteeringCommitteeContent = {
  heading: string;
  title: string;
  cards: EsgSteeringCommitteeCard[];
};

export type EsgBeyondTheBuildStat = {
  value: string;
  label: string;
};

export type EsgBeyondTheBuildContent = {
  title: string;
  description: string;
  stats: EsgBeyondTheBuildStat[];
  leafImageSrc: string;
  leafImageSrc2: string;
  birdImageSrc: string;
};

export type EsgRecognitionSlide = {
  imageSrc: string;
  title: string;
  description: string;
  stats: string[];
  sdgImages: string[];
};

export type EsgRecognitionsCertificatesContent = {
  heading: string;
  title: string;
  slides: EsgRecognitionSlide[];
};

export type EsgReportItem = {
  imageSrc: string;
  subtitle: string;
  title: string;
  href: string;
};

export type EsgReportsContent = {
  heading: string;
  title: string;
  reports: EsgReportItem[];
};

export type EsgPageData = {
  hero: CareerHeroContent;
  milestones: EsgMilestoneApiItem[] | [];
  ticker: EsgTickerApiItem[] | [];
  introduction: EsgIntroductionApiResponse | null;
  performance: EsgPerformanceApiItem[];
  safetyGovernance: EsgSafetyGovernanceCategoryApiItem[];
  reportsIntro: EsgReportsIntroApiResponse | object | null;
  reportsList: EsgReportApiItem[] | [];
};

export const emptyEsgAccordion: EsgAccordionContent = {
  heading: "",
  title: "",
  description: "",
  defaultOpen: 1,
  items: [],
};

export const emptyEsgPeopleCommunities: EsgPeopleCommunitiesContent = {
  heading: "",
  title: "",
  tabs: [],
};

export const emptyEsgSteeringCommittee: EsgSteeringCommitteeContent = {
  heading: "",
  title: "",
  cards: [],
};

export const emptyEsgBeyondTheBuild: EsgBeyondTheBuildContent = {
  title: "",
  description: "",
  stats: [],
  leafImageSrc: "",
  leafImageSrc2: "",
  birdImageSrc: "",
};

export const emptyEsgRecognitionsCertificates: EsgRecognitionsCertificatesContent =
  {
    heading: "",
    title: "",
    slides: [],
  };

export const emptyEsgReports: EsgReportsContent = {
  heading: "",
  title: "",
  reports: [],
};

/** Layout-only artwork when milestone content is loaded from CMS */
export const esgBeyondTheBuildDecorDefaults: Pick<
  EsgBeyondTheBuildContent,
  "leafImageSrc" | "leafImageSrc2" | "birdImageSrc"
> = {
  leafImageSrc: "/assets/images/esg/left-leaf-artwork.png",
  leafImageSrc2: "/assets/images/esg/right-leaf-artwork.png",
  birdImageSrc: "/assets/images/esg/bird-background.png",
};

export const esgPageData: EsgPageData = {
  milestones: [],
  ticker: [],
  introduction: null,
  performance: [],
  safetyGovernance: [],
  reportsIntro: {},
  reportsList: [],
  hero: {
    imageSrc: "/assets/images/esg/esg-hero-banner.png",
    title: "Building India's Most Sustainable Workplace",
    description:
      "At panchshil, sustainability isn't an initiative it's our foundation. Every square foot we create is guided by energy efficiency, health and safety, water stewardship and environmental responsibility.",
    primaryCta: {
      label: "Explore ESG Progress",
      href: "#esg-progress",
    },
  },
};

export const esgAccordion: EsgAccordionContent = {
  heading: "ESG PILLARS",
  title: "OUR SUSTAINABILITY FOCUS",
  description:
    "Our sustainability approach spans energy, water, waste and procurement-ensuring every aspect of our operations contributes to a better future.",
  defaultOpen: 1,
  items: [
    {
      id: 1,
      title: "Energy & Climate Action",
      description:
        "Driving energy efficiency and climate action across all our office parks and developments.",
      imageSrc: "/assets/images/esg/waste-management.png",
      imageAlt: "Energy & Climate Action",
    },
    {
      id: 2,
      title: "Water Stewardship",
      description:
        "Sustainable water management and conservation practices across our campuses.",
      imageSrc: "/assets/images/esg/waste-management.png",
      imageAlt: "Water Stewardship",
    },
    {
      id: 3,
      title: "Waste Management",
      description:
        "Panchshil Realty has built a circular waste ecosystem that focuses on reduction, segregation and resource recovery across all office parks. Each campus implements 100% onsite waste segregation, enabling recycling and organic waste to be redirected from landfills.",
      imageSrc: "/assets/images/esg/waste-management.png",
      imageAlt: "Waste Management",
    },
    {
      id: 4,
      title: "Sustainable Procurement",
      description:
        "Responsible sourcing and sustainable procurement practices across our supply chain.",
      imageSrc: "/assets/images/esg/sustainable-procurement.png",
      imageAlt: "Sustainable Procurement",
    },
  ],
};

export const esgPeopleCommunities: EsgPeopleCommunitiesContent = {
  heading: "LOREM IPSUM",
  title: "OUR PEOPLE, OUR COMMUNITIES",
  tabs: [
    {
      tabLabel: "EDUCATION",
      slides: [
        {
          description:
            "Our initiatives focus on creating inclusive learning environments from upgrading school infrastructure and providing digital classrooms to supporting vocational training programs that equip youth for future ready careers.",
          imageSrc: "/assets/images/esg/people-communities.png",
          imageAlt: "Education and community initiatives",
        },
      ],
    },
    {
      tabLabel: "HEALTH",
      slides: [
        {
          description:
            "Health and wellness initiatives that support our communities.",
          imageSrc: "/assets/images/esg/people-communities.png",
          imageAlt: "Health and community initiatives",
        },
      ],
    },
    {
      tabLabel: "SPORTS",
      slides: [
        {
          description:
            "Sports and recreation programs that foster community engagement.",
          imageSrc: "/assets/images/esg/people-communities.png",
          imageAlt: "Sports and community initiatives",
        },
      ],
    },
    {
      tabLabel: "ENVIRONMENT",
      slides: [
        {
          description:
            "Environmental initiatives that protect and preserve our natural surroundings.",
          imageSrc: "/assets/images/esg/people-communities.png",
          imageAlt: "Environment and community initiatives",
        },
      ],
    },
  ],
};

export const esgSteeringCommittee: EsgSteeringCommitteeContent = {
  heading: "LOREM IPSUM",
  title:
    "OUR ESG STEERING COMMITTEE ENSURES THAT 24 GROUP WIDE POLICIES UPHOLD TRANSPARENCY, ETHICS AND ACCOUNTABILITY",
  cards: [
    {
      title: "Sustainable Procurement Practices",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
      imageSrc: "/assets/images/esg/sustainable-procurement.png",
      imageAlt: "Sustainable Procurement Practices",
    },
    {
      title: "Human Rights Policy",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
      imageSrc: "/assets/images/esg/human-rights-policy.png",
      imageAlt: "Human Rights Policy",
    },
    {
      title: "Stakeholder Engagement Policy",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
      imageSrc: "/assets/images/esg/stake-holder-policy.png",
      imageAlt: "Stakeholder Engagement Policy",
    },
  ],
};

export const esgBeyondTheBuild: EsgBeyondTheBuildContent = {
  title: "BEYOND THE BUILD HIGHLIGHTS",
  description:
    "Our initiatives focus on creating inclusive learning environments from upgrading school infrastructure and providing digital classrooms to supporting vocational training programs that equip youth for future ready careers.",
  leafImageSrc: "/assets/images/esg/left-leaf-artwork.png",
  leafImageSrc2: "/assets/images/esg/right-leaf-artwork.png",
  birdImageSrc: "/assets/images/esg/bird-background.png",
  stats: [
    { value: "20.48Mn Sq. Ft", label: "LEED & IGBC Certified" },
    {
      value: "16.19 Mn Sq. Ft",
      label: "ISO 45001,2018 Health & Safety Certified",
    },
    { value: "93%", label: "Renewable Energy at EON I & II Delivered" },
    { value: "6,08,934 (90%)", label: "KL Water Recycled as on date" },
    { value: "64%", label: "Waste Diverted From Landfills" },
  ],
};

export const esgRecognitionsCertificates: EsgRecognitionsCertificatesContent = {
  heading: "AWARDS",
  title: "RECOGNITIONS & CERTIFICATES",
  slides: [
    {
      imageSrc: "/assets/images/esg/recognition-certificates.png",
      title: "EON FREE ZONE II",
      description:
        "EON Free Zone II exemplifies panchshil's integrated ESG approach combining renewable energy sourcing, advanced water recycling systems, and globally benchmarked safety standards across its 4.5 million sq.ft. of operational space.",
      stats: [
        "93% RENEWABLE POWER",
        "LEED PLATINUM CERTIFIED",
        "87% WATER RECYCLING EFFICIENCY",
      ],
      sdgImages: [
        "/assets/images/esg/clean-water.svg",
        "/assets/images/esg/affordable-energy.svg",
        "/assets/images/esg/sustainable-cities.svg",
        "/assets/images/esg/climate-action.svg",
      ],
    },
  ],
};

export const esgReports: EsgReportsContent = {
  heading: "REPORTS",
  title:
    "EACH REPORT REFLECTS OUR ONGOING PURSUIT OF EXCELLENCE IN SUSTAINABLE REAL ESTATE",
  reports: [
    {
      imageSrc: "/assets/images/esg/smart-agriculture.png",
      subtitle: "PANCHSHIL ESG REPORT",
      title: "FY 2022/23",
      href: "#",
    },
    {
      imageSrc: "/assets/images/esg/futuristic-city.png",
      subtitle: "PANCHSHIL ESG REPORT",
      title: "FY 2023/24",
      href: "#",
    },
    {
      imageSrc: "/assets/images/esg/esg-hero-banner.png",
      subtitle: "PANCHSHIL ESG REPORT",
      title: "FY 2024/25",
      href: "#",
    },
    {
      imageSrc: "/assets/images/esg/smart-agriculture.png",
      subtitle: "PANCHSHIL ESG REPORT",
      title: "FY 2024/25",
      href: "#",
    },
  ],
};
