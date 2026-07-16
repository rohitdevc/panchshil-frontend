"use client";

import { AboutUsCoreValuesProps } from "@/app/about/about.data";
import { AboutUsCoreValuesIntro } from "@/interfaces";

interface AboutUsCoreValuesSectionProps {
  intro?: AboutUsCoreValuesIntro;
  core_values: AboutUsCoreValuesProps[];
}

const AboutUsCoreValues = ({
  intro,
  core_values,
}: AboutUsCoreValuesSectionProps) => {
  return (
    <section className={`w-full py-10 md:py-10 transition-colors bg-[#FFFAF7]`}>
      {intro && (
        <div className="flex flex-col gap-10 justify-center items-center text-center">
          <div className={`text-center}`}>
            <div
              className={`text-lg uppercase font-medium tracking-[0.2em] text-gold-beige mb-2 `}
            >
              {intro.about_core_values_intro_title}
            </div>
            <h2
              className={`text-2xl uppercase md:text-[28px] font-display-semi transition-colors text-black`}
            >
              {intro.about_core_values_intro_caption}
            </h2>
          </div>
          {core_values && core_values.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 px-10 text-left">
              {core_values.map((core_value, key) => (
                <div
                  key={key}
                  className="flex flex-col gap-5 px-5 py-10 border border-black/10"
                >
                  <h2 className="text-2xl font-display-semi text-black-chocolate mb-5">
                    {core_value.core_value_title}
                  </h2>
                  <p className="text-black/80 text-sm leading-relaxed">
                    {core_value.core_value_description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default AboutUsCoreValues;
