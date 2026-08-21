"use client";

import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  EnquiryFormProps,
  EnquiryFormData,
  EnquiryFormErrors,
  EnquiryPropertyGroup,
} from "@/interfaces";

function ActionButton({
  children,
  onClick,
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const baseClasses =
    "px-6 py-3 text-base font-medium hover:opacity-90 transition-all shadow-sm w-full cursor-pointer bg-gold-beige text-white disabled:opacity-70 disabled:cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}

function PropertySelect({
  groups,
  value,
  onChange,
  error,
}: {
  groups: EnquiryPropertyGroup[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div className="relative">
      <select
        className={`w-full px-4 py-2.5 pr-10 bg-white text-black-chocolate text-base border-b focus:outline-none focus:border-gold-beige appearance-none ${
          error ? "border-red-500" : "border-gold-beige"
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select Project Interested In</option>
        {groups.map((group) => (
          <optgroup
            key={group.property_category_name}
            label={group.property_category_name}
          >
            {group.properties.map((property) => (
              <option key={property} value={property}>
                {property}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black-chocolate">
        ▼
      </span>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export function EnquiryForm({
  isOpen,
  onClose,
  propertyName,
  propertyBrochure
}: EnquiryFormProps) {
  const [propertyGroups, setPropertyGroups] = useState<EnquiryPropertyGroup[]>(
    []
  );
  const [isSubmittingApi, setIsSubmittingApi] = useState(false);
  const [formData, setFormData] = useState<EnquiryFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneIsoCode: "",
    projectInterested: propertyName || "",
    message: "",
  });
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || propertyGroups.length) return;

    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/enquiry-properties");
        const data = await res.json();
        if (!res.ok) {
          console.error("Failed to load enquiry properties:", data?.error);
          return;
        }
        setPropertyGroups(data || []);
      } catch (error) {
        console.error("Error loading enquiry properties:", error);
      }
    };

    fetchProperties();
  }, [isOpen, propertyGroups.length]);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: EnquiryFormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.replace(/\D/g, "").length < 7) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.projectInterested) {
      newErrors.projectInterested = "Please select a project";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || isSubmittingApi) return;

    const submit = async () => {
      try {
        setIsSubmittingApi(true);
        const response = await fetch("/api/property-enquiry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            contactNumber: formData.phone,
            email: formData.email,
            propertyName: formData.projectInterested || propertyName || "",
            message: formData.message,
            referer_url: window?.location?.href,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          console.error("Failed to submit enquiry form:", result?.error);
          return;
        }

        if(propertyBrochure) {
          window.open(propertyBrochure, '_blank');
        }

        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            phoneIsoCode: "",
            projectInterested: propertyName || "",
            message: "",
          });
        }, 2000);
      } catch (error) {
        console.error("Error submitting property enquiry form:", error);
      } finally {
        setIsSubmittingApi(false);
      }
    };

    void submit();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof EnquiryFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-sm md:max-w-4xl mx-4 max-h-[90vh] py-8 md:py-12 px-4 overflow-y-auto rounded-lg shadow-xl">
        <div className="sticky top-0 bg-white px-6 py-4 flex items-start justify-between">
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black uppercase">
            Enquiry Form
          </h2>
          <button
            onClick={onClose}
            className="text-gold-beige hover:text-gold-beige transition-colors cursor-pointer"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="md:p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Thank you for your enquiry!
              </h3>
              <p className="text-gray-600 mt-2">
                We will get back to you shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 border-b border-gold-beige text-black-chocolate text-base placeholder-black/50 focus:outline-none focus:border-gold-beige ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                  placeholder="Enter Your First Name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 border-b border-gold-beige text-black-chocolate text-base placeholder-black/50 focus:outline-none focus:border-gold-beige ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                  placeholder="Enter Your Last Name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>

              <div>
                <PhoneInput
                  country={"in"}
                  value={formData.phone}
                  onChange={(
                    value: string,
                    country: { countryCode?: string } | undefined
                  ) => {
                    setFormData((prev) => ({
                      ...prev,
                      phone: value,
                      phoneIsoCode: country?.countryCode || "",
                    }));
                    if (errors.phone) {
                      setErrors((prev) => ({ ...prev, phone: undefined }));
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
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 border-b border-gold-beige text-black-chocolate text-base placeholder-black/50 focus:outline-none focus:border-gold-beige ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Enter Your Email Address"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <PropertySelect
                  groups={propertyGroups}
                  value={formData.projectInterested}
                  onChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      projectInterested: value,
                    }));
                    setErrors((prev) => ({
                      ...prev,
                      projectInterested: undefined,
                    }));
                  }}
                  error={errors.projectInterested}
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={1}
                  className="w-full px-4 py-2.5 border-b border-gold-beige text-black-chocolate text-base placeholder-black/50 focus:outline-none focus:border-gold-beige resize-none"
                  placeholder="Enter Your Message"
                />
              </div>

              <div className="md:col-span-2 mt-4 w-50">
                <ActionButton type="submit" disabled={isSubmittingApi}>
                  {isSubmittingApi ? "Submitting..." : "Submit Enquiry"}
                </ActionButton>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
