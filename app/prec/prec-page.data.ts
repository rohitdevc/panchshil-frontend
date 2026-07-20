import { CareerHeroContent } from "@/app/careers/career-page.data";
import { MetaDataProps } from "@/interfaces";

export type PrecStat = {
  value: string;
  label: string;
};

export type PrecCard = {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
};

export type PrecStep = {
  title: string;
  description: string;
};

export type PrecTestimonial = {
  name: string;
  role: string;
  quote: string;
};

export type PrecFaq = {
  question: string;
  answer: string;
};

export type PrecPageData = {
  hero: CareerHeroContent;
  intro: {
    heading: string;
    paragraphs: string[];
    imageSrc: string;
    imageAlt: string;
  };
  stats: PrecStat[];
  benefits: {
    heading: string;
    items: PrecCard[];
  };
  howItWorks: {
    heading: string;
    description: string;
    steps: PrecStep[];
  };
  testimonials: {
    heading: string;
    items: PrecTestimonial[];
  };
  faqs: {
    kicker: string;
    heading: string;
    items: PrecFaq[];
  };
  cta: {
    heading: string;
    description: string;
    primaryCta: {
      label: string;
      href: string;
    };
  };
  metaData: MetaDataProps;
};

export const emptyPrecIntro: PrecPageData["intro"] = {
  heading: "",
  paragraphs: [],
  imageSrc: "",
  imageAlt: "",
};

export const emptyPrecBenefits: PrecPageData["benefits"] = {
  heading: "",
  items: [],
};

export const emptyPrecFaqs: PrecPageData["faqs"] = {
  kicker: "",
  heading: "",
  items: [],
};

export const precPageDummyData: PrecPageData = {
  hero: {
    imageSrc: "/assets/images/career/build-career-that-shape-cities.png",
    title: "Preferred Real Estate Consultants Network",
    description:
      "A trusted community of verified real estate professionals working alongside Panchshil to support clients with informed guidance, exclusive access and seamless transactions.",
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
      "The Preferred Real Estate Consultants (PREC) network is a community of trusted real estate professionals who work closely with Panchshil to support clients across their residential and commercial requirements.",
    paragraphs: [
      "With a growing base of over 800 registered consultants across India and international markets, the PREC program enables seamless access to Panchshil properties and real estate support services. PREC members bring expertise, market understanding and professionalism to every interaction. Their role is not just transactional-they serve as informed advisors who help clients evaluate opportunities and make confident, long-term decisions. Through transparent processes, structured support and consistent communication the PREC network ensures customers receive a smooth and dependable experience from first enquiry to closing.",
      "Panchshil is committed to strengthening this partnership ecosystem and creating meaningful opportunities for consultants and their clients. Becoming a part of PREC network offers distinct advantages and access to exclusive resources.",
    ],
    imageSrc: "/assets/images/prec-community.png",
    imageAlt: "PREC community",
  },
  stats: [
    { value: "150+", label: "Active consultants" },
    { value: "30+", label: "Projects in portfolio" },
    { value: "24–48h", label: "Typical response time" },
    { value: "1", label: "Single coordination desk" },
  ],
  benefits: {
    heading: "Benefits Of Joining The PREC Network",
    items: [
      {
        iconSrc: "/assets/images/prec/land-area-icon.png",
        iconAlt: "Exclusive residences icon",
        title: "Access To Exclusive Panchshil Residences",
        description:
          "PREC members gain access to Panchshil's branded luxury residences and select offerings not available through general market channels. This allows consultants to present clients with differentiated, high quality real estate options supported by design, amenities and long standing value.",
      },
      {
        iconSrc: "/assets/images/prec/end-to-end-support.png",
        iconAlt: "End to end support icon",
        title: "End To End Support",
        description:
          "Consultants receive full support throughout the sales or leasing cycle from enquiry handling to closing formalities. Panchshil provides marketing material, project information, guided walkthroughs and coordinated access to the project and sales teams to ensure clarity and smooth execution.",
      },
      {
        iconSrc: "/assets/images/prec/training-icon.png",
        iconAlt: "Training and coordination icon",
        title: "Ongoing Training Project And Coordination",
        description:
          "Members of the PREC network are invited to recurring training programs conducted by Panchshil teams. These sessions cover new launches, pricing updates, product positioning and key talking points so consultants remain well informed and ready to guide clients with factual up to date insights.",
      },
      {
        iconSrc: "/assets/images/prec/land-area-icon.png",
        iconAlt: "Channel sales liaison icon",
        title: "Dedicated Channel Sales Liaison",
        description:
          "PREC members receive assistance with cobranded marketing, property listings and communication assets to support lead generation and outreach. Panchshil's customer relations and marketing support teams remain accessible for product queries and post sale requirements.",
      },
      {
        iconSrc: "/assets/images/prec/end-to-end-support.png",
        iconAlt: "Sales and marketing enablement icon",
        title: "Sales And Marketing Enablement",
        description:
          "PREC members receive assistance with cobranded marketing, property listings and communication assets to support lead generation and outreach. Panchshil's customer relations and marketing support teams remain accessible for product queries and post sale requirements.",
      },
      {
        iconSrc: "/assets/images/prec/training-icon.png",
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
          "Clients appreciate the transparency. It’s easier to set expectations and move decisions forward.",
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
        question: "Is RERA registration mandatory to work as a PREC?",
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
    heading: "Ready to join PREC?",
    description:
      "Submit your details and we’ll reach out with next steps for verification and onboarding.",
    primaryCta: {
      label: "Request an invite",
      href: "#join",
    },
  },
  metaData: {
    canonical_tag: "https://www.panchshil.com/prec",
    meta_description:
      "Join the Panchshil Preferred Real Estate Consultants (PREC) Network, a community of trusted professionals offering exclusive access to Panchshil properties, comprehensive support, and co-branded marketing opportunities.",
    meta_title:
      "Preferred Real Estate Consultants (PREC) Network | Panchshil Realty",
  },
};
