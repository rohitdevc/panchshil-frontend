import { PropertyCategories } from "@/interfaces";
import { useThemeStore } from "@/store/themeStore";
import { useEffect, useRef, useState } from "react";
import { Accordion } from "../Accordion";

const OurOtherProjects = ({
  otherPropertyCategories,
}: {
  otherPropertyCategories: PropertyCategories[];
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  const { theme } = useThemeStore();

  return (
    <section
      ref={sectionRef}
      className={`w-full py-10 md:py-20 transition-colors `}
    >
      <div className="mx-auto ">
        {/* Title and Description */}
        <div
          className={`text-center mb-10 ${
            isInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div
            className={`text-lg uppercase font-medium tracking-[0.2em] text-gold-beige mb-2 `}
          >
            OUR OTHER PROJECTS
          </div>
          <h2
            className={`text-2xl uppercase md:text-[28px] font-display-semi transition-colors ${
              theme === "day" ? "text-black" : "text-white"
            }`}
          >
            NOT SEEING WHAT YOU ARE LOOKING FOR?
          </h2>
        </div>
        <Accordion
          propertyCategories={otherPropertyCategories}
          defaultOpen={1}
        />
      </div>
    </section>
  );
};

export default OurOtherProjects;
