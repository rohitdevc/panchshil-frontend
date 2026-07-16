import { doGet, doPost } from ".";
import API_CONSTANTS from "./constants";

export const getPropertyCategory = (property_category_url_slug: string) => {
  return doGet(API_CONSTANTS.PROPERTY_CATEGORY, { property_category_url_slug });
};

export const getPropertyCities = (property_category_url_slug: string) => {
  return doGet(API_CONSTANTS.PROPERTY_CITIES, { property_category_url_slug });
};

export const getPropertyStatuses = (property_category_url_slug: string) => {
  return doGet(API_CONSTANTS.PROPERTY_STATUSES, { property_category_url_slug });
};

export const getPropertiesByCategory = (
  property_category_url_slug: string,
  limit?: number,
  skip?: number
) => {
  // Build the API path
  let apiPath = API_CONSTANTS.PROPERTIES_BY_CATEGORY.replace(
    "{property_category_url_slug}",
    property_category_url_slug
  );

  // Add query parameters if limit and skip are provided
  if (limit !== undefined && skip !== undefined) {
    apiPath = `${apiPath}?limit=${limit}&skip=${skip}`;
  }

  return doGet(apiPath, { property_category_url_slug });
};

export const getOtherPropertyCategories = (
  property_category_url_slug: string
) => {
  return doGet(API_CONSTANTS.OTHER_PROPERTY_CATEGORIES, {
    property_category_url_slug,
  });
};

export const getPropertyFooterBlocks = () => {
  return doGet(API_CONSTANTS.PROPERTY_FOOTER_BLOCKS);
};

export const getEnquiryPropertyList = () => {
  return doGet(API_CONSTANTS.ENQUIRY_GET_PROPERTY_LIST);
};

export const submitPropertyEnquiryFormDetails = (
  token: string,
  propertyEnquiryFirstName: string,
  propertyEnquiryLastName: string,
  propertyEnquiryContactNumber: string,
  propertyEnquiryEmailId: string,
  propertyEnquiryPropertyName: string,
  propertyEnquiryMessage: string,
  ipAddress: string,
  referer_url: string
) => {
  const formData = new URLSearchParams();
  formData.append("property_enquiry_first_name", propertyEnquiryFirstName);
  formData.append("property_enquiry_last_name", propertyEnquiryLastName);
  formData.append(
    "property_enquiry_contact_number",
    `+${propertyEnquiryContactNumber}`
  );
  formData.append("property_enquiry_email_id", propertyEnquiryEmailId);
  formData.append(
    "property_enquiry_property_name",
    propertyEnquiryPropertyName
  );
  formData.append("property_enquiry_message", propertyEnquiryMessage);
  formData.append("ip_address", ipAddress || "");
  formData.append("referer_url", referer_url);

  return doPost(
    API_CONSTANTS.ENQUIRY_PROPERTY_FORM_DETAILS,
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
