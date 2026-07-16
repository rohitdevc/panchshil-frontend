import { CareerHeroContent } from "@/app/careers/career-page.data";

export type AwardItem = {
  id: string;
  title: string;
  caption: string;
  year: string;
  imageSrc: string;
  imageAlt: string;
};

export type AwardsPageData = {
  hero: CareerHeroContent;
  awards: AwardItem[] | [];
};
