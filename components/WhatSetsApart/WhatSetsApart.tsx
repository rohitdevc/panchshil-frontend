import { PropertyDefiningFeaturesSectionType } from "@/interfaces";
import Image from "next/image";

const WhatSetsApart = ({
  property_defining_features_section,
  // onCtaClick,
}: {
  property_defining_features_section: PropertyDefiningFeaturesSectionType;
  // onCtaClick?: () => void;
}) => {
  if (
    !(
      property_defining_features_section?.property_defining_features?.length > 0
    )
  )
    return null;

  const layout =
    property_defining_features_section?.property_defining_features_layout ??
    "imageRight";

  return (
    <section className="w-full bg-[#FFFAF7] py-16 md:py-24">
      <div className="mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Text Content */}
          <div className={layout === "imageLeft" ? "lg:order-2" : ""}>
            {property_defining_features_section?.property_defining_features_caption && (
              <h2 className="text-2xl md:text-[28px] font-display-semi text-black uppercase mb-8 md:mb-12">
                {
                  property_defining_features_section?.property_defining_features_caption
                }
              </h2>
            )}
            {property_defining_features_section?.property_defining_features_description ? (
              <p className="text-sm md:text-sm text-[#1F180D]/80 leading-relaxed mb-8 -mt-4 max-w-2xl">
                {
                  property_defining_features_section?.property_defining_features_description
                }
              </p>
            ) : null}

            {property_defining_features_section?.property_defining_features_subcaption ? (
              <p className="text-base font-display-semi tracking-[0.16em] uppercase text-black mb-6">
                {
                  property_defining_features_section.property_defining_features_subcaption
                }
              </p>
            ) : null}
            <div className="space-y-6">
              {property_defining_features_section?.property_defining_features?.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 border-b border-[#ab9b815e] pb-4"
                  >
                    <span className="text-[#1F180D] font-regular text-sm md:text-sm shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-[#1F180D] text-sm md:text-sm ">
                      {item.property_defining_feature_caption}
                    </p>
                  </div>
                )
              )}
            </div>

            {property_defining_features_section?.property_defining_features_cta ? (
              <a
                href={
                  property_defining_features_section
                    .property_defining_features_cta.href ||
                  "/contact-us"
                }
                className="inline-flex mt-10 bg-gold-beige text-white text-xs tracking-wide uppercase px-6 py-3 hover:bg-[#7a6a55] transition-colors"
                // onClick={(e) => {
                //   if (!onCtaClick) return;
                //   e.preventDefault();
                //   onCtaClick();
                // }}
              >
                {
                  property_defining_features_section
                    .property_defining_features_cta.label
                }
              </a>
            ) : null}
          </div>

          {/* Right Column - Image */}
          <div
            className={`relative w-full h-[400px] md:h-[600px] lg:h-[700px] ${
              layout === "imageLeft" ? "lg:order-1" : ""
            }`}
          >
            <Image
              src={
                property_defining_features_section?.property_defining_features_thumbnail
              }
              alt={
                property_defining_features_section?.property_defining_features_caption
              }
              fill
              className="object-cover "
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatSetsApart;
