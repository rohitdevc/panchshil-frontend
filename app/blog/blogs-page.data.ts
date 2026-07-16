import { CareerHeroContent } from "@/app/careers/career-page.data";

export type BlogCategoryTab = {
  id: string;
  label: string;
};

export type BlogArticleCard = {
  id: string;
  categoryId: string;
  title: string;
  publishedOn: string;
  imageSrc: string;
  href: string;
};

export type BlogsArticlesSectionData = {
  categories: BlogCategoryTab[];
  articles: BlogArticleCard[];
  /** Defaults to 4 */
  perPage?: number;
};

export type BlogsFeaturedPost = {
  publishedOn: string;
  title: string;
  excerpt: string;
  readMoreHref: string;
  imageSrc: string;
  imageAlt: string;
};

export type BlogsSharingSectionData = {
  heading: string;
  featured: BlogsFeaturedPost;
};

export type BlogsPageData = {
  hero: CareerHeroContent;
  sharing: BlogsSharingSectionData;
  articles: BlogsArticlesSectionData;
};

const IMG_A = "/assets/images/blogs/property-investment-article.png";
const IMG_B = "/assets/images/blogs/luxury-apartment-acrticle2.png";
const IMG_C = "/assets/images/blogs/luxury-apartment-acrticle2.png";
const IMG_D = "/assets/images/blogs/internet-asrticle.png";

export const blogsPageStaticData: BlogsPageData = {
  hero: {
    imageSrc: "/assets/images/blogs/blogs-hero-banner.png",
    title: "Blogs",
    description:
      "Updates, announcements and stories featuring Panchshil's developments, milestones and industry presence.",
  },
  sharing: {
    heading: "SHARING IS CARING SO WE MAKE TIME TO WRITE ABOUT OUR EXPERIENCES",
    featured: {
      publishedOn: "08Aug, 2025",
      title: "Villas Or Penthouses - Which One Is Better?",
      excerpt:
        "In the game of luxury real estate, much like in ‘Game of Thrones’, every detail matters; from the grandeur of the Highgarden to the stark beauty of Winterfell, each property pledges allegiance to its owner’s vision.",
      readMoreHref: "/blogs/villas-penthouses",
      imageSrc: "/assets/images/blogs/sharing-caring.png",
      imageAlt: "Luxury residence with pool at dusk",
    },
  },
  articles: {
    categories: [
      { id: "all", label: "ALL" },
      { id: "csr", label: "CSR" },
      { id: "luxury-property", label: "LUXURY PROPERTY" },
      { id: "generic", label: "GENERIC" },
      { id: "real-estate-investment", label: "REAL ESTATE INVESTMENT" },
    ],
    perPage: 4,
    articles: [
      {
        id: "1",
        categoryId: "real-estate-investment",
        title: "Why Real Estate Properties Will Always Be A Good Investment",
        publishedOn: "05July, 2025",
        imageSrc: IMG_A,
        href: "/blogs/villas-penthouses",
      },
      {
        id: "2",
        categoryId: "luxury-property",
        title: "Things To Keep In Mind When Investing In A Luxury Apartment",
        publishedOn: "08Aug, 2025",
        imageSrc: IMG_B,
        href: "/blogs/villas-penthouses",
      },
      {
        id: "3",
        categoryId: "luxury-property",
        title: "Things To Keep In Mind When Investing In A Luxury Apartment",
        publishedOn: "05July, 2025",
        imageSrc: IMG_C,
        href: "/blogs/villas-penthouses",
      },
      {
        id: "4",
        categoryId: "generic",
        title:
          "How The Internet Of Things Is Poised To Elevate And Transform Any Home",
        publishedOn: "08Aug, 2025",
        imageSrc: IMG_D,
        href: "/blogs/villas-penthouses",
      },
      {
        id: "5",
        categoryId: "csr",
        title: "Community Initiatives That Strengthen Neighbourhoods",
        publishedOn: "12June, 2025",
        imageSrc: IMG_B,
        href: "/blogs/villas-penthouses",
      },
      {
        id: "6",
        categoryId: "csr",
        title: "Sustainability In Every Brick We Lay",
        publishedOn: "01May, 2025",
        imageSrc: IMG_A,
        href: "/blogs/villas-penthouses",
      },
      {
        id: "7",
        categoryId: "generic",
        title: "Design Trends Shaping Modern Workspaces",
        publishedOn: "20Apr, 2025",
        imageSrc: IMG_C,
        href: "/blogs/villas-penthouses",
      },
      {
        id: "8",
        categoryId: "real-estate-investment",
        title: "Long-Term Value In Prime Locations",
        publishedOn: "15Mar, 2025",
        imageSrc: IMG_D,
        href: "/blogs/villas-penthouses",
      },
    ],
  },
};
