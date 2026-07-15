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

export const getMetaData = (token: string, pageName: string = "Home") => {
  const formData = new URLSearchParams();
  formData.append("page_name", pageName);

  return doPost(
    API_CONSTANTS.META_DATA,
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

export const getBanner = (token: string, pageName: string = "Home") => {
  const formData = new URLSearchParams();
  formData.append("page_name", pageName);

  return doPost(
    API_CONSTANTS.BANNER,
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

export const getMasterSlider = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_MASTER_SLIDER,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getFeaturedProperties = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_FEATURED_PROPERTIES,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getFeaturedPropertiesIntro = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_FEATURED_PROPERTIES_INTRO,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getProperties = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_PROPERTIES,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPropertiesIntro = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_PROPERTIES_INTRO,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPropertyCategories = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_PROPERTY_CATEGORIES,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAboutIntro = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_ABOUT_INTRO,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAboutUsIntro = (token: string) => {
  return doGet(
    API_CONSTANTS.ABOUT_US_INTRO,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAboutUsVision = (token: string) => {
  return doGet(
    API_CONSTANTS.ABOUT_US_VISION,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAboutUsMission = (token: string) => {
  return doGet(
    API_CONSTANTS.ABOUT_US_MISSION,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAboutUsCoreValuesIntro = (token: string) => {
  return doGet(
    API_CONSTANTS.ABOUT_US_CORE_VALUES_INTRO,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAboutUsCoreValues = (token: string) => {
  return doGet(
    API_CONSTANTS.ABOUT_US_CORE_VALUES,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAboutUsCommitmentIntro = (token: string) => {
  return doGet(
    API_CONSTANTS.ABOUT_US_COMMITMENT_INTRO,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAboutUsMilestones = (token: string) => {
  return doGet(
    API_CONSTANTS.ABOUT_US_MILESTONES,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAboutUsGrowthChronicles = (token: string) => {
  return doGet(
    API_CONSTANTS.ABOUT_US_GROWTH_CHRONICLES,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAboutUsVideo = (token: string) => {
  return doGet(
    API_CONSTANTS.ABOUT_US_VIDEO,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAboutUsGlobalIntroduction = (token: string) => {
  return doGet(
    API_CONSTANTS.ABOUT_US_GLOBAL_INTRODUCTION,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAboutUsEsg = (token: string) => {
  return doGet(
    API_CONSTANTS.ABOUT_US_ESG,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAboutUsClients = (token: string) => {
  return doGet(
    API_CONSTANTS.ABOUT_US_CLIENTS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAboutUsPartners = (token: string) => {
  return doGet(
    API_CONSTANTS.ABOUT_US_PARTNERS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAboutServicesIntro = (token: string) => {
  return doGet(
    API_CONSTANTS.SERVICES_INTRO,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getServicesList = (token: string) => {
  return doGet(
    API_CONSTANTS.SERVICES,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getMilestones = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_MILESTONES,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getServices = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_SERVICES,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getServicesIntro = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_SERVICES_INTRO,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getContactDetails = (token: string) => {
  return doGet(
    API_CONSTANTS.CONTACT_DETAILS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getContactUsReasons = (token: string) => {
  return doGet(
    API_CONSTANTS.CONTACT_US_REASONS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getFooterBlocks = (token: string) => {
  return doGet(
    API_CONSTANTS.FOOTER_BLOCKS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getSubscriberFormDetails = (token: string) => {
  return doGet(
    API_CONSTANTS.SUBSCRIBER_FORM_DETAILS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getNavigationMenu = (token: string) => {
  return doGet(
    API_CONSTANTS.NAVIGATION_MENU,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPropertyDetail = (
  token: string,
  property_category_url_slug: string,
  property_url_slug: string
) => {
  return doGet(
    API_CONSTANTS.PROPERTY_DETAIL,
    { property_category_url_slug, property_url_slug },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAwards = (token: string) => {
  return doGet(
    API_CONSTANTS.AWARDS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAwardsAPI = (baseUrl?: string) => {
  const apiUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}${API_CONSTANTS.AWARDS_API}`
    : API_CONSTANTS.AWARDS_API;

  return doFetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });
};

export const getClients = (token: string) => {
  return doGet(
    API_CONSTANTS.CLIENTS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getClientsAPI = (baseUrl?: string) => {
  const apiUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}${API_CONSTANTS.CLIENTS_API}`
    : API_CONSTANTS.CLIENTS_API;

  return doFetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });
};

export const getTestimonials = (token: string) => {
  return doGet(
    API_CONSTANTS.TESTIMONIALS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getTestimonialsAPI = (baseUrl?: string) => {
  const apiUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}${API_CONSTANTS.TESTIMONIALS_API}`
    : API_CONSTANTS.TESTIMONIALS_API;

  return doFetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });
};

export const getPrecIntro = (token: string) => {
  return doGet(
    API_CONSTANTS.PREC_INTRO,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPrecIntroAPI = (baseUrl?: string) => {
  const apiUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}${API_CONSTANTS.PREC_INTRO_API}`
    : API_CONSTANTS.PREC_INTRO_API;

  return doFetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });
};

export const getPrecBenefits = (token: string) => {
  return doGet(
    API_CONSTANTS.PREC_BENEFITS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPrecBenefitsAPI = (baseUrl?: string) => {
  const apiUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}${API_CONSTANTS.PREC_BENEFITS_API}`
    : API_CONSTANTS.PREC_BENEFITS_API;

  return doFetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });
};

export const getPrecFaqs = (token: string) => {
  return doGet(
    API_CONSTANTS.PREC_FAQS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPrecFaqsAPI = (baseUrl?: string) => {
  const apiUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}${API_CONSTANTS.PREC_FAQS_API}`
    : API_CONSTANTS.PREC_FAQS_API;

  return doFetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });
};

export const getMeetTheCityMagazines = (token: string) => {
  return doGet(
    API_CONSTANTS.MEET_THE_CITY_MAGAZINES,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getMeetTheCityMagazinesAPI = (baseUrl?: string) => {
  const apiUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}${API_CONSTANTS.MEET_THE_CITY_MAGAZINES_API}`
    : API_CONSTANTS.MEET_THE_CITY_MAGAZINES_API;

  return doFetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });
};

const esgBearerGet = (path: string) => (token: string) =>
  doGet(
    path,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

const esgProxyGet = (apiPath: string) => (baseUrl?: string) => {
  const apiUrl = baseUrl ? `${baseUrl.replace(/\/$/, "")}${apiPath}` : apiPath;

  return doFetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });
};

export const getEsgBanner = esgBearerGet(API_CONSTANTS.ESG_BANNER);
export const getEsgIntroduction = esgBearerGet(API_CONSTANTS.ESG_INTRODUCTION);
export const getEsgIntroductionAPI = esgProxyGet(
  API_CONSTANTS.ESG_INTRODUCTION_API
);
export const getEsgPerformance = esgBearerGet(API_CONSTANTS.ESG_PERFORMANCE);
export const getEsgPerformanceAPI = esgProxyGet(
  API_CONSTANTS.ESG_PERFORMANCE_API
);
export const getEsgInitiatives = esgBearerGet(API_CONSTANTS.ESG_INITIATIVES);
export const getEsgInitiativesAPI = esgProxyGet(
  API_CONSTANTS.ESG_INITIATIVES_API
);
export const getEsgCommunities = esgBearerGet(API_CONSTANTS.ESG_COMMUNITIES);
export const getEsgCommunitiesAPI = esgProxyGet(
  API_CONSTANTS.ESG_COMMUNITIES_API
);
export const getEsgPolicies = esgBearerGet(API_CONSTANTS.ESG_POLICIES);
export const getEsgPoliciesAPI = esgProxyGet(API_CONSTANTS.ESG_POLICIES_API);
export const getEsgMilestonesIntro = esgBearerGet(
  API_CONSTANTS.ESG_MILESTONES_INTRO
);
export const getEsgMilestonesIntroAPI = esgProxyGet(
  API_CONSTANTS.ESG_MILESTONES_INTRO_API
);
export const getEsgMilestones = esgBearerGet(API_CONSTANTS.ESG_MILESTONES);
export const getEsgMilestonesAPI = esgProxyGet(
  API_CONSTANTS.ESG_MILESTONES_API
);
export const getEsgAwards = esgBearerGet(API_CONSTANTS.ESG_AWARDS);
export const getEsgAwardsAPI = esgProxyGet(API_CONSTANTS.ESG_AWARDS_API);
export const getEsgReportsIntro = esgBearerGet(API_CONSTANTS.ESG_REPORTS_INTRO);
export const getEsgReportsIntroAPI = esgProxyGet(
  API_CONSTANTS.ESG_REPORTS_INTRO_API
);
export const getEsgSafetyGovernance = esgBearerGet(
  API_CONSTANTS.ESG_SAFETY_GOVERNANCE
);
export const getEsgSafetyGovernanceAPI = esgProxyGet(
  API_CONSTANTS.ESG_SAFETY_GOVERNANCE_API
);
export const getEsgReports = esgBearerGet(API_CONSTANTS.ESG_REPORTS);
export const getEsgReportsAPI = esgProxyGet(API_CONSTANTS.ESG_REPORTS_API);
export const getEsgTicker = esgBearerGet(API_CONSTANTS.ESG_TICKER);
export const getEsgTickerAPI = esgProxyGet(API_CONSTANTS.ESG_TICKER_API);
