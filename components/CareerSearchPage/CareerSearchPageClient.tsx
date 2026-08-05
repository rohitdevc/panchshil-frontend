"use client";

import { useMemo, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CareerHero } from "@/components/CareerHero";
import { CareerSearchListingsDetails } from "@/components/CareerSearchListingsDetails";
import { CareerSearchFilterBar } from "@/components/CareerSearchFilterBar";
import type { CareerSearchPageData } from "@/app/careers/vacancies/career-search-page.data";

type CareerSearchPageClientProps = {
  data: CareerSearchPageData;
};

export default function CareerSearchPageClient({
  data,
}: CareerSearchPageClientProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string[]>([]);
  const [selectedFunction, setSelectedFunction] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);

  const locationOptions = useMemo(
    () => [...new Set(data.jobs.map((job) => job.location))],
    [data.jobs]
  );
  const skillOptions = useMemo(
    () => [...new Set(data.jobs.flatMap((job) => job.skills))],
    [data.jobs]
  );
  const functionOptions = useMemo(
    () => [...new Set(data.jobs.map((job) => job.functionArea))],
    [data.jobs]
  );
  const experienceOptions = useMemo(
    () => [...new Set(data.jobs.map((job) => job.experienceLevel))],
    [data.jobs]
  );

  const filteredJobs = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return data.jobs.filter((job) => {
      const searchTarget = [
        job.title,
        job.summary,
        job.location,
        job.department,
        job.functionArea,
        ...job.skills,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchTarget.includes(normalizedSearch);
      const matchesLocation =
        selectedLocation.length === 0 ||
        selectedLocation.includes(job.location);
      const matchesSkill =
        selectedSkill.length === 0 ||
        selectedSkill.some((skill) => job.skills.includes(skill));
      const matchesFunction =
        selectedFunction.length === 0 ||
        selectedFunction.includes(job.functionArea);
      const matchesExperience =
        selectedExperience.length === 0 ||
        selectedExperience.includes(job.experienceLevel);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesSkill &&
        matchesFunction &&
        matchesExperience
      );
    });
  }, [
    data.jobs,
    searchText,
    selectedLocation,
    selectedSkill,
    selectedFunction,
    selectedExperience,
  ]);
  const filteredJobsKey = useMemo(
    () => filteredJobs.map((job) => job.id).join("|"),
    [filteredJobs]
  );

  return (
    <main className="min-h-screen bg-[#FFFAF7]">
      <Header />
      <section className="min-h-screen flex flex-col bg-white">
        <CareerHero hero={data.hero} compact />
        <CareerSearchFilterBar
          searchText={searchText}
          selectedLocation={selectedLocation}
          selectedSkill={selectedSkill}
          selectedFunction={selectedFunction}
          selectedExperience={selectedExperience}
          locationOptions={locationOptions}
          skillOptions={skillOptions}
          functionOptions={functionOptions}
          experienceOptions={experienceOptions}
          onSearchTextChange={setSearchText}
          onLocationChange={setSelectedLocation}
          onSkillChange={setSelectedSkill}
          onFunctionChange={setSelectedFunction}
          onExperienceChange={setSelectedExperience}
        />
      </section>
      <CareerSearchListingsDetails
        key={filteredJobsKey}
        jobs={filteredJobs}
        itemsPerPage={data.itemsPerPage}
      />
      <Footer />
    </main>
  );
}
