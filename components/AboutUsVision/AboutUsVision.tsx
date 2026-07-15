import parser from "html-react-parser";
import nl2br from "nl2br";

import { AboutUsVisionProps } from "@/app/about/about.data";

type AboutUsVisionPageProps = {
  content?: AboutUsVisionProps;
};

export default function AboutUsVision({ content }: AboutUsVisionPageProps) {
  return (
    content && (
      <section className="w-full bg-[#FFFAF7] py-14 md:py-20">
        <div className="mx-auto ">
          <div className={`text-center mb-10`}>
            <div
              className={`text-lg uppercase font-medium tracking-[0.2em] text-gold-beige mb-2`}
            >
              {content.about_vision_title}
            </div>
            <h2
              className={`text-2xl uppercase md:text-[28px] font-display-semi transition-colors`}
            >
              {content.about_vision_caption}
            </h2>
            <p
              className={`mt-4 text-sm md:text-base max-w-[800px] mx-auto leading-relaxed`}
            >
              {parser(nl2br(content.about_vision_description))}
            </p>
          </div>
        </div>
      </section>
    )
  );
}
