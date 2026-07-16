import parser from "html-react-parser";
import nl2br from "nl2br";

import { AboutUsCommitmentIntroProps } from "@/app/about/about.data";

type AboutUsCommitmentIntroPageProps = {
  content?: AboutUsCommitmentIntroProps;
};

export default function AboutUsCommitment({
  content,
}: AboutUsCommitmentIntroPageProps) {
  return (
    content && (
      <section className="w-full bg-white py-14 md:py-20">
        <div className="mx-auto ">
          <div className={`text-center mb-10`}>
            <h2
              className={`text-2xl uppercase md:text-[28px] font-display-semi transition-colors`}
            >
              {content.about_commitment_intro_title}
            </h2>
            <p
              className={`mt-4 text-sm md:text-base max-w-[900px] mx-auto leading-relaxed`}
            >
              {parser(nl2br(content.about_commitment_intro_description))}
            </p>
          </div>
        </div>
      </section>
    )
  );
}
