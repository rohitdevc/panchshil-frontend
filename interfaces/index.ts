export interface ArrowLeftIconProps {
  fill?: string;
  width?: number;
  height?: number;
}

export interface EnquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
}

export interface EnquiryFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneIsoCode: string;
  projectInterested: string;
  message: string;
}

export interface EnquiryFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  projectInterested?: string;
}

export interface EnquiryPropertyGroup {
  property_category_name: string;
  properties: string[];
}

export interface ProjectCardData {
  id: string;
  title: string;
  location: string;
  image: string;
  link: string;
}

export interface ProjectsCarouselProps {
  items: ProjectCardData[];
}

export type RegionKey = "india" | "international";
export type CountryKey = "dubai" | "maldives" | "srilanka";
export type TabKey =
  | "residential"
  | "office"
  | "hospitality"
  | "datacenter"
  | "retail";

export type Browser =
  | "edge"
  | "opera"
  | "chrome"
  | "ie"
  | "firefox"
  | "safari"
  | "other";

export type PropertyCategories = {
  property_category_title: string;
  property_category_description: string;
  property_category_link: string;
  property_category_image: string;
  property_category_info: {
    property_category_developed: string;
    property_category_under_development: string;
  };
};

export type PropertiesIntroProps = {
  properties_intro_heading: string;
  properties_intro_sub_heading: string;
};

export type PropertyLocationCoOrdinatesProps = {
  property_latitude: number;
  property_longitude: number;
};

// Property Types
export type Property = {
  property_name: string;
  property_thumbnail: string;
  property_location: string;
  property_link: string;
};

// India Region Categories
export type PropertyCategory = {
  Residential?: Property[];
  "Office Parks"?: Property[];
  Hospitality?: Property[];
  "Retail & F&B"?: Property[];
  "Data Centres"?: Property[];
};

// International Region Categories
export type InternationalCategory = {
  Maldives?: Property[];
  "Sri Lanka"?: Property[];
  "United Arab Emirates"?: Property[];
};

// Region Types
export type IndiaRegion = {
  India: PropertyCategory[];
};

export type InternationalRegion = {
  International: InternationalCategory[];
};

// Complete Properties Data Structure
export type PropertiesData = Array<IndiaRegion & InternationalRegion>;

export type PropertyHighlight = {
  property_highlight_caption: string;
  property_highlight_icon: string;
};

export type FeaturedPropertiesProps = {
  property_name: string;
  property_background_desktop_image: string;
  property_background_mobile_image: string;
  property_highlights: PropertyHighlight[];
  property_link: string;
};

export type ContactDetailsProps = {
  contact_title: string;
  contact_details: string;
  contact_number: string;
}[];

export type MetaDataProps = {
  canonical_tag?: string;
  meta_description?: string;
  meta_title?: string;
  meta_keywords?: string;
};

export type NavigationMenuProps = {
  menuTitle: string;
  menuURL: string;
  menu: NavigationMenuItemProps[];
};

export type BannersProps = {
  og_image: string;
  banner_image: string;
  banner_image_caption: string;
  banner_image_description: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};
export type FeaturedPropertiesIntroProps = {
  featured_properties_intro_heading: string;
  featured_properties_intro_sub_heading: string;
};

export type ServicesIntroProps = {
  services_intro_heading: string;
  services_intro_sub_heading: string;
};

export type ServicesProps = {
  service_title: string;
  service_link: string;
  service_thumbnail: string;
  service_link_label: string;
};

export interface HomeClientProps {
  metaData: MetaDataProps;
  banner: BannersProps;
  servicesIntro: ServicesIntroProps;
  services: ServicesProps[];
  aboutIntro: AboutIntroData;
  milestones: MilestonesProps[];
  propertyCategories: PropertyCategories[];
  propertiesIntro: PropertiesIntroProps;
  properties: PropertiesData | null;
  featuredPropertiesIntro: FeaturedPropertiesIntroProps;
  featuredProperties: FeaturedPropertiesProps[];
  masterSlider: MasterSliderData[];
  footerBlocks: FooterBlocksProps[];
}

export interface AccordionProps {
  propertyCategories: PropertyCategories[];
  defaultOpen?: number;
}

export type Stat = {
  value: number;
  suffix?: string;
  description: string;
};

export type AboutIntroData = {
  about_intro_heading: string;
  about_intro_description: string;
  about_intro_link: string;
  about_intro_image: string;
  about_intro_desktop_video: string;
  about_intro_mobile_video: string;
  about_intro_button_caption: string;
};

export type AboutUsIntroData = {
  about_intro_name: string;
  about_intro_designation: string;
  about_intro_caption: string;
  about_intro_content: string;
  about_intro_image: string;
};

export type AboutUsVision = {
  about_vision_title: string;
  about_vision_caption: string;
  about_vision_description: string;
};

export type AboutUsMission = {
  about_mission_title: string;
  about_mission_caption: string;
  about_mission_description: string;
};

export type AboutUsCoreValuesIntro = {
  about_core_values_intro_title: string;
  about_core_values_intro_caption: string;
};

export type AboutUsCoreValues = {
  core_value_title: string;
  core_value_description: string;
};

export type AboutUsCommitmentIntro = {
  about_commitment_intro_title: string;
  about_commitment_intro_description: string;
};

export type AboutUsMilestonesApiItem = {
  milestone_count: string;
  milestone_title: string;
};

export type GrowthChronicle = {
  growth_chronicle_caption: string;
  growth_chronicle_image: string;
};

export type GrowthChronicleItem = {
  growth_chronicle_year: number;
  growth_chronicles: GrowthChronicle[];
};

export type AboutVideoData = {
  about_video_caption: string;
  about_video_youtube_id: string;
  about_intro_video_thumbnail: string;
};

export type GlobalContent = {
  global_heading: string;
  global_caption: string;
  global_description: string;
};

export type AboutEsgContent = {
  about_esg_caption: string;
  about_esg_description: string;
  about_esg_image: string;
};

export type AboutClient = {
  client_name: string;
  client_logo: string;
};

export type AboutPartner = {
  partner_name: string;
  partner_description: string;
  partner_website: string;
};

export type AboutPartnerTab = {
  partners: AboutPartner[];
  partner_tab: string;
};

export type ServicesIntroData = {
  services_headling: string;
  services_description: string;
};

export type ServiceItem = {
  service_name: string;
  service_description: string;
  service_thumbnail: string;
  service_capabilities: string[];
};

export interface AuthTokenResponse {
  token: string;
}

export interface FooterBlocksProps {
  footer_block_title: string;
  footer_block_link: string;
  footer_block_thumbnail: string;
}

export interface MilestonesProps {
  milestone_title: string;
  milestone_caption: string;
}

export interface PropertyCategoryMilestonesProps {
  milestone_count: string;
  milestone_title: string;
}
export interface PropertyCategoryProps {
  banner_image_caption: string;
  banner_image_description: string;
  meta_description: string;
  meta_title: string;
  property_category_title: string;
  og_image: string;
  banner_image: string;
  canonical_tag: string;
  property_category_milestones: PropertyCategoryMilestonesProps[];
  property_count: number;
}

export interface PropertyBasicInformationProps {
  property_basic_information_icon: string;
  property_basic_information_caption: string;
}
export interface PropertyProps {
  property_name: string;
  property_thumbnail: string;
  property_thumbnail_night_mode: string;
  property_location: string;
  property_link: string;
  property_status: string;
  image_gallery?: string[];
  property_city_name: string;
  property_brochure: string;
  property_tagline: string;
  property_url: string;
  property_basic_information: PropertyBasicInformationProps[];
  property_url_slug: string;
  listing_only: boolean;
  buttons: {
    label: string;
    url: string;
  }[];
}

export interface PropertyListProps {
  properties: PropertyProps[];
  allProperties?: PropertyProps[];
  propertyCategoryUrlSlug?: string;
  totalPropertyCount?: number;
  propertyCities?:
    | string[]
    | Array<Record<string, string[]>>
    | Record<string, string[]>;
  /** Set on the server from the URL so filters initialize before client `useSearchParams` is ready. */
  propertyCountryKeysFromUrl?: string[];
  propertyStatuses?: string[];
  footerRef?: React.RefObject<HTMLElement | null>;
  currentPage?: number;
  categorySlug?: string;
}

export interface PropertyItemProps {
  property: PropertyProps;
  categorySlug?: string;
}

export interface ActionButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  isDarkMode: boolean;
}

export interface CategoryFooterBlocksProps {
  footer_block_title: string;
  footer_block_description: string;
  footer_block_image: string;
  footer_block_cta_label: string;
  footer_block_cta_value: string;
}

export interface DevelopmentForYouProps {
  propertyCategory: PropertyCategoryProps;
}

export interface ListContactBannerProps {
  propertyFooterBlocks: CategoryFooterBlocksProps;
}

export interface NavigationMenuItemProps {
  menuTitle: string;
  menuURL: string;
  menuDayThumbnail: string;
  menuNightThumbnail: string;
}

export interface StickyBottomBarProps {
  projectCount?: number;
  selectedLocation?: string | string[];
  selectedProperty?: string | string[];
  onLocationChange?: (value: string[] | null) => void;
  onPropertyChange?: (value: string[] | null) => void;
  isVisible?: boolean;
  propertyCities?:
    | string[]
    | Array<Record<string, string[]>>
    | Record<string, string[]>;
  propertyStatuses?: string[];
}

export interface DropdownMenuProps {
  options?: string[];
  selectedValues?: string | string[];
  isOpen: boolean;
  onSelect: (value: string) => void;
  onClose: () => void;
  theme: "day" | "night";
  isProperty?: boolean;
}

export interface PropertyCategoryMilestonesProps {
  milestone_count: string;
  milestone_title: string;
}
export interface PropertyCategoryProps {
  banner_image_caption: string;
  banner_image_description: string;
  meta_description: string;
  meta_title: string;
  property_category_title: string;
  og_image: string;
  banner_image: string;
  canonical_tag: string;
  property_category_milestones: PropertyCategoryMilestonesProps[];
}

export interface SlideData {
  image?: string;
  video?: string;
  title: string;
  description: string;
  ctaText: string;
}

export interface MasterSliderData {
  master_slider_title: string;
  master_slider_description: string;
  master_slider_link: string;
  master_slider_image: string | null;
  master_slider_image_mobile?: string | null;
  master_slider_video: string;
  master_slider_button_caption: string;
  banner_image_mobile?: string;
  banner_image_caption?: string;
  banner_image_description?: string;
  banner_image?: string;
}

export interface TestimonialData {
  name: string;
  title: string;
  videoUrl: string;
  posterImage: string;
}

export interface DisclaimerData {
  disclaimerText: string;
  reraNumber: string;
  reraCertificateImage?: string | null;
}

export interface PropertyInfoData {
  location: string;
  configuration: string;
  status: string;
  price: string;
  brochureUrl: string;
  contactUrl: string;
}

export type PropertyKeyTenant = {
  property_key_tenant_caption: string;
  property_key_tenant_image: string;
};

export type PropertyAwardCertificateSection = {
  property_award_certificates: PropertyAwardCertificate[];
  property_award_certificates_caption: string;
};

export type PropertyKeyTenantSection = {
  property_key_tenants: PropertyKeyTenant[];
  property_key_tenants_caption: string;
};

export type PropertyAwardCertificate = {
  property_award_certificate_caption: string;
  property_award_certificate_image: string;
};

export interface PropertyQrCode {
  property_rera_number: string;
  property_qr_code_image: string;
}

export type PropertyDetailResponse = {
  property_name: string;
  property_qr_codes: PropertyQrCode[];
  banner_data?: {
    banner_image: string | null;
    banner_image_caption: string;
    banner_image_description: string;
    banner_image_mobile: string | null;
  };
  meta_data?: {
    meta_title: string;
    meta_description: string;
    canonical_tag: string;
    og_image: string;
  };
  property_band?: {
    property_location: string;
    property_configuration: string;
    property_status: string;
    property_pricing: string;
  };
  property_introduction_caption?: string;
  property_introduction_description?: string;
  property_details_informations?: unknown[];
  property_interior_sliders?: unknown;
  property_exterior_sliders?: unknown;
  property_virtual_tour_section?: unknown;
  property_defining_features_section?: unknown;
  property_brochure?: string | null;
  property_floor_plan_section?: unknown;
  property_disclaimer?: unknown;
  property_location?: {
    property_location_caption?: string;
    property_location_marker?: string | null;
    property_location_co_ordinates?: {
      property_latitude: number;
      property_longitude: number;
    };
    property_3d_map_link?: string;
  };
  property_landmark_categories?: unknown[];
  property_landmarks?: unknown[];
  property_amenities_section?: PropertyAmenitiesSection;
  property_key_tenants_section?: PropertyKeyTenantSection;
  property_award_certificates_section?: PropertyAwardCertificateSection;
};

export type PropertyInteriorSliderType = {
  property_interior_slider_caption: string;
  property_interior_slider_image: string;
};

export type PropertyExteriorSliderType = {
  property_exterior_slider_caption: string;
  property_exterior_slider_image: string;
};

export interface InteriorExteriorCarouselProps {
  interiorItems: PropertyInteriorSliderType[];
  exteriorItems: PropertyExteriorSliderType[];
}

export type CarouselItem = {
  image: string;
  caption: string;
};

export type PropertyDefiningFeaturesType = {
  property_defining_feature_caption: string;
};

export type PropertyDefiningFeaturesSectionType = {
  property_defining_features: PropertyDefiningFeaturesType[];
  property_defining_features_caption: string;
  property_defining_features_description?: string;
  property_defining_features_subcaption?: string;
  property_defining_features_cta?: {
    label: string;
    href: string;
  };
  property_defining_features_layout?: "imageLeft" | "imageRight";
  property_defining_features_thumbnail: string;
};

export type PropertyLandmarkCategory = {
  property_landmark_category_name: string;
  property_landmark_category_description: string;
  property_landmark_category_image: string;
};

export type PropertyLandmark = {
  property_location_caption: string;
  property_location_description: number;
  property_3d_map_link: string;
  property_location_marker: string;
  property_location_co_ordinates: PropertyLocationCoOrdinatesProps;
};

export type PropertyDetailsInformationType = {
  property_details_information_title: string;
  property_details_information_icon: string;
  property_details_information_caption: string;
};
export interface PropertyAreaDetailsProps {
  property_introduction_caption: string | undefined;
  property_introduction_description: string | undefined;
  property_details_informations?: PropertyDetailsInformationType[];
}

export interface PropertyLocation {
  property_location_caption: string;
  property_location_description: string;
  property_3d_map_link: string;
  property_location_marker: string;
  property_location_co_ordinates: PropertyLocationCoOrdinatesProps;
}
export interface LocationMapProps {
  title?: string;
  description?: string;
  property_location_co_ordinates: PropertyLocationCoOrdinatesProps;
  property_location: PropertyLocation;
  property_landmark_categories: PropertyLandmarkCategory[];
  property_landmarks: PropertyLandmark[];
  property_3d_map_link?: string;
}

export type LandmarkCategoryNormalized = {
  title: string;
  icon: string;
  slug?: string;
};

export type LandmarkNormalized = {
  name: string;
  lat: number;
  lng: number;
  icon: string;
  categoryKey?: string;
  categorySlug?: string;
};

export interface PropertyVirtualTourSectionType {
  property_virtual_video_embed_link: string;
}

export type PropertyAmenitiesSliderType = {
  property_amenity_slider_title: string;
  property_amenity_sliders: {
    property_amenity_slider_image_caption: string;
    property_amenity_slider_image: string;
  }[];
};

export type PropertyAmenitiesSection = {
  property_amenities_caption: string;
  property_amenities: PropertyAmenitiesSliderType[];
};

export type LocationType =
  | "atm"
  | "banks"
  | "entertainment"
  | "hospital"
  | "park"
  | "restaurants"
  | "airport";
export interface MapLocation {
  id: string;
  title: string;
  type: LocationType;
  lat: number;
  lng: number;
  zoom?: number;
  icon: string;
  /**
   * Optional metadata for map popups.
   * Kept optional to avoid breaking other map consumers.
   */
  placeName?: string;
  description?: string;
  category?: string;
}

export type ClientsApiItem = {
  id?: string | number;
  _id?: string | number;
  name?: string;
  title?: string;
  client_name?: string;
  image?: string;
  image_url?: string;
  image_path?: string;
  client_logo?: string;
  logo?: string;
  client_image?: string;
};

export type TestimonialsApiItem = {
  id?: string | number;
  _id?: string | number;
  testimonial_name?: string;
  testimonial_designation?: string;
  testimonial_content?: string;
  testimonial_thumbnail?: string;
};

export type PrecIntroApiResponse = {
  prec_headling?: string;
  prec_heading?: string;
  prec_description?: string;
  prec_image?: string;
};

export type PrecBenefitApiItem = {
  benefit_title?: string;
  benefit_description?: string;
  benefit_icon?: string;
};

export type PrecFaqApiItem = {
  faq_question?: string;
  faq_answer?: string;
};

export type MeetTheCityMagazineApiItem = {
  magazine_edition?: string;
  magazine_thumbnail?: string;
  magazine_pdf?: string;
};

/** Backend field names use this spelling */
export type EsgInitiativeApiItem = {
  iniatiative_name?: string;
  iniatiative_description?: string;
  iniatiative_image?: string;
};

export type EsgCommunityApiItem = {
  community_name?: string;
  community_description?: string;
  community_image?: string;
};

export type EsgPolicyApiItem = {
  policy_name?: string;
  policy_description?: string;
  policy_image?: string;
};

export type EsgPerformanceMetric = {
  metric_value?: string;
  metric_config?: string;
  metric_description?: string;
};

export type EsgPerformanceApiItem = {
  metrics?: EsgPerformanceMetric[];
  performance_title: string;
  performance_tagline?: string;
  performance_description?: string;
  performance_short_desc?: string;
  performance_image?: string;
};

export type EsgIntroductionApiResponse = {
  intro_heading?: string;
  intro_caption?: string;
  intro_image?: string;
};

export type EsgMilestonesIntroApiResponse = {
  intro_heading?: string;
  intro_caption?: string;
};

export type EsgMilestoneApiItem = {
  milestone_count?: string;
  milestone_count_config?: string;
  milestone_description?: string;
};

export type EsgAwardCarbonCreditApiItem = {
  esg_award_carbon_credit_caption?: string;
  esg_award_carbon_credit_image?: string;
};

export type EsgAwardApiItem = {
  esg_property_name?: string;
  esg_award_achievements?: string[];
  esg_award_description?: string;
  esg_award_carbon_credits?: EsgAwardCarbonCreditApiItem[];
  esg_award_banner_image?: string;
};

export type EsgReportsIntroApiResponse = {
  reports_heading?: string;
  reports_caption?: string;
  reports_description?: string;
  reports_image?: string;
};

export type EsgReportApiItem = {
  report_name?: string;
  report_year?: string;
  report_thumbnail?: string;
  report_pdf?: string;
  report_pdf_file_size?: string;
};

export type AwardsApiItem = {
  award_title?: string;
  award_image?: string;
  award_caption: string;
  award_year: string;
};

export type EsgSafetyGovernanceMetric = {
  metric_value?: string;
  metric_caption?: string;
  metric_description?: string;
};

export type EsgSafetyGovernanceAsset = {
  asset_title?: string;
  asset_caption?: string;
  asset_properties?: string[];
};

export type EsgSafetyGovernanceApiItem = {
  metrics?: EsgSafetyGovernanceMetric[];
  assets?: EsgSafetyGovernanceAsset[];
  safety_and_governance_title?: string;
  safety_and_governance_caption?: string;
};

export type EsgSafetyGovernanceCategoryApiItem = {
  safety_and_governance_category_title: string;
  safety_and_governances: EsgSafetyGovernanceApiItem[];
};

export type EsgTickerApiItem = {
  ticker_count?: string;
  ticker_caption?: string;
  ticker_count_config?: string;
};

export type EsgBannerApiItem = {
  banner_caption?: string;
  banner_description?: string;
  banner_image?: string;
};

export type BlogFeaturedProp = {
  blog_title: string;
  blog_preview: string;
  blog_thumbnail: string;
  blog_published_date: string;
  blog_url: string;
};

export type BlogProp = {
  blog_title: string;
  blog_thumbnail: string;
  blog_published_date: string;
  blog_url: string;
};

export type BlogDetailProp = {
  blog_title: string;
  blog_preview: string;
  blog_content: string;
  blog_date: string;
  og_image: string;
  banner_image: string;
  meta_title: string;
  meta_description: string;
  canonical_tag: string;
};

export type MediaProp = {
  media_title: string;
  media_publisher: string;
  media_thumbnail: string;
  media_published_date: string;
  media_url: string;
};
