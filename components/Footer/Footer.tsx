"use client";

import { updateSubscriberFormDetailsAPI } from "@/api/CMS.api";
import { useNavigationMenu } from "@/hooks/useNavigationMenu";
import { useNavigationMenuStore } from "@/store/navigationMenuStore";
import { useThemeStore } from "@/store/themeStore";
import { isAllowedPageForTheme } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, forwardRef } from "react";

export const Footer = forwardRef<HTMLElement>((props, ref) => {
  const { theme } = useThemeStore();
  const params = useParams();
  const isAllowedPage = isAllowedPageForTheme(
    params as { [key: string]: string }
  );
  const isDarkMode = isAllowedPage ? theme === "night" : false;
  const navigationMenu = useNavigationMenu();
  const contactDetails = useNavigationMenuStore(
    (state) => state.contactDetails
  );

  const normalizeHref = (menuURL?: string | null) => {
    const url = (menuURL ?? "").trim();
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("/")) return url;
    return `/${url}`;
  };

  const quickLinks: { title: string; link: string }[] = [
    { title: "About Us", link: "/about" },
    { title: "Services", link: "/services" },
    { title: "Testimonials", link: "/testimonials" },
    { title: "Media", link: "/media" },
    { title: "Blogs", link: "/blog" },
    { title: "Contact Us", link: "/contact-us" },
  ];
  const usefulLinks: { title: string; link: string }[] = [
    {
      title: "Panchshil Privilege",
      link: "https://www.panchshilprivilege.com/",
    },
    { title: "Meet The City", link: "/meet-the-city" },
    { title: "PREC", link: "/prec" },
    { title: "Clients", link: "/clients" },
    {
      title: "Awards",
      link: "/awards-and-recognitions",
    },
    { title: "ESG", link: "/esg" },
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const subscriberEmailId = formData.get("subscriber_email_id") as string;
      formData.append("referer_url", window?.location?.href);
      if (!subscriberEmailId) {
        throw new Error("Email is required");
      }

      // Call the proxy route
      const response = (await updateSubscriberFormDetailsAPI(
        formData
      )) as Response;

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      setSubmitMessage("Thank you for subscribing!");
      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error updating subscriber form details:", error);
      setSubmitMessage(
        error instanceof Error ? error.message : "Failed to submit form"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      ref={ref}
      className={`w-full transition-colors ${
        !isDarkMode
          ? "bg-[#FFFAF7] text-black-chocolate"
          : "bg-black text-gray-200"
      }`}
    >
      {/* Row 1: Offices & Sales */}
      <div className="justify-center sm:justify-between items-center px-6 py-14 grid grid-cols-2 sm:flex flex-wrap gap-10 max-w-3xl mx-auto">
        {contactDetails.map((contact) => (
          <div key={contact.contact_title}>
            <div
              className={`text-sm font-display-semi tracking-[0.2em] mb-4 transition-colors ${
                !isDarkMode ? "text-black" : "text-gray-200"
              }`}
            >
              {contact.contact_title}
            </div>
            <div
              className={`space-y-2 text-sm transition-colors ${
                !isDarkMode ? "text-black-chocolate" : "text-gray-200"
              }`}
              dangerouslySetInnerHTML={{ __html: contact.contact_details }}
            />
            {contact.contact_number && (
              <div
                className={`mt-2 flex items-center gap-2 text-sm transition-colors ${
                  !isDarkMode ? "text-black-chocolate" : "text-gray-200"
                }`}
              >
                <div className={isDarkMode ? "brightness-0 invert" : ""}>
                  <Image
                    src="/assets/images/call-icon.png"
                    alt="Phone"
                    width={18}
                    height={18}
                  />
                </div>
                <Link
                  href={`tel:${contact.contact_number.replace(/\s+/g, "")}`}
                >
                  <span>{contact.contact_number}</span>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Row 2: Menus & Newsletter */}
      <div
        className={`transition-colors ${
          !isDarkMode ? "bg-[#F9F0E9]" : "bg-black"
        }`}
      >
        <div className="px-4 md:px-12 py-12 grid grid-cols-1 md:grid-cols-[0.8fr_0.8fr_0.8fr_1fr_2fr] gap-10">
          {/* Verticals */}
          <div>
            <div
              className={`text-sm font-display-semi tracking-[0.2em] mb-4 transition-colors ${
                !isDarkMode ? "text-black" : "text-gray-200"
              }`}
            >
              VERTICALS
            </div>
            <ul
              className={`space-y-3 text-sm transition-colors ${
                !isDarkMode ? "text-black-chocolate" : "text-gray-200"
              }`}
            >
              {navigationMenu?.map((item, i) => {
                if (
                  item?.menuTitle === "About" ||
                  item?.menuTitle === "International Projects"
                )
                  return null;

                return (
                  <li key={item.menuTitle + i}>
                    <Link
                      className={
                        !isDarkMode
                          ? "hover:text-gold-beige"
                          : "hover:opacity-80"
                      }
                      href={normalizeHref(item.menuURL)}
                    >
                      {item.menuTitle}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Countries */}
          <div>
            <div
              className={`text-sm font-display-semi tracking-[0.2em] mb-4 transition-colors ${
                !isDarkMode ? "text-black" : "text-gray-200"
              }`}
            >
              COUNTRIES
            </div>
            <ul
              className={`space-y-3 text-sm transition-colors ${
                !isDarkMode ? "text-black-chocolate" : "text-gray-200"
              }`}
            >
              {navigationMenu[6]?.menu?.map((item, i) => (
                <li key={item.menuTitle + i}>
                  <Link
                    className={
                      !isDarkMode ? "hover:text-gold-beige" : "hover:opacity-80"
                    }
                    href={normalizeHref(item.menuURL)}
                  >
                    {item.menuTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <div
              className={`text-sm font-display-semi tracking-[0.2em] mb-4 transition-colors ${
                !isDarkMode ? "text-black" : "text-gray-200"
              }`}
            >
              QUICK LINKS
            </div>
            <ul
              className={`space-y-3 text-sm transition-colors ${
                !isDarkMode ? "text-black-chocolate" : "text-gray-200"
              }`}
            >
              {quickLinks.map((q) => (
                <li key={q.title}>
                  <Link
                    className={
                      !isDarkMode ? "hover:text-gold-beige" : "hover:opacity-80"
                    }
                    href={q.link}
                  >
                    {q.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <div
              className={`text-sm font-display-semi tracking-[0.2em] mb-4 transition-colors ${
                !isDarkMode ? "text-black" : "text-gray-200"
              }`}
            >
              USEFUL LINKS
            </div>
            <ul
              className={`space-y-3 text-sm transition-colors ${
                !isDarkMode ? "text-black-chocolate" : "text-gray-200"
              }`}
            >
              {usefulLinks.map((u) => (
                <li key={u.title}>
                  <Link
                    className={
                      !isDarkMode ? "hover:text-gold-beige" : "hover:opacity-80"
                    }
                    href={u.link}
                    target={
                      u.title === "Panchshil Privilege" ? "_blank" : "_self"
                    }
                  >
                    {u.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <div
              className={`text-sm font-display-semi tracking-[0.2em] mb-4 transition-colors ${
                !isDarkMode ? "text-black" : "text-gray-200"
              }`}
            >
              STAY IN THE KNOW
            </div>
            <form className="space-y-1" onSubmit={handleSubmit}>
              <div className="flex items-center gap-3  pb-2">
                <input
                  type="email"
                  name="subscriber_email_id"
                  placeholder="Email Address"
                  required
                  className={`bg-transparent outline-none text-sm flex-1 border-b transition-colors ${
                    !isDarkMode
                      ? "placeholder-black/50 border-gold-beige text-black-chocolate"
                      : "placeholder-gray-400 border-gray-200 text-gray-200"
                  }`}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`text-sm underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                    !isDarkMode ? "text-gold-beige" : "text-gray-200"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
              {submitMessage && (
                <p
                  className={`text-[11px] ${
                    submitMessage.includes("Thank you")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {submitMessage}
                </p>
              )}
              <p
                className={`text-[11px] leading-relaxed tracking-wider transition-colors ${
                  !isDarkMode ? "text-black-chocolate/70" : "text-gray-200/70"
                }`}
              >
                By signing up I want to hear about new updates and masterpieces
                and agree with the{" "}
                <Link
                  className="underline"
                  href="/privacy-policy"
                  target="_blank"
                >
                  data protection policy
                </Link>{" "}
                of panchshil
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Row 3: Copyright */}
      <div
        className={`transition-colors ${
          !isDarkMode ? "bg-[#35393B] text-white" : "bg-[#35393B] text-gray-200"
        }`}
      >
        <div className=" mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="text-[12px] font-display-semi">
            PANCHSHIL &copy; {new Date().getFullYear()} - Designed &amp;
            Developed by{" "}
            <a href="https://www.theneontree.in/" target="_blank">
              The Neon Tree
            </a>
          </div>
          <div
            className={`hidden md:flex items-center gap-6 text-[12px] transition-colors ${
              !isDarkMode ? "opacity-90" : "text-gray-200"
            }`}
          >
            <Link
              className={
                !isDarkMode ? "hover:text-gold-beige" : "hover:opacity-80"
              }
              href="/terms-and-conditions"
            >
              {" "}
              Term Of Use
            </Link>
            <Link
              className={
                !isDarkMode ? "hover:text-gold-beige" : "hover:opacity-80"
              }
              href="/privacy-policy"
            >
              Privacy
            </Link>
            <Link
              className={
                !isDarkMode ? "hover:text-gold-beige" : "hover:opacity-80"
              }
              href="/disclaimer"
            >
              Disclaimer
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="https://www.facebook.com/panchshilrealty/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <div className={isDarkMode ? "brightness-0 invert" : ""}>
                <Image
                  src="/assets/images/facebook.svg"
                  alt="Facebook"
                  width={30}
                  height={30}
                />
              </div>
            </Link>
            <Link
              href="https://www.instagram.com/panchshilrealty/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <div className={isDarkMode ? "brightness-0 invert" : ""}>
                <Image
                  src="/assets/images/instagram.svg"
                  alt="Instagram"
                  width={30}
                  height={30}
                />
              </div>
            </Link>
            <Link
              href="https://www.linkedin.com/company/panchshilrealty/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <div className={isDarkMode ? "brightness-0 invert" : ""}>
                <Image
                  src="/assets/images/linked in.svg"
                  alt="LinkedIn"
                  width={30}
                  height={30}
                />
              </div>
            </Link>

            <Link
              href="https://www.youtube.com/user/panchshilrealtypune"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <div className={isDarkMode ? "brightness-0 invert" : ""}>
                <Image
                  src="/assets/images/youtube.svg"
                  alt="YouTube"
                  width={30}
                  height={30}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
