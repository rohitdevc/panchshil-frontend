import API_CONSTANTS from "./constants";
import { doFetch, doGet, doPost } from "@/api";

export const getAuthToken = () => {
  return doGet(
    API_CONSTANTS.AUTH_TOKEN,
    {},
    {
      headers: {
        "x-secret-key": process.env.X_SECRET_KEY || "",
      },
    }
  );
};

export const getMetaData = (pageName: string = "Home") => {
  const formData = new URLSearchParams();
  formData.append("page_name", pageName);

  return doPost(
    API_CONSTANTS.META_DATA,
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    }
  );
};

export const getBanner = (pageName: string = "Home") => {
  const formData = new URLSearchParams();
  formData.append("page_name", pageName);

  return doPost(
    API_CONSTANTS.BANNER,
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    }
  );
};

export const updateSubscriberFormDetailsAPI = (formData: FormData) => {
  return fetch(API_CONSTANTS.SUBSCRIBER_FORM_DETAILS_API, {
    method: "POST",
    body: formData,
  });
};

export const updateSubscriberFormDetails = (
  token: string,
  subscriberEmailId: string,
  ipAddress: string,
  referer_url: string
) => {
  const formData = new URLSearchParams();
  formData.append("subscriber_email_id", subscriberEmailId);
  formData.append("ip_address", ipAddress);
  formData.append("referer_url", referer_url);
  return doPost(
    API_CONSTANTS.SUBSCRIBER_FORM_DETAILS,
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: formData.toString(),
    }
  );
};

export const submitContactEnquiryFormDetails = (
  token: string,
  enquiryFirstName: string,
  enquiryLastName: string,
  enquiryReason: string,
  enquiryEmailId: string,
  enquiryMobileNumber: string,
  enquiryMessage: string,
  ipAddress: string,
  refererUrl: string
) => {
  const formData = new URLSearchParams();
  formData.append("enquiry_first_name", enquiryFirstName);
  formData.append("enquiry_last_name", enquiryLastName);
  formData.append("enquiry_reason", enquiryReason);
  formData.append("enquiry_email_id", enquiryEmailId);
  formData.append("enquiry_mobile_number", `+${enquiryMobileNumber}`);
  formData.append("enquiry_message", enquiryMessage);
  formData.append("ip_address", ipAddress || "");
  formData.append("referer_url", refererUrl);

  return doPost(
    API_CONSTANTS.ENQUIRY_FORM_DETAILS,
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: formData.toString(),
    }
  );
};

export const getMasterSlider = () => {
  return doGet(API_CONSTANTS.HOME_MASTER_SLIDER);
};

export const getFeaturedProperties = () => {
  return doGet(API_CONSTANTS.HOME_FEATURED_PROPERTIES);
};

export const getFeaturedPropertiesIntro = () => {
  return doGet(API_CONSTANTS.HOME_FEATURED_PROPERTIES_INTRO);
};

export const getProperties = () => {
  return doGet(API_CONSTANTS.HOME_PROPERTIES);
};

export const getPropertiesIntro = () => {
  return doGet(API_CONSTANTS.HOME_PROPERTIES_INTRO);
};

export const getPropertyCategories = () => {
  return doGet(API_CONSTANTS.HOME_PROPERTY_CATEGORIES);
};

export const getAboutIntro = () => {
  return doGet(API_CONSTANTS.HOME_ABOUT_INTRO);
};

export const getAboutUsIntro = () => {
  return doGet(API_CONSTANTS.ABOUT_US_INTRO);
};

export const getAboutUsVision = () => {
  return doGet(API_CONSTANTS.ABOUT_US_VISION);
};

export const getAboutUsMission = () => {
  return doGet(API_CONSTANTS.ABOUT_US_MISSION);
};

export const getAboutUsCoreValuesIntro = () => {
  return doGet(API_CONSTANTS.ABOUT_US_CORE_VALUES_INTRO);
};

export const getAboutUsCoreValues = () => {
  return doGet(API_CONSTANTS.ABOUT_US_CORE_VALUES);
};

export const getAboutUsCommitmentIntro = () => {
  return doGet(API_CONSTANTS.ABOUT_US_COMMITMENT_INTRO);
};

export const getAboutUsMilestones = () => {
  return doGet(API_CONSTANTS.ABOUT_US_MILESTONES);
};

export const getAboutUsGrowthChronicles = () => {
  return doGet(API_CONSTANTS.ABOUT_US_GROWTH_CHRONICLES);
};

export const getAboutUsVideo = () => {
  return doGet(API_CONSTANTS.ABOUT_US_VIDEO);
};

export const getAboutUsGlobalIntroduction = () => {
  return doGet(API_CONSTANTS.ABOUT_US_GLOBAL_INTRODUCTION);
};

export const getAboutUsEsg = () => {
  return doGet(API_CONSTANTS.ABOUT_US_ESG);
};

export const getAboutUsClients = () => {
  return doGet(API_CONSTANTS.ABOUT_US_CLIENTS);
};

export const getAboutUsPartners = () => {
  return doGet(API_CONSTANTS.ABOUT_US_PARTNERS);
};

export const getAboutServicesIntro = () => {
  return doGet(API_CONSTANTS.SERVICES_INTRO);
};

export const getServicesList = () => {
  return doGet(API_CONSTANTS.SERVICES);
};

export const getMilestones = () => {
  return doGet(API_CONSTANTS.HOME_MILESTONES);
};

export const getServices = () => {
  return doGet(API_CONSTANTS.HOME_SERVICES);
};

export const getServicesIntro = () => {
  return doGet(API_CONSTANTS.HOME_SERVICES_INTRO);
};

export const getContactDetails = () => {
  return doGet(API_CONSTANTS.CONTACT_DETAILS);
};

export const getContactUsReasons = () => {
  return doGet(API_CONSTANTS.CONTACT_US_REASONS);
};

export const getFooterBlocks = () => {
  return doGet(API_CONSTANTS.FOOTER_BLOCKS);
};

export const getSubscriberFormDetails = () => {
  return doGet(API_CONSTANTS.SUBSCRIBER_FORM_DETAILS);
};

export const getNavigationMenu = () => {
  return doGet(API_CONSTANTS.NAVIGATION_MENU);
};

export const getPropertyDetail = (
  property_category_url_slug: string,
  property_url_slug: string
) => {
  return doGet(API_CONSTANTS.PROPERTY_DETAIL, {
    property_category_url_slug,
    property_url_slug,
  });
};

export const getAwards = () => {
  return doGet(API_CONSTANTS.AWARDS);
};

export const getFeaturedMedia = () => {
  return doGet(API_CONSTANTS.MEDIA_FEATURED);
};

export const getMedia = () => {
  return doGet(API_CONSTANTS.MEDIA);
};

export const getClients = () => {
  return doGet(API_CONSTANTS.CLIENTS);
};

export const getTestimonials = () => {
  return doGet(API_CONSTANTS.TESTIMONIALS);
};

export const getPrecIntro = () => {
  return doGet(API_CONSTANTS.PREC_INTRO);
};

export const getPrecBenefits = () => {
  return doGet(API_CONSTANTS.PREC_BENEFITS);
};

export const getPrecFaqs = () => {
  return doGet(API_CONSTANTS.PREC_FAQS);
};

export const getMeetTheCityMagazines = () => {
  return doGet(API_CONSTANTS.MEET_THE_CITY_MAGAZINES);
};

const esgBearerGet = (path: string) => () => doGet(path);

const esgProxyGet = (apiPath: string) => (baseUrl?: string) => {
  const apiUrl = baseUrl ? `${baseUrl.replace(/\/$/, "")}${apiPath}` : apiPath;

  return doFetch(apiUrl, {
    method: "GET",
    cache: "force-cache",
  });
};

export const getEsgBanner = esgBearerGet(API_CONSTANTS.ESG_BANNER);
export const getEsgIntroduction = esgBearerGet(API_CONSTANTS.ESG_INTRODUCTION);
export const getEsgPerformance = esgBearerGet(API_CONSTANTS.ESG_PERFORMANCE);
export const getEsgPolicies = esgBearerGet(API_CONSTANTS.ESG_POLICIES);
export const getEsgMilestonesIntro = esgBearerGet(
  API_CONSTANTS.ESG_MILESTONES_INTRO
);
export const getEsgMilestones = esgBearerGet(API_CONSTANTS.ESG_MILESTONES);
export const getEsgReportsIntro = esgBearerGet(API_CONSTANTS.ESG_REPORTS_INTRO);
export const getEsgReports = esgBearerGet(API_CONSTANTS.ESG_REPORTS);
export const getEsgTicker = esgBearerGet(API_CONSTANTS.ESG_TICKER);

export const getBlogFeatured = () => {
  return doGet(API_CONSTANTS.BLOG_FEATURED);
};

export const getBlog = () => {
  return doGet(API_CONSTANTS.BLOG);
};

export const getBlogDetail = (blog_url_slug: string) => {
  return doGet(API_CONSTANTS.BLOG_DETAIL, { blog_url_slug });
};

export const getCareersMilestones = () => {
  return doGet(API_CONSTANTS.CAREERS_MILESTONES);
};

export const getCareersIntro = () => {
  return doGet(API_CONSTANTS.CAREERS_INTRO);
};

export const getCareersCategoriesIntro = () => {
  return doGet(API_CONSTANTS.CAREERS_CATEGORIES_INTRO);
};

export const getCareersCategories = () => {
  return doGet(API_CONSTANTS.CAREERS_CATEGORIES);
};

export const getCareersWorkCultureIntro = () => {
  return doGet(API_CONSTANTS.CAREERS_WORK_CULTURE_INTRO);
};

export const getCareersWorkCulture = () => {
  return doGet(API_CONSTANTS.CAREERS_WORK_CULTURE);
};

export const getCareersGrowthIntro = () => {
  return doGet(API_CONSTANTS.CAREERS_GROWTH_INTRO);
};

export const getCareersGrowth = () => {
  return doGet(API_CONSTANTS.CAREERS_GROWTH);
};

export const getCareersAwardsIntro = () => {
  return doGet(API_CONSTANTS.CAREERS_AWARDS_INTRO);
};

export const getCareersLifeAtPanchshilIntro = () => {
  return doGet(API_CONSTANTS.CAREERS_LIFE_AT_PANCHSHIL_INTRO);
};

export const getCareersLifeAtPanchshil = () => {
  return doGet(API_CONSTANTS.CAREERS_LIFE_AT_PANCHSHIL);
};

export const getCareersFooterIntro = () => {
  return doGet(API_CONSTANTS.CAREERS_FOOTER_INTRO);
};
