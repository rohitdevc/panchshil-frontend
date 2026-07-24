export type BlogSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogDetailsData = {
  id: string;
  title: string;
  bannerImg: string;
  sections: BlogSection[];
};

export const blogDetailsDummyData: BlogDetailsData = {
  id: "villas-penthouses",
  title: "VILLAS OR PENTHOUSES -\nWHICH ONE IS BETTER?",
  bannerImg: "/assets/images/blogs/villas-penthouse.png",
  sections: [
    {
      paragraphs: [
        "\"In the game of luxury real estate, much like in 'Game of Thrones', every detail matters; from the grandeur of the Highgarden to the stark beauty of Winterfell, each property pledges allegiance to its owner's vision.\"",
        "Villas and penthouses are a distinct choice of luxury living for the quintessential elite who prioritise unrivalled comfort, exclusivity, privacy and an upmarket lifestyle. Each oozing its own value proposition, both unremarkably stand for class, style, space and opulence. While a villa exudes grounded and spacious yet magnificent amenities in a standalone plot format, a penthouse stands aloft with its elegance, style and splendour, overlooking views of the exquisite city. The decision to choose one over the other is primarily temperamental and locational.",
        "This article from Panchshil Realty will educate you more about these asset classes, as it is a pioneer in opulent and high-quality projects that are changing India's landscape.",
        "Let us look at villas and penthouses independently to better comprehend their respective attributes.",
      ],
    },
    {
      heading: "Luxury Villa",
      paragraphs: [
        "Spacious homes with the choicest amenities, luxury villas speak of austerity and opulent living. Constructed innovatively in prime neighbourhoods to suit splendid living in widespread landscapes, accentuating scenic views, lush greenery, poolside and unmatched personal assistance and services, luxury villas are aesthetically stunning and exude a character of grand living.",
      ],
    },
    {
      heading: "Luxury Penthouses",
      paragraphs: [
        "Overlooking spectacular horizons, luxury penthouses are unparalleled in elegance. They are exclusive, expansive, and spread out in an utmost lavish manner, boasting private terraces with premium and personalised services that invoke a sense of pride and craftsmanship along with offering you an indulgence of the skylines.",
      ],
    },
    {
      heading: "Comparing Features And Lifestyle:",
      paragraphs: [
        "Although both are unique in their proposition; each accounting for all things luxury and lifestyle, this detailed comparison of their environment, space, facilities and services will give a deeper insight into their distinctive features so you can make an informed decision based on your preferences and needs.",
      ],
    },
    {
      heading: "Villa Space And Environment",
      paragraphs: [
        "Villas are sacrosanct with largeness and expansiveness. Villa space stands for well-spread-out landscapes, large gardens, courtyards, aesthetic water fixtures and an environment that offers fine living and unsurpassed hospitality. The villa space often accommodates farm space and lavish pools that accentuate opulent and wholesome living in prime neighbourhoods or even on the outskirts of the city.",
      ],
    },
    {
      heading: "Penthouse Space And Environment",
      paragraphs: [
        "Privately owned floors, the penthouse space and environment are lavish, secure and architecturally as appealing as the breath-taking views they offer of the city skyline. The penthouse accommodates private decks, high ceilings, rooftop gardens, pools, separate entrances, premium services, parking spaces and top-class amenities. Penthouses are opulent living homes that combine luxury and location.",
      ],
    },
    {
      heading: "Villa And Penthouse Facilities And Services",
      paragraphs: [
        "While both have their own set of prime and premium facilities and services, here are a few pointers that shall enable the choice of a villa over a penthouse and vice versa.",
        "With an increased population and higher standards of living, penthouse luxury living has become almost necessary for a luxury lifestyle amidst the chaos of city life. The villa, on the other hand, represents all the splendour while also being wholly owned and featuring a separate gated living space. Penthouses are in high-rise buildings, while villas are privately owned, spacious homes with all things personalised and no shared services.",
        "Villas offer large landscapes sprawled across gardens, accentuating a palatial lifestyle. Penthouses have private terraces and rooftop gardens with a larger-than-life view of the city life and horizon",
        "Both are equivalent status symbols. While penthouse facilities and services involve top-notch amenities for private use and separate entrances in a residential building, villa facilities, on the other hand can be customised to suit the space and standard of the property and its guidelines.",
        "Penthouses are exclusive homes located in residential high-rise structures with parking spaces assigned according to the residential floor plans whereas villas are privately owned and have private parking places on the property.",
        "While a villa can easily accommodate lush, lavish, and spacious gardens, a penthouse can offer a rooftop garden with a panoramic view of the city landscape.",
        "Villa space is more customisable due to its privately owned land. Interiors can easily be designed to ensure a non-claustrophobic atmosphere for their occupants. Penthouses need to maintain residential rules and regulations; however, they are also privileged in more ways than one as compared to other apartment owners residing in the same gated community.",
        "It is feasible to seamlessly integrate facilities, services, and personalised ambiance into both penthouses and villas, provided that strict adherence to property management protocols and residential regulations is maintained.",
      ],
    },
  ],
};
