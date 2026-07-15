import parser from "html-react-parser";
import nl2br from "nl2br";

import { AboutUsMissionProps } from "@/app/about/about.data";

type AboutUsMissionPageProps = {
  content?: AboutUsMissionProps;
};

export default function AboutUsMission({ content }: AboutUsMissionPageProps) {
  return (
    content && (
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <p className="text-lg uppercase font-medium tracking-[0.2em] text-gold-beige mb-2">
              {content.about_mission_title}
            </p>
            <h2
              className={`text-2xl uppercase md:text-[28px] font-display-semi transition-colors`}
            >
              {content.about_mission_caption}
            </h2>
          </div>

          <div className="relative w-full overflow-hidden">
            {content.about_mission_description}
          </div>
        </div>
      </section>
    )
  );
}
