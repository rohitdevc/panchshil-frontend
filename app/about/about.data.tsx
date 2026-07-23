import {
  GlobalContent,
  AboutEsgContent,
  AboutClient,
  MetaDataProps,
} from "@/interfaces";

export type AboutUsHeroContent = {
  imageSrc: string;
  title: string;
  description: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

export type AboutUsVisibleImpactContent = {
  title: string;
  description: React.ReactNode;
  points?: string[];
  imageSrc: string;
  imageAlt: string;
  about_intro_name?: string;
  about_intro_designation?: string;
};

export type AboutUsVisionProps = {
  about_vision_title: string;
  about_vision_caption: string;
  about_vision_description: string;
};

export type AboutUsMissionProps = {
  about_mission_title: string;
  about_mission_caption: string;
  about_mission_description: string;
};

export type AboutUsCoreValuesIntroProps = {
  about_core_values_intro_title: string;
  about_core_values_intro_caption: string;
};

export type AboutUsCoreValuesProps = {
  core_value_title: string;
  core_value_description: string;
};

export type AboutUsCommitmentIntroProps = {
  about_commitment_intro_title: string;
  about_commitment_intro_description: string;
};

export type AboutUsSustainabilitySlide = {
  imageSrc: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export type AboutUsSustainabilityContent = {
  slides: AboutUsSustainabilitySlide[];
};

export type AboutUsAllianceSlide = {
  title: string;
  description: string;
  linkLabel: string;
  linkHref: string;
};

export type AboutUsAlliancesTab = {
  tabLabel: string;
  slides: AboutUsAllianceSlide[];
};

export type AboutUsAlliancesContent = {
  title: string;
  tabs: AboutUsAlliancesTab[];
};

export type AboutUsPageDummyData = {
  hero: AboutUsHeroContent;
  metaData: MetaDataProps;
  stats: Array<{
    value: number;
    suffix?: string;
    label: string;
  }>;
  visibleImpact: AboutUsVisibleImpactContent;
  vision?: AboutUsVisionProps;
  mission?: AboutUsMissionProps;
  core_values_intro?: AboutUsCoreValuesIntroProps;
  core_values?: AboutUsCoreValuesProps[];
  commitment_intro?: AboutUsCommitmentIntroProps;
  milestones: AboutUsMilestonesContent;
  sustainability: AboutUsSustainabilityContent;
  ourValuedClients: OurValuedClientsType[];
  alliances: AboutUsAlliancesContent;
  videoBanner?: import("@/interfaces").AboutVideoData;
  globalIntroduction?: GlobalContent;
  esg?: AboutEsgContent;
  aboutClients?: AboutClient[];
};

export type AboutUsMilestoneItem = {
  year: string;
  title: string;
  description: {
    title: string;
    content: string;
    imageSrc: string;
  }[];
  imageSrc: string;
  imageAlt: string;
};

export type AboutUsMilestonesContent = {
  title: string;
  subtitle: string;
  milestones: AboutUsMilestoneItem[];
};

export type OurValuedClientsType = {
  property_key_tenant_caption: string;
  property_key_tenant_image: string;
};

export const aboutUsPageDummyData: AboutUsPageDummyData = {
  hero: {
    imageSrc:
      "https://www.panchshil.com/asset/images/banners/trump-towers-banner-370963954.webp",
    title: "Crafting Exceptional Spaces Since 2002",
    description:
      "From homes to commercial destinations, from India to global shores-we build more than structures. We shape lifestyles, communities and legacies.",
  },
  stats: [
    {
      value: 35,
      suffix: "+",
      label: "Sq. Ft. Delivered",
    },
    {
      value: 40,
      suffix: "+",
      label: "Sq. Ft. Under Construction",
    },
    {
      value: 3,
      suffix: "+",
      label: "Countries Present In",
    },
    {
      value: 5,
      suffix: "+",
      label: "Asset Classes",
    },
  ],
  visibleImpact: {
    title: "",
    description: (
      <div className="flex flex-col gap-4">
        <p>
          We dared to dream big, a dream to create not just homes but lifestyles
          to create integrated workspaces and enliven hospitality with luxury.
          Our approach focuses on planned development, creating value assets for
          the city and becoming industry leaders in real estate. Over the years,
          our dreams have come true, our properties have become landmarks in
          Pune. We&apos;ve introduced not only the best construction practices
          but also brought the world&apos;s top brands to Pune, changing the
          city&apos;s skyline.
        </p>
        <p>
          The credit for our success goes to our partners, investors, clients
          and our team, each playing a role in making us one of India&apos;s
          finest luxury real estate brands. The road ahead is long and exciting,
          with many more milestones to establish. However every milestone take
          us back to where our story began: a vision, a dream and now a reality.
        </p>
        <div className="mt-6">
          <p className="font-display-semi text-black text-lg">ATUL CHORDIA,</p>
          <p className="text-sm text-black/80">Chairman, Panchshil Realty</p>
        </div>
      </div>
    ),
    points: [],
    imageSrc: "/assets/images/about/atul-chordia-chairman.png", // Using dummy image
    imageAlt: "Atul Chordia, Chairman, Panchshil Realty",
  },
  milestones: {
    title: "GROWTH CHRONICLES",
    subtitle: "",
    milestones: [
      {
        year: "2024",
        title: "LANDMARK DELIVERIES",
        description: [
          {
            title: "January",
            content:
              "Several iconic projects were completed and delivered, creating new landmarks in Pune. Our commitment to quality construction and timely delivery earned us industry recognition.",
            imageSrc: "/assets/images/about/growth-chronicles-2024.png",
          },
          {
            title: "January",
            content:
              "Several iconic projects were completed and delivered, creating new landmarks in Pune. Our commitment to quality construction and timely delivery earned us industry recognition.",
            imageSrc: "/assets/images/about/growth-chronicles-2024.png",
          },
          {
            title: "January",
            content:
              "Several iconic projects were completed and delivered, creating new landmarks in Pune. Our commitment to quality construction and timely delivery earned us industry recognition.",
            imageSrc: "/assets/images/about/growth-chronicles-2024.png",
          },
        ],
        imageSrc: "/assets/images/about/growth-chronicles-2024.png",
        imageAlt: "Landmark project deliveries in 2015",
      },
      {
        year: "2025",
        title: "GLOBAL EXPANSION",
        description: [
          {
            title: "January",
            content:
              "Panchshil expanded beyond India with projects in Dubai, Maldives, and Sri Lanka, bringing Indian luxury real estate expertise to international markets and global design sensibilities to every address.",
            imageSrc: "/assets/images/about/growth-chronicles-2025.png",
          },
          {
            title: "January",
            content:
              "Panchshil expanded beyond India with projects in Dubai, Maldives, and Sri Lanka, bringing Indian luxury real estate expertise to international markets and global design sensibilities to every address.",
            imageSrc: "/assets/images/about/growth-chronicles-2025.png",
          },
          {
            title: "January",
            content:
              "Panchshil expanded beyond India with projects in Dubai, Maldives, and Sri Lanka, bringing Indian luxury real estate expertise to international markets and global design sensibilities to every address.",
            imageSrc: "/assets/images/about/growth-chronicles-2025.png",
          },
        ],
        imageSrc: "/assets/images/about/growth-chronicles-2024.png",
        imageAlt: "Global expansion in 2020",
      },
      {
        year: "2026",
        title: "TODAY & BEYOND",
        description: [
          {
            title: "January",
            content:
              "With over 35 million sq. ft. delivered and 40 million sq. ft. under construction across 3 countries, we continue to build legacies, shape lifestyles, and create integrated communities that stand the test of time.",
            imageSrc: "/assets/images/about/growth-chronicles-2026.png",
          },
          {
            title: "January",
            content:
              "With over 35 million sq. ft. delivered and 40 million sq. ft. under construction across 3 countries, we continue to build legacies, shape lifestyles, and create integrated communities that stand the test of time.",
            imageSrc: "/assets/images/about/growth-chronicles-2026.png",
          },
          {
            title: "January",
            content:
              "With over 35 million sq. ft. delivered and 40 million sq. ft. under construction across 3 countries, we continue to build legacies, shape lifestyles, and create integrated communities that stand the test of time.",
            imageSrc: "/assets/images/about/growth-chronicles-2026.png",
          },
        ],
        imageSrc: "/assets/images/about/growth-chronicles-2024.png",
        imageAlt: "Panchshil today and future vision",
      },
    ],
  },
  sustainability: {
    slides: [
      {
        imageSrc: "/assets/images/esg/esg-hero-banner.png",
        title: "CARING FOR PEOPLE, PLANET & LEGACY\nOUR SUSTAINABILITY PROMISE",
        description:
          "At panchshil, growth isn't just about building landmark structures, it's about creating enduring value for communities, environment and the future. Our commitment extends beyond architecture and urban infrastructure, it's rooted in sustainable development, ethical governance and a people first culture",
        ctaLabel: "Visit ESG Page",
        ctaHref: "/esg",
      },
    ],
  },
  ourValuedClients: [
    {
      property_key_tenant_caption: "ABS",
      property_key_tenant_image: "/assets/images/about/clients-ABS.png",
    },
    {
      property_key_tenant_caption: "ABFRL",
      property_key_tenant_image: "/assets/images/about/clients-ABFRL.png",
    },
    {
      property_key_tenant_caption: "ADLER",
      property_key_tenant_image: "/assets/images/about/clients-ADLER.png",
    },
    {
      property_key_tenant_caption: "AFFINITY",
      property_key_tenant_image: "/assets/images/about/clients-affinity.png",
    },
  ],
  alliances: {
    title: "ALLIANCES THAT SHAPE OUR WORK",
    tabs: [
      {
        tabLabel: "INSTITUTIONAL PARTNERS",
        slides: [
          {
            title: "Blackstone",
            description:
              "Blackstone is one of the world's leading investment firms that seek to create positive economic impact and long term value for its investors, the companies it invests in and the communities in which it works. Blackstone's global business platform encompasses private equity and real estate funds, hedge find solutions and credit funds",
            linkLabel: "Read More",
            linkHref: "#",
          },
          {
            title: "Blackstone",
            description:
              "Blackstone is one of the world's leading investment firms that seek to create positive economic impact and long term value for its investors, the companies it invests in and the communities in which it works. Blackstone's global business platform encompasses private equity and real estate funds, hedge find solutions and credit funds",
            linkLabel: "Read More",
            linkHref: "#",
          },
          {
            title: "Blackstone",
            description:
              "Blackstone is one of the world's leading investment firms that seek to create positive economic impact and long term value for its investors, the companies it invests in and the communities in which it works. Blackstone's global business platform encompasses private equity and real estate funds, hedge find solutions and credit funds",
            linkLabel: "Read More",
            linkHref: "#",
          },
        ],
      },
      {
        tabLabel: "HOSPITALITY BRAND PARTNERS",
        slides: [
          {
            title: "Marriott",
            description:
              "Marriott International, Inc. is based in Bethesda, Maryland, USA, and encompasses a portfolio of more than 8,000 properties under 30 leading brands spanning 139 countries and territories.",
            linkLabel: "Read More",
            linkHref: "#",
          },
        ],
      },
      {
        tabLabel: "BRAND ASSOCIATION",
        slides: [
          {
            title: "Trump",
            description:
              "The Trump Organization is a group of about 250 entities, all of which use Donald Trump's name and are owned by him.",
            linkLabel: "Read More",
            linkHref: "#",
          },
        ],
      },
    ],
  },
  metaData: {},
};
