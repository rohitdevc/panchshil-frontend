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
  readTime: string;
  source: string;
  description: string;
  link: string;
};

export type MediaPageData = {
  hero: CareerHeroContent;
  intro: {
    heading: string;
    paragraphs: string[];
    imageSrc: string;
    imageAlt: string;
  };
  stats: MediaStat[];
  benefits: {
    heading: string;
    items: MediaCard[];
  };
  howItWorks: {
    heading: string;
    description: string;
    steps: MediaStep[];
  };
  testimonials: {
    heading: string;
    items: MediaTestimonial[];
  };
  faqs: {
    kicker: string;
    heading: string;
    items: MediaFaq[];
  };
  cta: {
    heading: string;
    description: string;
    primaryCta: {
      label: string;
      href: string;
    };
  };
  featuredArticles: {
    kicker: string;
    heading: string;
    articles: FeaturedArticle[];
  };
  solutionInsights: {
    kicker: string;
    heading: string;
    articles: FeaturedArticle[];
  };
  industryFeatures: {
    kicker: string;
    heading: string;
    articles: FeaturedArticle[];
  };
};

export const emptyMediaIntro: MediaPageData["intro"] = {
  heading: "",
  paragraphs: [],
  imageSrc: "",
  imageAlt: "",
};

export const emptyMediaBenefits: MediaPageData["benefits"] = {
  heading: "",
  items: [],
};

export const emptyMediaFaqs: MediaPageData["faqs"] = {
  kicker: "",
  heading: "",
  items: [],
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
  intro: {
    heading:
      "The Preferred Real Estate Consultants (MEDIA) network is a community of trusted real estate professionals who work closely with Panchshil to support clients across their residential and commercial requirements.",
    paragraphs: [
      "With a growing base of over 800 registered consultants across India and international markets, the MEDIA program enables seamless access to Panchshil properties and real estate support services. MEDIA members bring expertise, market understanding and professionalism to every interaction. Their role is not just transactional-they serve as informed advisors who help clients evaluate opportunities and make confident, long-term decisions. Through transparent processes, structured support and consistent communication the MEDIA network ensures customers receive a smooth and dependable experience from first enquiry to closing.",
      "Panchshil is committed to strengthening this partnership ecosystem and creating meaningful opportunities for consultants and their clients. Becoming a part of MEDIA network offers distinct advantages and access to exclusive resources.",
    ],
    imageSrc: "/assets/images/media-community.png",
    imageAlt: "MEDIA community",
  },
  stats: [
    { value: "150+", label: "Active consultants" },
    { value: "30+", label: "Projects in portfolio" },
    { value: "24–48h", label: "Typical response time" },
    { value: "1", label: "Single coordination desk" },
  ],
  benefits: {
    heading: "Benefits Of Joining The MEDIA Network",
    items: [
      {
        iconSrc: "/assets/images/media/land-area-icon.png",
        iconAlt: "Exclusive residences icon",
        title: "Access To Exclusive Panchshil Residences",
        description:
          "MEDIA members gain access to Panchshil's branded luxury residences and select offerings not available through general market channels. This allows consultants to present clients with differentiated, high quality real estate options supported by design, amenities and long standing value.",
      },
      {
        iconSrc: "/assets/images/media/end-to-end-support.png",
        iconAlt: "End to end support icon",
        title: "End To End Support",
        description:
          "Consultants receive full support throughout the sales or leasing cycle from enquiry handling to closing formalities. Panchshil provides marketing material, project information, guided walkthroughs and coordinated access to the project and sales teams to ensure clarity and smooth execution.",
      },
      {
        iconSrc: "/assets/images/media/training-icon.png",
        iconAlt: "Training and coordination icon",
        title: "Ongoing Training Project And Coordination",
        description:
          "Members of the MEDIA network are invited to recurring training programs conducted by Panchshil teams. These sessions cover new launches, pricing updates, product positioning and key talking points so consultants remain well informed and ready to guide clients with factual up to date insights.",
      },
      {
        iconSrc: "/assets/images/media/land-area-icon.png",
        iconAlt: "Channel sales liaison icon",
        title: "Dedicated Channel Sales Liaison",
        description:
          "MEDIA members receive assistance with cobranded marketing, property listings and communication assets to support lead generation and outreach. Panchshil's customer relations and marketing support teams remain accessible for product queries and post sale requirements.",
      },
      {
        iconSrc: "/assets/images/media/end-to-end-support.png",
        iconAlt: "Sales and marketing enablement icon",
        title: "Sales And Marketing Enablement",
        description:
          "MEDIA members receive assistance with cobranded marketing, property listings and communication assets to support lead generation and outreach. Panchshil's customer relations and marketing support teams remain accessible for product queries and post sale requirements.",
      },
      {
        iconSrc: "/assets/images/media/training-icon.png",
        iconAlt: "Invitation only client events icon",
        title: "Invitation Only Clients Events",
        description:
          "Consultants may collaborate with Panchshil in hosting private viewing events and curated client experiences in India and selected international locations. These events help potential buyers engage with brands, explore properties and understand the Panchshil experience directly.",
      },
    ],
  },
  howItWorks: {
    heading: "How it works",
    description: "Simple, structured and built for speed.",
    steps: [
      {
        title: "Apply",
        description:
          "Share your basic profile, operating markets and areas of expertise.",
      },
      {
        title: "Verify & onboard",
        description:
          "We review details, align expectations and add you to the network.",
      },
      {
        title: "Get access",
        description:
          "Receive structured updates, collateral, and a coordination desk for support.",
      },
      {
        title: "Work together",
        description:
          "Coordinate visits, negotiations and closures with transparent processes.",
      },
    ],
  },
  testimonials: {
    heading: "What consultants say",
    items: [
      {
        name: "Consultant A",
        role: "Residential Advisory",
        quote:
          "The updates are consistent and the coordination is quick-it helps us focus on clients instead of follow-ups.",
      },
      {
        name: "Consultant B",
        role: "Commercial Leasing",
        quote:
          "Clear communication, good collateral, and fast answers. The process feels professional end-to-end.",
      },
      {
        name: "Consultant C",
        role: "HNI Advisory",
        quote:
          "Clients apmediaiate the transparency. It’s easier to set expectations and move decisions forward.",
      },
    ],
  },
  faqs: {
    kicker: "",
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "How do I register as a real estate consultant",
        answer:
          "Independent consultants and teams with a track record of professional conduct and client-first advisory.",
      },
      {
        question: "Is RERA registration mandatory to work as a MEDIA?",
        answer:
          "Yes, as per applicable laws a valid RERA registration is required.",
      },
      {
        question: "How long does onboarding typically take?",
        answer:
          "Typically 3–7 business days depending on verification and documentation.",
      },
      {
        question: "Do consultants get access to pre-launch inventory?",
        answer:
          "Access is shared within the network; select launches may offer priority windows depending on criteria.",
      },
    ],
  },
  cta: {
    heading: "Ready to join MEDIA?",
    description:
      "Submit your details and we’ll reach out with next steps for verification and onboarding.",
    primaryCta: {
      label: "Request an invite",
      href: "#join",
    },
  },
  featuredArticles: {
    kicker: "LOREM IPSUM",
    heading: "FEATURED ARTICLES",
    articles: [
      {
        imageSrc: "/assets/images/media/organised-hawker.png",
        imageAlt: "City Gets Nukkad",
        title: "City Gets “Nukkad” The First Organised Hawkers Pack",
        date: "08Aug, 2025",
        readTime: "05 mins read",
        source: "Hindustan Times",
        description:
          "Nukkad is a well-planned public space built specially for street vendors. The stalls are made from old shipping containers, marrying utility with eco-friendly design.",
        link: "#",
      },
      {
        imageSrc: "/assets/images/media/organised-hawker.png",
        imageAlt: "City Gets Nukkad",
        title: "City Gets “Nukkad” The First Organised Hawkers Pack",
        date: "08Aug, 2025",
        readTime: "05 mins read",
        source: "Hindustan Times",
        description:
          "Nukkad is a well-planned public space built specially for street vendors. The stalls are made from old shipping containers, marrying utility with eco-friendly design.",
        link: "#",
      },
    ],
  },
  solutionInsights: {
    kicker: "LOREM IPSUM",
    heading: "SOLUTION INSIGHTS",
    articles: [
      {
        imageSrc: "/assets/images/media/ventive-hospitality.png",
        imageAlt: "Ventive Hospitality",
        title:
          "Ventive Hospitality Ipo: Blackstone-Backed Firm Raises ₹719.5 Crore From Anchor Investors Ahead Of Public Issue",
        date: "08Aug, 2025",
        readTime: "05 mins read",
        source: "Hindustan Times",
        description:
          "Ventive Hospitality Limited raised ₹719.5 crore from anchor investors ahead of its public issue, according to an exchange filing by the company on Thursday, December 19.",
        link: "#",
      },
      {
        imageSrc: "/assets/images/media/organised-hawker.png",
        imageAlt: "City Gets Nukkad",
        title: "City Gets “Nukkad” The First Organised Hawkers Pack",
        date: "08Aug, 2025",
        readTime: "05 mins read",
        source: "Hindustan Times",
        description:
          "Nukkad is a well-planned public space built specially for street vendors. The stalls are made from old shipping containers, marrying utility with eco-friendly design.",
        link: "#",
      },
      {
        imageSrc: "/assets/images/media/organised-hawker.png",
        imageAlt: "City Gets Nukkad",
        title: "City Gets “Nukkad” The First Organised Hawkers Pack",
        date: "08Aug, 2025",
        readTime: "05 mins read",
        source: "Hindustan Times",
        description:
          "Nukkad is a well-planned public space built specially for street vendors. The stalls are made from old shipping containers, marrying utility with eco-friendly design.",
        link: "#",
      },
    ],
  },
  industryFeatures: {
    kicker: "LOREM IPSUM",
    heading: "INDUSTRY FEATURES",
    articles: [
      {
        imageSrc: "/assets/images/media/ventive-hospitality.png",
        imageAlt: "Ventive Hospitality",
        title:
          "Ventive Hospitality Ipo: Blackstone-Backed Firm Raises ₹719.5 Crore From Anchor Investors Ahead Of Public Issue",
        date: "08Aug, 2025",
        readTime: "05 mins read",
        source: "Hindustan Times",
        description:
          "Ventive Hospitality Limited raised ₹719.5 crore from anchor investors ahead of its public issue, according to an exchange filing by the company on Thursday, December 19.",
        link: "#",
      },
      {
        imageSrc: "/assets/images/media/organised-hawker.png",
        imageAlt: "City Gets Nukkad",
        title: "City Gets “Nukkad” The First Organised Hawkers Pack",
        date: "08Aug, 2025",
        readTime: "05 mins read",
        source: "Hindustan Times",
        description:
          "Nukkad is a well-planned public space built specially for street vendors. The stalls are made from old shipping containers, marrying utility with eco-friendly design.",
        link: "#",
      },
      {
        imageSrc: "/assets/images/media/organised-hawker.png",
        imageAlt: "City Gets Nukkad",
        title: "City Gets “Nukkad” The First Organised Hawkers Pack",
        date: "08Aug, 2025",
        readTime: "05 mins read",
        source: "Hindustan Times",
        description:
          "Nukkad is a well-planned public space built specially for street vendors. The stalls are made from old shipping containers, marrying utility with eco-friendly design.",
        link: "#",
      },
    ],
  },
};
