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
  subHeading: string;
  description: string;
  slides: CareerGrowthSlide[];
};

export type CareerSafetyAwardsContent = {
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
