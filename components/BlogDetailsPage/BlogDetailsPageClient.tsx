"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { BlogDetailProp } from "@/interfaces";
import parser, { domToReact, Element, DOMNode } from "html-react-parser";
import dayjs from "dayjs";
import lodash from "lodash";
import { useState, useEffect } from "react";
import { ChildNode } from "domhandler";

type BlogDetailsPageClientProps = {
  blog: BlogDetailProp;
};

export default function BlogDetailsPageClient({
  blog,
}: BlogDetailsPageClientProps) {
  let headingIndex = 0;
  let addClassToNextP = false;
  const h2Texts: string[] = [];
  const [activeTab, setActiveTab] = useState<number>(0);

  const content = parser(blog.blog_content, {
    replace(domNode) {
      if (domNode instanceof Element && domNode.name === "h2") {
        headingIndex++;
        addClassToNextP = true;

        const headingIndexString =
          headingIndex < 9 ? String(0 + String(headingIndex)) : headingIndex;

        const text = domNode.children
          .map((child: ChildNode) => ("data" in child ? child.data : ""))
          .join("");

        const id = lodash.kebabCase(text);

        if (domNode.type === "tag" && domNode.name === "h2") {
          const text = domNode.children
            .filter((child) => child.type === "text")
            .map((child) => child.data)
            .join("");

          h2Texts.push(text);
        }

        return (
          <h2 className="font-display flex items-center gap-3" id={id}>
            <span className="text-gold-beige font-bold text-xs">
              {headingIndexString}
            </span>
            {domToReact(domNode.children as DOMNode[])}
          </h2>
        );
      }

      if (
        domNode instanceof Element &&
        domNode.name === "p" &&
        addClassToNextP
      ) {
        return (
          <p className="border-l border-gold-beige/30 pl-6">
            {domToReact(domNode.children as DOMNode[])}
          </p>
        );
      }

      if (
        domNode instanceof Element &&
        ["h3", "h4", "h5", "h6"].includes(domNode.name)
      ) {
        addClassToNextP = false;
      }
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      const headerOffset = 240;
      let currentActive = 0;

      for (let i = 0; i < h2Texts.length; i++) {
        const text = h2Texts[i];

        const el = document.getElementById(lodash.kebabCase(text));

        if (el) {
          const rect = el.getBoundingClientRect();

          if (rect.top <= headerOffset + 20) {
            currentActive = i;
          }
        }
      }
      setActiveTab(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#FFFAF7]">
      <Header blogDetails={true} />
      <section className="pt-20 md:pt-35 lg:pt-50 flex flex-col">
        <div className="flex flex-col lg:flex-row gap-10 justify-between py-10 px-10 md:px-20">
          <div className="flex flex-col gap-5 justify-center items-center md:w-[600px]">
            <h1 className="font-display text-[28px] md:text-5xl leading-snug lg:leading-[1.2] text-[#222222] tracking-wide">
              {blog.blog_title}
            </h1>
            <p className="text-gold-beige font-display text-lg tracking-wide">
              {blog.blog_preview}
            </p>

            <ul className="w-full mt-5 py-3 border-t border-gold-beige/30 flex gap-10 text-gold-beige">
              <li className="flex flex-col gap-2">
                <span className="uppercase">Published</span>
                <span className="font-display">
                  {dayjs(blog.blog_date).format("DD MMMM, YYYY")}
                </span>
              </li>
            </ul>
          </div>

          <div className="w-full h-[400px] md:w-[800px] md:h-[500px] relative border border-gold-beige/30 bg-white">
            <Image
              src={blog.banner_image}
              alt={blog.blog_title.replace("\n", " ")}
              fill
              className="object-cover p-6"
              priority
            />
          </div>
        </div>

        <article className="w-full space-y-8 leading-[1.8] bg-white px-10 md:px-20 py-15 flex flex-col md:flex-row md:justify-between gap-5">
          {h2Texts && h2Texts.length > 0 && (
            <div className="w-xs md:sticky top-[166px] self-start">
              <span className="text-gold-beige uppercase">In This Article</span>
              <ul className="border-l border-gold-beige/30 px-3 mt-3 text-black/85 flex flex-col gap-3">
                {h2Texts.map((h2Text, key) => {
                  const isActive = activeTab === key;
                  return (
                    <li
                      key={key}
                      className={`cursor-pointer transition-all duration-300 ${isActive ? "font-bold text-base" : "text-sm"}`}
                      onClick={() => {
                        document
                          .getElementById(lodash.kebabCase(h2Text))
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }}
                    >
                      {h2Text}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <div className="w-full blog_content flex flex-col gap-5">
            {content}
          </div>
        </article>
      </section>
      <Footer />
    </main>
  );
}
