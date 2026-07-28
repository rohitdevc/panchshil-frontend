import {
  CareerFitInBannerContent,
  CareerHeroContent,
  CareerTracksContent,
  CareerVisibleImpactContent,
  CareerPageData,
} from "../career-page.data";

export type TeamsThatMakeProjectContent = {
  title: string;
  tabs: Array<{
    tabLabel: string;
    slides: Array<{
      description: string;
      imageSrc: string;
      imageAlt: string;
    }>;
  }>;
};

export type LifeAtPanchshilPageData = {
  hero: CareerHeroContent;
  stats: Array<{
    value: number;
    suffix?: string;
    label: string;
  }>;
  visibleImpact: CareerVisibleImpactContent;
  careerTracks: CareerTracksContent;
  teamsThatMakeProject: TeamsThatMakeProjectContent;
  howPeopleGrow: {
    heading: string;
    title: string;
    description: string;
    defaultOpen: number;
    items: Array<{
      id: number;
      title: string;
      description: string;
      imageSrc: string;
      imageAlt: string;
    }>;
  };
  everydayLife: {
    heading: string;
    title: string;
    description: string;
    slides: Array<{
      imageSrc: string;
      imageAlt: string;
      caption: string;
    }>;
  };
  residentsVoices: {
    heading: string;
    title: string;
    description: string;
    testimonials: Array<{
      quote: string;
      details: string;
      author: string;
      role: string;
      avatarSrc: string;
      avatarAlt: string;
    }>;
  };
  fitInBanner: CareerFitInBannerContent;
};

export const lifeAtPanchshilPageData: LifeAtPanchshilPageData = {
  hero: {
    imageSrc: "/assets/images/career/build-career-that-shape-cities.png",
    title: "Life At Panchshil",
    description:
      "A culture built on ownership, discipline and collaboration where people work on real, complex projects and see the impact of their contribution every day.",
    primaryCta: {
      label: "Explore Career Opportunities",
      href: "/careers/search",
    },
  },
  stats: CareerPageData.stats,
  visibleImpact: {
    ...CareerPageData.visibleImpact,
    title: "A WORK CULTURE THAT BUILDS PEOPLE",
    description:
      "Life at Panchshil goes beyond job titles. Across offices, project sites and hospitality destinations, teams work with trust, accountability and shared ambition.",
    points: [
      "Work with experienced mentors and high-performing cross-functional teams.",
      "Take ownership from planning to execution on projects with visible scale.",
      "Grow in an environment that values clarity, consistency and contribution.",
    ],
    imageAlt: "Life at Panchshil team culture",
  },
  careerTracks: {
    ...CareerPageData.careerTracks,
    heading: "INSIDE THE CULTURE",
    subHeading: "HOW LIFE AT PANCHSHIL FEELS",
    description:
      "Every function contributes to one shared standard: deliver exceptional spaces and experiences with discipline and pride.",
  },
  teamsThatMakeProject: {
    title: "TEAMS THAT MAKE PROJECT HAPPEN",
    tabs: [
      {
        tabLabel: "DESIGN & PLANNING",
        slides: [
          {
            description:
              "From concept layouts to last mile coordination with site teams, design and planning roles balance creativity with technical feasibility and timelines.",
            imageSrc: "/assets/images/career/teams-that-make-project.png",
            imageAlt: "Design and planning team project",
          },
        ],
      },
      {
        tabLabel: "CONSTRUCTION & PROJECT MANAGEMENT",
        slides: [
          {
            description:
              "Construction and project management teams drive execution quality, vendor coordination and milestone delivery across every phase of development.",
            imageSrc: "/assets/images/career/teams-that-make-project.png",
            imageAlt: "Construction and project management team",
          },
        ],
      },
      {
        tabLabel: "LEASING SALES & CLIENT ADVISORY",
        slides: [
          {
            description:
              "Leasing, sales and client advisory teams create lasting relationships by aligning occupier needs with the right Panchshil environments.",
            imageSrc: "/assets/images/career/teams-that-make-project.png",
            imageAlt: "Leasing sales and client advisory team",
          },
        ],
      },
      {
        tabLabel: "OPERATIONS & FACILITIES",
        slides: [
          {
            description:
              "Operations and facilities teams ensure seamless daily experiences through disciplined maintenance, safety and service excellence.",
            imageSrc: "/assets/images/career/teams-that-make-project.png",
            imageAlt: "Operations and facilities team",
          },
        ],
      },
    ],
  },
  howPeopleGrow: {
    heading: "LOREM IPSUM",
    title: "HOW PEOPLE GROW HERE",
    description:
      "Growth at Panchshil is driven by exposure, performance and readiness not just tenure. People work on large, complex developments where there is always something to learn, and are given feedback on how they can move to the next level.",
    defaultOpen: 3,
    items: [
      {
        id: 1,
        title: "Exposure",
        description:
          "Teams gain exposure by working across planning, execution and operational responsibilities.",
        imageSrc: "/assets/images/career/countryyard-banner.png",
        imageAlt: "Exposure at Panchshil",
      },
      {
        id: 2,
        title: "Cross Functional Work",
        description:
          "People collaborate across departments to solve practical problems and deliver measurable outcomes.",
        imageSrc: "/assets/images/career/countryyard-banner.png",
        imageAlt: "Cross functional collaboration",
      },
      {
        id: 3,
        title: "On The Job Learning",
        description: "Hands-on involvement in live projects and operations.",
        imageSrc: "/assets/images/career/countryyard-banner.png",
        imageAlt: "On the job learning at Panchshil",
      },
      {
        id: 4,
        title: "Structured Inputs",
        description:
          "Structured reviews and role-based guidance support steady capability building.",
        imageSrc: "/assets/images/career/countryyard-banner.png",
        imageAlt: "Structured inputs and mentoring",
      },
      {
        id: 5,
        title: "Performance Conversations",
        description:
          "Regular performance conversations align individual growth with team goals.",
        imageSrc: "/assets/images/career/countryyard-banner.png",
        imageAlt: "Performance conversations",
      },
      {
        id: 6,
        title: "Internal Moves",
        description:
          "Internal mobility creates opportunities to explore new challenges and career paths.",
        imageSrc: "/assets/images/career/countryyard-banner.png",
        imageAlt: "Internal career moves",
      },
    ],
  },
  everydayLife: {
    heading: "LOREM IPSUM",
    title: "EVERYDAY LIFE AT PANCHSHIL",
    description:
      "From design reviews and site walks to client presentations and community initiatives, everyday work combines structured routines with problem solving and coordination",
    slides: [
      {
        imageSrc: "/assets/images/career/teams-that-make-project.png",
        imageAlt: "Everyday life at Panchshil",
        caption:
          "Design And Project Teams Reviewing Plans For A New Office Park.",
      },
    ],
  },
  residentsVoices: {
    heading: "LOREM IPSUM",
    title: "HEAR FROM OUR RESIDENTS DIRECTLY",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    testimonials: [
      {
        quote:
          "Trump Towers Pune is one of the first buildings I have seen anywhere in the emerging world, where you could transplant it from Pune and put in into New York or London, and finishes would be on par with the best residential finishes I have seen anywhere in the world.",
        details:
          "I actually bought my whole team, friends and partners so that they could witness it. And they know, this is the standard that they are competing against which is not easy.",
        author: "Donald Trump Jr",
        role: "Executive Vice President, Trump Organisation",
        avatarSrc: "/assets/images/career/user-thumb-career.png",
        avatarAlt: "Resident testimonial profile",
      },
      {
        quote:
          "Trump Towers Pune is one of the first buildings I have seen anywhere in the emerging world, where you could transplant it from Pune and put in into New York or London, and finishes would be on par with the best residential finishes I have seen anywhere in the world.",
        details:
          "I actually bought my whole team, friends and partners so that they could witness it. And they know, this is the standard that they are competing against which is not easy.",
        author: "Donald Trump Jr",
        role: "Executive Vice President, Trump Organisation",
        avatarSrc: "/assets/images/career/user-thumb-career.png",
        avatarAlt: "Resident testimonial profile",
      },
      {
        quote:
          "Trump Towers Pune is one of the first buildings I have seen anywhere in the emerging world, where you could transplant it from Pune and put in into New York or London, and finishes would be on par with the best residential finishes I have seen anywhere in the world.",
        details:
          "I actually bought my whole team, friends and partners so that they could witness it. And they know, this is the standard that they are competing against which is not easy.",
        author: "Donald Trump Jr",
        role: "Executive Vice President, Trump Organisation",
        avatarSrc: "/assets/images/career/user-thumb-career.png",
        avatarAlt: "Resident testimonial profile",
      },
    ],
  },
  fitInBanner: {
    ...CareerPageData.fitInBanner,
    imageSrc: "/assets/images/career/ready-to-see-where-you-fit-in.png",
    title:
      "IF THIS SOUNDS LIKE AN ENVIRONMENT YOU’D LIKE TO GROW IN, TAKE A LOOK AT CURRENT OPPORTUNITIES.",
    primaryCtaLabel: "Explore Career Opportunities",
    primaryCtaHref: "/careers/search",
    secondaryCtaLabel: "Return To Career Overview",
    secondaryCtaHref: "/careers",
  },
};
