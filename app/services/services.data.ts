import type {
  MasterSliderData,
  PropertyDefiningFeaturesSectionType,
} from "@/interfaces";
import type { ServicesIntroData, ServiceItem } from "@/interfaces";

export type ServicesPageDummyData = {
  servicesIntroData: ServicesIntroData;
  servicesData: ServiceItem[];
};

export const servicesPageDummyData: ServicesPageDummyData = {
  servicesIntroData: {
    services_headling:
      "WHETHER BUILDING NEW DESTINATIONS OR SUPPORTING EXISTING DEVELOPMENTS, OUR FOCUS REMAINS THE SAME: THOUGHTFUL EXECUTION, EFFICIENT DELIVERY AND ENDURING VALUE.",
    services_description:
      "Panchshil offers integrated services across every stage of the real estate lifecycle from planning and development to construction oversight, fit out execution and longterm operational management. Our approach ensures consistency, accountability and quality across all asset classes, supporting our clients, residents and partners with a single point of ownership and expertise.",
  },
  servicesData: [],
};

export const servicesHeroSlide: MasterSliderData = {
  master_slider_title: "Our Services",
  master_slider_description:
    "Expertise across the full lifecycle of real estate from planning and construction to handover, operations and longterm value management.",
  master_slider_link: "",
  master_slider_image:
    "https://www.panchshil.com/asset/images/banners/trump-towers-banner-370963954.webp",
  master_slider_video: "",
  master_slider_button_caption: "",
};

export const servicesIntro = {
  title:
    "WHETHER BUILDING NEW DESTINATIONS OR SUPPORTING EXISTING DEVELOPMENTS, OUR FOCUS REMAINS THE SAME: THOUGHTFUL EXECUTION, EFFICIENT DELIVERY AND ENDURING VALUE.",
  subtitle:
    "Panchshil offers integrated services across every stage of the real estate lifecycle from planning and development to construction oversight, fit out execution and longterm operational management. Our approach ensures consistency, accountability and quality across all asset classes, supporting our clients, residents and partners with a single point of ownership and expertise.",
};

// Uses `WhatSetsApart` (PropertyDefiningFeaturesSectionType) as the section renderer.
export const servicesSections: PropertyDefiningFeaturesSectionType[] = [
  {
    property_defining_features_caption: "DEVELOPMENT MANAGEMENT SERVICE",
    property_defining_features_description:
      "We oversee the full development lifecycle-aligning design intent, cost planning, construction strategy and delivery to ensure every project reflects Panchshil’s long term vision and standards.",
    property_defining_features_subcaption: "OUR CAPABILITIES INCLUDE",
    property_defining_features_layout: "imageLeft",
    property_defining_features_thumbnail:
      "/assets/images/services/development-service.png",
    property_defining_features_cta: {
      label: "Connect With Us",
      href: "",
    },
    property_defining_features: [
      { property_defining_feature_caption: "Feasibility & Project Scoping" },
      {
        property_defining_feature_caption:
          "Stakeholder and design consultant coordination",
      },
      {
        property_defining_feature_caption:
          "Cost planning and procurement support",
      },
      { property_defining_feature_caption: "Quality audits and compliance" },
      {
        property_defining_feature_caption:
          "Delivery oversight and handover process",
      },
    ],
  },
  {
    property_defining_features_caption: "PROJECT MANAGEMENT",
    property_defining_features_description:
      "A structured approach to timelines, coordination, budgets and approvals ensuring predictable delivery without any compromise on quality.",
    property_defining_features_subcaption: "OUR CAPABILITIES INCLUDE",
    property_defining_features_layout: "imageLeft",
    property_defining_features_thumbnail:
      "/assets/images/services/project-management-service.png",
    property_defining_features_cta: {
      label: "Connect With Us",
      href: "/contact-us",
    },
    property_defining_features: [
      {
        property_defining_feature_caption: "Project scheduling and programming",
      },
      {
        property_defining_feature_caption: "Vendor and contract coordination",
      },
      { property_defining_feature_caption: "Budget and progress reporting" },
      { property_defining_feature_caption: "Site audits and quality control" },
      { property_defining_feature_caption: "Risk and change management" },
    ],
  },
  {
    property_defining_features_caption: "FACILITY MANAGEMENT",
    property_defining_features_description:
      "Operational stewardship covering maintenance, services, safety and experience ensuring buildings perform efficiently long after delivery.",
    property_defining_features_subcaption: "OUR CAPABILITIES INCLUDE",
    property_defining_features_layout: "imageLeft",
    property_defining_features_thumbnail:
      "/assets/images/services/facility-managment-service.png",
    property_defining_features_cta: {
      label: "Connect With Us",
      href: "/contact-us",
    },
    property_defining_features: [
      {
        property_defining_feature_caption:
          "Preventive and reactive maintenance",
      },
      { property_defining_feature_caption: "Energy and utilities management" },
      {
        property_defining_feature_caption: "Securities and access systems",
      },
      { property_defining_feature_caption: "Housekeeping and soft services" },
      {
        property_defining_feature_caption:
          "Asset performance lifecycle reporting",
      },
    ],
  },
  {
    property_defining_features_caption: "FIT OUT MANAGEMENT",
    property_defining_features_description:
      "Turnkey interior execution that brings architectural intent and functional design to life, managing specialists, timelines and approvals.",
    property_defining_features_subcaption: "OUR CAPABILITIES INCLUDE",
    property_defining_features_layout: "imageLeft",
    property_defining_features_thumbnail:
      "/assets/images/services/fit-out-service.png",
    property_defining_features_cta: {
      label: "Connect With Us",
      href: "/contact-us",
    },
    property_defining_features: [
      {
        property_defining_feature_caption:
          "Space planning and execution oversight",
      },
      {
        property_defining_feature_caption: "Vendor and contractor onboarding",
      },
      {
        property_defining_feature_caption: "Material and finish validation",
      },
      { property_defining_feature_caption: "Handover and snag management" },
      {
        property_defining_feature_caption:
          "Compliance and certification support",
      },
    ],
  },
  {
    property_defining_features_caption: "RESIDENTIAL LEASING AND RESALE",
    property_defining_features_description:
      "Support throughout the ownership journey-from leasing assistance to resale guidance, documentation handling and onboarding.",
    property_defining_features_subcaption: "OUR CAPABILITIES INCLUDE",
    property_defining_features_layout: "imageLeft",
    property_defining_features_thumbnail:
      "/assets/images/services/residental-service.png",
    property_defining_features_cta: {
      label: "Connect With Us",
      href: "/contact-us",
    },
    property_defining_features: [
      {
        property_defining_feature_caption:
          "Leasing advisory and tenant onboarding",
      },
      {
        property_defining_feature_caption:
          "Resale assistance and documentation",
      },
      { property_defining_feature_caption: "Post possession support" },
      {
        property_defining_feature_caption:
          "Coordination with legal and compliance team",
      },
      {
        property_defining_feature_caption: "Customer experience management",
      },
    ],
  },
];
