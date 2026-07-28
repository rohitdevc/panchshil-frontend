export type CareerHeroContent = {
  imageSrc: string;
  title: string | undefined;
  description: string | undefined;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

export type CareerVisibleImpactContent = {
  title: string;
  description: string;
  points: string[];
  imageSrc: string;
  imageAlt: string;
};

export type CareerTrackPost = {
  title: string;
  description: string;
  imageSrc: string;
  ctaLabel: string;
  ctaHref: string;
};

export type CareerTracksContent = {
  heading?: string;
  subHeading: string;
  description: string;
  posts: CareerTrackPost[];
};

export type CareerHowWeWorkItem = {
  title: string;
  description: string;
  iconSrc: string;
};

export type CareerHowWeWorkContent = {
  title: string;
  description: string;
  items: CareerHowWeWorkItem[];
};

export type CareerGrowthSlide = {
  title: string;
  description: string;
  imageSrc: string;
};

export type CareerGrowthExposureContent = {
  heading?: string;
  subHeading: string;
  description: string;
  slides: CareerGrowthSlide[];
};

export type CareerSafetyAwardsContent = {
  heading?: string;
  subHeading: string;
  description: string;
};

export type CareerInsideLifeSlide = {
  title: string;
  imageSrc: string;
};

export type CareerInsideLifeContent = {
  subHeading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  slides: CareerInsideLifeSlide[];
};

export type CareerFitInBannerContent = {
  imageSrc: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export type CareerPageDataProp = {
  hero: CareerHeroContent;
  stats: Array<{
    value: string;
    suffix?: string;
    label: string;
  }>;
  visibleImpact: CareerVisibleImpactContent;
  careerTracks: CareerTracksContent;
  howWeWork: CareerHowWeWorkContent;
  growthExposure: CareerGrowthExposureContent;
  safetyAwards: CareerSafetyAwardsContent;
  insideLife: CareerInsideLifeContent;
  fitInBanner: CareerFitInBannerContent;
  departments: Array<{
    title: string;
    imageSrc: string;
  }>;
};

export const careerPageData: CareerPageDataProp = {
  hero: {
    imageSrc: "/assets/images/career/build-career-that-shape-cities.png",
    title: "Build A Career That Shapes Cities",
    description:
      "Work on landmark office parks, residences and hospitality destinations that redefine real estate across India and beyond. At Panchshil, you don't just contribute to projects, you help build places thousands of people use every day.",
    primaryCta: {
      label: "Explore Career Opportunities",
      href: "#",
    },
    secondaryCta: {
      label: "Discover Life @ Panchshil",
      href: "/careers/life-at-panchshil",
    },
  },
  stats: [
    {
      value: "23",
      suffix: "+",
      label: "Years Of Excellence",
    },
    {
      value: "500",
      suffix: "+",
      label: "Working Professionals",
    },
    {
      value: "50",
      suffix: "mn+",
      label: "Sq.ft. Delivered",
    },
    {
      value: "4",
      label: "International Markets",
    },
  ],
  visibleImpact: {
    title: "WORK THAT HAS VISIBLE IMPACT",
    description:
      "Panchshil careers sit at the intersection of design, engineering, operations and experience. Teamwork on large-scale office parks, high-end residences, data centres, retail streets and hospitality projects that anchor business districts and neighbourhoods.",
    points: [
      "Contribute to projects that shape skylines and daily life.",
      "Collaborate with architects, engineers, operators and brand partners.",
      "See your work move from drawings and plans to real live-in spaces.",
    ],
    imageSrc: "/assets/images/career/work-visible-impact.png",
    imageAlt: "Panchshil team collaborating",
  },
  careerTracks: {
    subHeading: "WHERE YOU CAN BUILD YOUR CAREER",
    description:
      "Roles at panchshil span multiple disciplines. Explore tracks that match your skills and ambitions.",
    posts: [
      {
        title: "Design & Architecture",
        description:
          "Create future ready spaces across residences, office parks and hospitality.",
        imageSrc: "/assets/images/career/design-architecture.png",
        ctaLabel: "Read More",
        ctaHref: "#",
      },
      {
        title: "Construction & Project Management",
        description:
          "Translate plans into reality with disciplined execution on site.",
        imageSrc: "/assets/images/career/construction-project-management.png",
        ctaLabel: "Read More",
        ctaHref: "#",
      },
      {
        title: "Leasing, Sales & Client Advisory",
        description:
          "Help business and residents find the right panchshil address.",
        imageSrc: "/assets/images/career/leasing-sales.png",
        ctaLabel: "Read More",
        ctaHref: "#",
      },
      {
        title: "Operations, Facilities & Workplace Experience",
        description:
          "Keep campuses running safely, efficiently and seamlessly for thousands of people every day.",
        imageSrc: "/assets/images/career/operations-facilities.png",
        ctaLabel: "Read More",
        ctaHref: "#",
      },
      {
        title: "Sustainability, ESG & Quality",
        description:
          "Drive green building certifications, safety standards and governance initiatives across our portfolio.",
        imageSrc: "/assets/images/career/sustainability.png",
        ctaLabel: "Read More",
        ctaHref: "#",
      },
      {
        title: "Corporate, Technology & Enabling Functions",
        description:
          "Support finance, HR, digital, legal and corporate initiatives that keep the organisation moving.",
        imageSrc: "/assets/images/career/corporate-technology.png",
        ctaLabel: "Read More",
        ctaHref: "#",
      },
      {
        title: "All Roles",
        description: "View all available positions across our company.",
        imageSrc: "/assets/images/career/all-roles.png",
        ctaLabel: "Read More",
        ctaHref: "#",
      },
    ],
  },
  howWeWork: {
    title: "HOW WE WORK",
    description:
      "Our culture is built on ownership, discipline and respect. We expect people to think independently, work collaboratively and take responsibility for outcomes.",
    items: [
      {
        title: "Spirit",
        description:
          "A competitive yet respectful environment where teams celebrate wins and learn from challenges.",
        iconSrc: "/assets/images/career/spirit-icon.png",
      },
      {
        title: "Performance",
        description:
          "Clear expectations, measurable goals and recognition for consistent delivery.",
        iconSrc: "/assets/images/career/performance-icon.png",
      },
      {
        title: "Appreciation",
        description:
          "Structured rewards and acknowledgement for people who go beyond their role.",
        iconSrc: "/assets/images/career/appreciation-icon.png",
      },
      {
        title: "Care",
        description:
          "Focus on safety, well-being and work-life balance through policies and programs.",
        iconSrc: "/assets/images/career/care-icon.png",
      },
      {
        title: "Edge",
        description:
          "Continuous learning, certifications and exposure that keep you ahead in a changing industry.",
        iconSrc: "/assets/images/career/edge-icon.png",
      },
    ],
  },
  growthExposure: {
    subHeading: "GROWTH THAT COMES FROM REAL EXPOSURE",
    description:
      "People stay where they see a future, can build skills and trust leadership. At panchshil, growth is driven less by slogans and more by the scale and complexity of work you handle.",
    slides: [
      {
        title: "On The Job Learning",
        description:
          "Cross-functional collaboration on design, execution, ESG and operations.",
        imageSrc: "/assets/images/career/on-the-job-learning.png",
      },
      {
        title: "Training & Certifications",
        description:
          "Support for relevant programs including safety, sustainability and technical skills.",
        imageSrc: "/assets/images/career/training-certification.png",
      },
      {
        title: "Internal Mobility",
        description:
          "Opportunities to explore roles across functions as the organisation grows.",
        imageSrc: "/assets/images/career/internal-mobility.png",
      },
      {
        title: "Work With Visible Impact",
        description:
          "Contribute to outcomes that shape communities and high-performing districts.",
        imageSrc: "/assets/images/career/work-visible-impact.png",
      },
      {
        title: "See Where You Fit In",
        description:
          "Discover opportunities mapped to your strengths, interests and ambitions.",
        imageSrc: "/assets/images/career/ready-to-see-where-you-fit-in.png",
      },
    ],
  },
  safetyAwards: {
    subHeading: "A SAFE, RESPONSIBLE PLACE TO WORK",
    description:
      "Panchshil's office parks and developments are recognised globally for safety and operational standards. Multiple campuses have received the British Safety Council's Sword Of Honour, one of the highest benchmarks for workplace health and safety, across millions of square feet of office space. Our ESG initiatives focus on energy efficiency, water conservation, waste management and responsible construction, guided by a dedicated ESG steering committee.",
  },
  insideLife: {
    subHeading: "INSIDE LIFE @ PANCHSHIL",
    description:
      "From corporate offices to site teams and hospitality properties, life @ panchshil combines structured work with real responsibility. Teams come together to solve problems, deliver large scale developments and maintain experience for thousands of occupants every day.",
    ctaLabel: "EXPLORE LIFE @ PANCHSHIL",
    ctaHref: "/careers/life-at-panchshil",
    slides: [
      {
        title: "Design And Planning Reviews At Our Pune Head Office",
        imageSrc: "/assets/images/career/inside-life.png",
      },
      {
        title: "Cross-Functional Collaboration Across Project Teams",
        imageSrc: "/assets/images/career/on-the-job-learning.png",
      },
      {
        title: "Learning Sessions And Team Workshops",
        imageSrc: "/assets/images/career/training-certification.png",
      },
    ],
  },
  fitInBanner: {
    imageSrc: "/assets/images/career/ready-to-see-where-you-fit-in.png",
    title: "READY TO SEE WHERE YOU FIT IN?",
    description: "",
    primaryCtaLabel: "Explore Career Opportunities",
    primaryCtaHref: "#",
    secondaryCtaLabel: "Discover Life @ Panchshil",
    secondaryCtaHref: "/careers/life-at-panchshil",
  },
  departments: [
    {
      title: "Design & Architecture",
      imageSrc: "/assets/images/career/design-architecture.png",
    },
    {
      title: "Construction & Project Management",
      imageSrc: "/assets/images/career/construction-project-management.png",
    },
    {
      title: "Operations & Facilities",
      imageSrc: "/assets/images/career/operations-facilities.png",
    },
    {
      title: "Corporate Technology",
      imageSrc: "/assets/images/career/corporate-technology.png",
    },
  ],
};
