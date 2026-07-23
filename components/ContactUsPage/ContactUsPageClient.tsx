"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import AboutUsHero from "@/components/AboutUsHero/AboutUsHero";
import { branches } from "@/app/contact-us/contact.data";
import { Button } from "../Button";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AboutUsHeroContent } from "@/app/about/about.data";

const MAP_STYLE: google.maps.MapTypeStyle[] = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#5c5c5c" }],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#e8e8e8" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#d0d0d0" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9e6f5" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#e8f0e8" }],
  },
];

const PROPERTY_PIN_SVG =
  '<svg width="65" height="65" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.626 2.29A4.92 4.92 0 005.13.848 4.92 4.92 0 001.635 2.29c-1.926 1.922-2.18 4.642-.31 7.408.95 1.397 3.805 4.905 3.805 4.905s2.857-3.508 3.806-4.905c1.87-2.757 1.616-5.476-.31-7.408zM5.13 8.884A2.967 2.967 0 012.161 5.92a2.973 2.973 0 012.97-2.963A2.972 2.972 0 018.1 5.92a2.972 2.972 0 01-2.97 2.963z" fill="#9E8C70"/></svg>';

const PROPERTY_PIN_ICON =
  "data:image/svg+xml," + encodeURIComponent(PROPERTY_PIN_SVG);

interface ContactLocation {
  id: string;
  title: string;
  lat: number;
  lng: number;
  zoom: number;
}

const contactLocations: ContactLocation[] = [
  {
    id: "head-office",
    title: "Head Office",
    lat: 18.553319413518878,
    lng: 73.89176548536943,
    zoom: 12,
  },
  {
    id: "corporate-office",
    title: "Corporate Office",
    lat: 18.927970578475424,
    lng: 72.8219189681855,
    zoom: 15,
  },
  /*
  {
    id: "international",
    title: "International",
    lat: 25.2272699023725,
    lng: 55.291459563842864,
    zoom: 12,
  }, */
];

export default function ContactUsPageClient({
  hero,
}: {
  hero: AboutUsHeroContent;
}) {
  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    message: string;
    purpose: string;
  }>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
    purpose: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [purposeOptions, setPurposeOptions] = useState<string[]>([]);
  const [isPurposeLoading, setIsPurposeLoading] = useState(true);
  const [isPurposeOpen, setIsPurposeOpen] = useState(false);
  const purposeRef = useRef<HTMLDivElement | null>(null);
  const [activeLocationId, setActiveLocationId] = useState<string | null>(
    "head-office"
  );
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Record<string, google.maps.Marker>>({});
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        purposeRef.current &&
        !purposeRef.current.contains(event.target as Node)
      ) {
        setIsPurposeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOptions({
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      v: "weekly",
    });

    importLibrary("maps").then(() => {
      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: contactLocations[0].lat, lng: contactLocations[0].lng },
        zoom: contactLocations[0].zoom,
        styles: MAP_STYLE,
        disableDefaultUI: true,
      });

      mapInstance.current = map;

      contactLocations.forEach((loc) => {
        const marker = new google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map,
          title: loc.title,
          icon: {
            url: PROPERTY_PIN_ICON,
            scaledSize: new google.maps.Size(48, 65),
            anchor: new google.maps.Point(24, 65),
          },
        });

        markersRef.current[loc.id] = marker;

        marker.addListener("click", () => {
          setActiveLocationId(loc.id);
          map.moveCamera({
            center: { lat: loc.lat, lng: loc.lng },
            zoom: loc.zoom,
          });
          infoWindowRef.current?.close();
        });
      });

      return () => {
        Object.values(markersRef.current).forEach((m) => m.setMap(null));
        markersRef.current = {};
      };
    });
  }, []);

  useEffect(() => {
    const fetchReasons = async () => {
      try {
        const res = await fetch("/api/contact-us-reasons");
        const json = await res.json();
        if (json.success && json.data) {
          const reasons = Array.isArray(json.data)
            ? json.data
            : (json.data.reasons ?? json.data.data ?? []);
          setPurposeOptions(
            reasons
              .map(
                (
                  r: string | { reason?: string; name?: string; title?: string }
                ) =>
                  typeof r === "string"
                    ? r
                    : (r.reason ?? r.name ?? r.title ?? "")
              )
              .filter(Boolean)
          );
        }
      } catch (e) {
        console.error("Failed to load contact reasons", e);
      } finally {
        setIsPurposeLoading(false);
      }
    };
    fetchReasons();
  }, []);

  const handlePurposeSelect = (value: string) => {
    setForm((s) => ({ ...s, purpose: value }));
    setIsPurposeOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitResult(null);

    const fieldErrors: Record<string, string> = {};
    if (!form.firstName.trim())
      fieldErrors.firstName = "First name is required";
    if (!form.lastName.trim()) fieldErrors.lastName = "Last name is required";
    if (!form.purpose) fieldErrors.purpose = "Please select a purpose";
    if (!form.phone.trim()) fieldErrors.phone = "Contact number is required";
    if (!form.email.trim()) {
      fieldErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      fieldErrors.email = "Enter a valid email address";
    }
    if (!form.message.trim()) fieldErrors.message = "Message is required";

    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("enquiry_first_name", form.firstName);
      formData.append("enquiry_last_name", form.lastName);
      formData.append("enquiry_reason", form.purpose);
      formData.append("enquiry_email_id", form.email);
      formData.append("enquiry_mobile_number", form.phone);
      formData.append("enquiry_message", form.message);

      const res = await fetch("/api/enquiry-form-details", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        const serverErrors: Record<string, string> = {};
        if (data.errors && Array.isArray(data.errors)) {
          const fieldMap: Record<string, string> = {
            enquiry_first_name: "firstName",
            enquiry_last_name: "lastName",
            enquiry_email_id: "email",
            enquiry_mobile_number: "phone",
            enquiry_message: "message",
            enquiry_reason: "purpose",
          };
          data.errors.forEach((err: { path?: string; msg?: string }) => {
            if (err.path && err.msg) {
              const formField = fieldMap[err.path] || err.path;
              serverErrors[formField] = err.msg;
            }
          });
        }
        if (Object.keys(serverErrors).length > 0) {
          setErrors(serverErrors);
        } else {
          setSubmitResult({
            type: "error",
            message: data.error || "Submission failed. Please try again.",
          });
        }
        return;
      }

      setSubmitResult({
        type: "success",
        message:
          data?.display_message ||
          "Thank you! Your enquiry has been submitted successfully.",
      });
      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
        purpose: "",
      });
      setErrors({});
    } catch {
      setSubmitResult({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const panToLocation = (location: ContactLocation) => {
    if (!mapInstance.current) return;

    mapInstance.current.moveCamera({
      center: { lat: location.lat, lng: location.lng },
      zoom: location.zoom,
    });

    setTimeout(() => {
      if (mapInstance.current) {
        mapInstance.current.panBy(0, -100);
      }
    }, 350);

    setActiveLocationId(location.id);
    infoWindowRef.current?.close();
  };

  return (
    <main className="min-h-screen bg-[#FFFAF7]">
      <Header />
      <section className="bg-white">
        <AboutUsHero hero={hero} />
      </section>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="text-lg font-medium tracking-[0.2em] text-gold-beige mb-2 uppercase">
              Get In Touch
            </div>
            <h2 className="text-2xl md:text-[28px] font-display-semi text-black uppercase mb-8 md:mb-12">
              Send Us A Message
            </h2>
            <p className="text-gray-600 max-w-xl mb-8">
              Whether you’re exploring a new residence, planning a partnership
              or simply curious about our portfolio, our team is here to help.
            </p>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="relative">
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full pr-4 py-2.5 border-b border-gold-beige text-black-chocolate text-base placeholder-black/50 focus:outline-none focus:border-gold-beige "
                />
                {errors.firstName && (
                  <p className="text-red-500 text-[10px] absolute -bottom-[15px] left-0">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full pr-4 py-2.5 border-b border-gold-beige text-black-chocolate text-base placeholder-black/50 focus:outline-none focus:border-gold-beige "
                />
                {errors.lastName && (
                  <p className="text-red-500 text-[10px] absolute -bottom-[15px] left-0">
                    {errors.lastName}
                  </p>
                )}
              </div>
              {/* Purpose dropdown */}
              <div
                className="relative md:col-span-2"
                ref={(el) => {
                  purposeRef.current = el;
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsPurposeOpen((s) => !s)}
                  className={`w-full flex items-center justify-between pr-4 py-2.5 bg-white text-black-chocolate text-base border-b focus:outline-none focus:border-gold-beige appearance-none border-gold-beige`}
                >
                  <span className={!form.purpose ? "text-[#888]" : ""}>
                    {form.purpose || "Purpose of Enquiry"}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isPurposeOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isPurposeOpen && (
                  <div className="absolute top-full left-0 mb-2 border border-golden-beige shadow-lg min-w-[220px] max-h-60 overflow-y-auto z-10 bg-white">
                    {isPurposeLoading ? (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        Loading...
                      </div>
                    ) : purposeOptions.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        No options available
                      </div>
                    ) : (
                      <ul>
                        {purposeOptions.map((option) => {
                          const selected = form.purpose === option;
                          return (
                            <li key={option}>
                              <button
                                type="button"
                                onClick={() => handlePurposeSelect(option)}
                                className={`w-full text-black-chocolate text-left px-4 py-2 cursor-pointer text-sm flex items-center gap-2 ${selected ? "bg-gold-beige font-medium text-white" : ""}`}
                              >
                                <span
                                  className={`w-3 h-3 border flex items-center justify-center ${selected ? "bg-gold-beige border-white" : "border-black"}`}
                                >
                                  {selected && (
                                    <svg
                                      className="w-3 h-3 text-white"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </span>
                                {option}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}
                {errors.purpose && (
                  <p className="text-red-500 text-[10px] absolute -bottom-[15px] left-0">
                    {errors.purpose}
                  </p>
                )}
              </div>

              <div className="relative">
                <PhoneInput
                  country={"in"}
                  value={form.phone}
                  onChange={(
                    value: string,
                    country: { countryCode?: string } | undefined
                  ) => {
                    setForm((prev) => ({
                      ...prev,
                      phone: value,
                      phoneIsoCode: country?.countryCode || "",
                    }));
                    if (errors.phone) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.phone;
                        return next;
                      });
                    }
                  }}
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                  containerClass="w-full border-b border-gold-beige py-[4.5px]"
                  buttonClass="!bg-transparent !border-none !shadow-none !rounded-none"
                  inputClass="!w-full !bg-transparent !border-none !shadow-none !rounded-none !text-black-chocolate !text-base placeholder-black/50 focus:!outline-none"
                  dropdownClass="!shadow-lg !border !border-gold-beige !rounded-none !text-black"
                  placeholder="Enter Your Contact Number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-[10px] absolute -bottom-[15px] left-0">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full pr-4 py-2.5 border-b border-gold-beige text-black-chocolate text-base placeholder-black/50 focus:outline-none focus:border-gold-beige "
                />
                {errors.email && (
                  <p className="text-red-500 text-[10px] absolute -bottom-[15px] left-0">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="md:col-span-2 relative">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className="w-full border-b border-gold-beige text-black-chocolate text-base placeholder-black/50 focus:outline-none focus:border-gold-beige "
                />
                {errors.message && (
                  <p className="text-red-500 text-[10px] absolute -bottom-[15px] left-0">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2 mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <Button
                    type="submit"
                    variant="signature-outline"
                    size="sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>
                {submitResult && (
                  <p
                    className={`text-sm ${
                      submitResult.type === "success"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {submitResult.message}
                  </p>
                )}
              </div>
            </form>
          </div>

          <div>
            <div className="w-full h-[420px] shadow-lg relative">
              <div className=" absolute top-0 md:top-3 left-0 md:left-3 z-10 flex flex-col md:flex-row gap-2  px-3 py-2 rounded">
                {contactLocations.map((loc) => (
                  <Button
                    key={loc.id}
                    variant="signature-outline"
                    size="sm"
                    onClick={() => panToLocation(loc)}
                    className={
                      activeLocationId === loc.id
                        ? "bg-gold-beige text-white"
                        : "bg-white"
                    }
                  >
                    {loc.title}
                  </Button>
                ))}
              </div>

              <div ref={mapRef} className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((b) => (
            <div key={b.title} className="bg- text-black border p-8 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#FFF6F2] mb-4 flex items-center justify-center">
                {!b.phone ? (
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
                      stroke="#9e8c70"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="#9e8c70"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                    fill="#9e8c70"
                  >
                    <g
                      style={{
                        stroke: "none",
                        strokeWidth: 0,
                        strokeDasharray: "none",
                        strokeLinecap: "butt",
                        strokeLinejoin: "miter",
                        strokeMiterlimit: 10,
                        fill: "#9e8c70",
                        fillRule: "nonzero",
                        opacity: 1,
                      }}
                      stroke="#9e8c70"
                      transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                    >
                      <path
                        d="M 45 90 c -1.062 0 -2.043 -0.561 -2.583 -1.475 l -4.471 -7.563 c -9.222 -15.591 -17.933 -30.317 -20.893 -36.258 c -2.086 -4.277 -3.138 -8.852 -3.138 -13.62 C 13.916 13.944 27.86 0 45 0 c 17.141 0 31.085 13.944 31.085 31.084 c 0 4.764 -1.051 9.339 -3.124 13.596 c -0.021 0.042 -0.042 0.083 -0.063 0.124 c -3.007 6.005 -11.672 20.654 -20.843 36.159 l -4.472 7.563 C 47.044 89.439 46.062 90 45 90 z M 45 6 C 31.168 6 19.916 17.253 19.916 31.084 c 0 3.848 0.847 7.539 2.518 10.969 c 2.852 5.721 11.909 21.033 20.667 35.839 L 45 81.104 l 1.89 -3.196 c 8.763 -14.813 17.823 -30.131 20.687 -35.879 c 0.012 -0.022 0.023 -0.045 0.035 -0.067 c 1.642 -3.406 2.474 -7.065 2.474 -10.877 C 70.085 17.253 58.832 6 45 6 z"
                        style={{
                          stroke: "none",
                          strokeWidth: 1,
                          strokeDasharray: "none",
                          strokeLinecap: "butt",
                          strokeLinejoin: "miter",
                          strokeMiterlimit: 10,
                          fill: "#9e8c70",
                          fillRule: "nonzero",
                          opacity: 1,
                        }}
                        transform=" matrix(1 0 0 1 0 0) "
                        strokeLinecap="round"
                      />
                      <path
                        d="M 45 44.597 c -8.076 0 -14.646 -6.57 -14.646 -14.646 S 36.924 15.306 45 15.306 c 8.075 0 14.646 6.57 14.646 14.646 S 53.075 44.597 45 44.597 z M 45 21.306 c -4.767 0 -8.646 3.878 -8.646 8.646 s 3.878 8.646 8.646 8.646 c 4.768 0 8.646 -3.878 8.646 -8.646 S 49.768 21.306 45 21.306 z"
                        style={{
                          stroke: "none",
                          strokeWidth: 1,
                          strokeDasharray: "none",
                          strokeLinecap: "butt",
                          strokeLinejoin: "miter",
                          strokeMiterlimit: 10,
                          fill: "#9e8c70",
                          fillRule: "nonzero",
                          opacity: 1,
                        }}
                        transform=" matrix(1 0 0 1 0 0) "
                        strokeLinecap="round"
                      />
                    </g>
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-display-semi mb-3">{b.title}</h3>
              <p className="text-gray-700 whitespace-pre-line mb-4 text-base">
                {b.address}
              </p>
              <p className="text-gray-700 whitespace-pre-line mb-4 text-base">
                {b.type === "email"
                  ? b.emailData?.map((e, index) => (
                      <p key={index}>
                        <span>{e.label}: </span>

                        <a
                          href={`mailto:${e.email}`}
                          className="text-gold-beige hover:underline"
                        >
                          {e.email}
                        </a>
                      </p>
                    ))
                  : null}
              </p>

              {b.phone && (
                <a
                  href={`tel:${b.link}`}
                  className="text-gray-700 hover:text-gold-beige transition-colors text-base"
                >
                  {b.phone}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
