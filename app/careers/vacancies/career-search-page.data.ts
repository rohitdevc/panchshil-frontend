import type { CareerHeroContent } from "../career-page.data";

export type CareerSearchJobSection = {
  id: string;
  label: string;
  title: string;
  paragraphs?: string[];
  points?: string[];
};

export type CareerSearchJob = {
  id: string;
  title: string;
  employmentType: string;
  location: string;
  department: string;
  skills: string[];
  functionArea: string;
  experienceLevel: string;
  summary: string;
  applyHref: string;
  learnMoreHref: string;
  sections: CareerSearchJobSection[];
};

export type CareerSearchPageData = {
  hero: CareerHeroContent;
  jobs: CareerSearchJob[];
  itemsPerPage: number;
};

export const careerSearchPageData: CareerSearchPageData = {
  hero: {
    imageSrc: "/assets/images/career/build-career-that-shape-cities.png",
    title: "Build The Future With Panchshil Realty",
    description:
      "Join a team that shapes skylines, builds communities and redefines real-estate excellence.",
    primaryCta: {
      label: "Search Open Positions",
      href: "#job-listings",
    },
    secondaryCta: {
      label: "Discover Life @ Panchshil",
      href: "/careers/life-at-panchshil",
    },
  },
  itemsPerPage: 4,
  jobs: [
    {
      id: "senior-sales-manager",
      title: "Senior Sales Manager For Residential & Commercial",
      employmentType: "Full Time",
      location: "Pune, India",
      department: "Sales & Marketing Department",
      skills: ["Sales", "Client Relationship", "Negotiation"],
      functionArea: "Sales & Marketing",
      experienceLevel: "5-7 Years",
      summary:
        "Generate and manage leads from residential and commercial campaigns.",
      applyHref: "#",
      learnMoreHref: "#",
      sections: [
        {
          id: "job-description",
          label: "Job Description",
          title: "Job Description",
          paragraphs: [
            "We are looking for an experienced senior sales manager to drive residential and commercial real estate sales across Panchshil's growing portfolio.",
            "The ideal candidate brings a strong understanding of high-value customer relationships, a consultative sales approach and the ability to work cross-functionally with marketing, product and customer experience teams.",
          ],
        },
        {
          id: "key-responsibility",
          label: "Key Responsibility",
          title: "Key Responsibilities",
          points: [
            "Lead sales growth across assigned residential or commercial developments.",
            "Manage inbound and qualified leads, ensuring timely follow-ups and consistent engagement.",
            "Conduct project walkthroughs, presentations and negotiations with high-value prospects.",
            "Track performance metrics and prepare periodic reports for leadership review.",
          ],
        },
        {
          id: "who-you-are",
          label: "Who You Are",
          title: "Who You Are",
          points: [
            "5-7 years of real estate experience, luxury or premium segment preferred.",
            "Strong communication, negotiations and client relationship management skills.",
            "Comfortable working independently while collaborating with cross-functional teams.",
          ],
        },
        {
          id: "company-benefits",
          label: "Company & Benefits",
          title: "Company & Benefits",
          points: [
            "Competitive compensation and performance-linked incentives.",
            "Exposure to landmark projects across residential, hospitality and office parks.",
            "Learning and development support through on-ground experience and mentorship.",
          ],
        },
        {
          id: "about-panchshil",
          label: "About Panchshil",
          title: "About Panchshil",
          paragraphs: [
            "Panchshil Realty is one of India's leading luxury real estate developers with over two decades of experience in delivering landmark communities and destinations.",
            "Our work reflects a commitment to innovation, integrity and long-term value for residents, partners and communities.",
          ],
        },
      ],
    },
    {
      id: "assistant-project-manager",
      title: "Assistant Project Manager - Construction Execution",
      employmentType: "Full Time",
      location: "Pune, India",
      department: "Project Management",
      skills: ["Project Planning", "Construction", "Execution"],
      functionArea: "Project Management",
      experienceLevel: "3-5 Years",
      summary:
        "Coordinate planning, site execution and reporting for mixed-use developments.",
      applyHref: "#",
      learnMoreHref: "#",
      sections: [
        {
          id: "job-description",
          label: "Job Description",
          title: "Job Description",
          paragraphs: [
            "You will support project leadership in coordinating timelines, vendors, consultants and site teams for premium real estate projects.",
          ],
        },
        {
          id: "key-responsibility",
          label: "Key Responsibility",
          title: "Key Responsibilities",
          points: [
            "Track schedules, site progress and quality milestones.",
            "Coordinate contractor meetings and daily execution priorities.",
            "Escalate risks early and support issue resolution plans.",
          ],
        },
        {
          id: "who-you-are",
          label: "Who You Are",
          title: "Who You Are",
          points: [
            "3-5 years in construction or project coordination roles.",
            "Strong documentation, planning and follow-through discipline.",
          ],
        },
      ],
    },
    {
      id: "workplace-experience-lead",
      title: "Workplace Experience Lead",
      employmentType: "Full Time",
      location: "Pune, India",
      department: "Operations & Facilities",
      skills: [
        "Facility Operations",
        "Workplace Services",
        "Vendor Management",
      ],
      functionArea: "Operations",
      experienceLevel: "4-6 Years",
      summary:
        "Own occupier experience, amenities performance and service quality standards.",
      applyHref: "#",
      learnMoreHref: "#",
      sections: [
        {
          id: "job-description",
          label: "Job Description",
          title: "Job Description",
          paragraphs: [
            "You will shape day-to-day workplace experience in high-performance office campuses and premium properties.",
          ],
        },
        {
          id: "key-responsibility",
          label: "Key Responsibility",
          title: "Key Responsibilities",
          points: [
            "Define service standards and oversee partner delivery.",
            "Coordinate with security, housekeeping and engineering teams.",
            "Use feedback loops to improve occupier satisfaction.",
          ],
        },
      ],
    },
    {
      id: "esg-associate",
      title: "ESG Associate - Sustainability & Compliance",
      employmentType: "Full Time",
      location: "Pune, India",
      department: "ESG & Quality",
      skills: ["Sustainability", "Compliance", "ESG Reporting"],
      functionArea: "ESG & Quality",
      experienceLevel: "3-6 Years",
      summary:
        "Support sustainability initiatives, reporting and compliance for live assets.",
      applyHref: "#",
      learnMoreHref: "#",
      sections: [
        {
          id: "job-description",
          label: "Job Description",
          title: "Job Description",
          paragraphs: [
            "This role supports ESG strategy execution across energy, water, waste and governance priorities.",
          ],
        },
        {
          id: "key-responsibility",
          label: "Key Responsibility",
          title: "Key Responsibilities",
          points: [
            "Collect and validate asset-level ESG data.",
            "Support audits, certifications and annual reporting cycles.",
            "Partner with operations teams to improve sustainability outcomes.",
          ],
        },
      ],
    },
    {
      id: "leasing-manager",
      title: "Leasing Manager - Commercial Portfolio",
      employmentType: "Full Time",
      location: "Mumbai, India",
      department: "Leasing & Client Advisory",
      skills: ["Leasing", "Market Research", "Client Advisory"],
      functionArea: "Leasing",
      experienceLevel: "6-8 Years",
      summary:
        "Drive leasing outcomes through market intelligence and client partnerships.",
      applyHref: "#",
      learnMoreHref: "#",
      sections: [
        {
          id: "job-description",
          label: "Job Description",
          title: "Job Description",
          paragraphs: [
            "Lead prospecting and closure activities for office parks and mixed-use developments.",
          ],
        },
      ],
    },
    {
      id: "architect-interiors",
      title: "Architect - Design & Interiors",
      employmentType: "Full Time",
      location: "Pune, India",
      department: "Design & Architecture",
      skills: ["Architecture", "Interior Design", "AutoCAD"],
      functionArea: "Design",
      experienceLevel: "3-5 Years",
      summary:
        "Develop design concepts and execution details for premium living environments.",
      applyHref: "#",
      learnMoreHref: "#",
      sections: [
        {
          id: "job-description",
          label: "Job Description",
          title: "Job Description",
          paragraphs: [
            "Work with internal and external teams to deliver coherent, high-quality design outcomes from concept to execution.",
          ],
        },
      ],
    },
    {
      id: "talent-acquisition-specialist",
      title: "Talent Acquisition Specialist",
      employmentType: "Full Time",
      location: "Pune, India",
      department: "Human Resources",
      skills: ["Talent Acquisition", "Interviewing", "Stakeholder Management"],
      functionArea: "Human Resources",
      experienceLevel: "2-4 Years",
      summary:
        "Manage end-to-end hiring across corporate and project-facing functions.",
      applyHref: "#",
      learnMoreHref: "#",
      sections: [
        {
          id: "job-description",
          label: "Job Description",
          title: "Job Description",
          paragraphs: [
            "Partner with business leaders to build hiring pipelines for critical roles.",
          ],
        },
      ],
    },
    {
      id: "finance-analyst",
      title: "Finance Analyst - Projects & Assets",
      employmentType: "Full Time",
      location: "Pune, India",
      department: "Finance",
      skills: ["Financial Analysis", "Budgeting", "Reporting"],
      functionArea: "Finance",
      experienceLevel: "3-5 Years",
      summary:
        "Deliver project finance analysis, forecasts and management reporting.",
      applyHref: "#",
      learnMoreHref: "#",
      sections: [
        {
          id: "job-description",
          label: "Job Description",
          title: "Job Description",
          paragraphs: [
            "Support budgeting, forecasting and variance analysis for development and operating assets.",
          ],
        },
      ],
    },
    {
      id: "frontend-engineer",
      title: "Frontend Engineer - Digital Experience",
      employmentType: "Full Time",
      location: "Pune, India",
      department: "Technology",
      skills: ["React", "TypeScript", "Performance Optimization"],
      functionArea: "Technology",
      experienceLevel: "2-5 Years",
      summary:
        "Build and optimize customer-facing web experiences for premium brands.",
      applyHref: "#",
      learnMoreHref: "#",
      sections: [
        {
          id: "job-description",
          label: "Job Description",
          title: "Job Description",
          paragraphs: [
            "Create performant, scalable web interfaces that support business growth and customer engagement.",
          ],
        },
      ],
    },
  ],
};
