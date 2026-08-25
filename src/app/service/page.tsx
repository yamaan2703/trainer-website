import type { Metadata } from "next";
import { servicesPage } from "@/lib/content";
import { ServicesHero } from "@/components/sections/services-page/services-hero";
import { ServicesProgram } from "@/components/sections/services-page/services-program";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Programs that fit your life — Elevated Professional online coaching and tailored in-person training with Cameron Clark.",
  openGraph: {
    title: "Services | Cameron Clark Fitness",
    description:
      "Programs that fit your life — Elevated Professional online coaching and tailored in-person training with Cameron Clark.",
    url: "/service",
  },
};

export default function ServicePage() {
  return (
    <>
      <ServicesHero />
      {servicesPage.programs.map((program) => (
        <ServicesProgram key={program.id} program={program} />
      ))}
      <FinalCta content={servicesPage.cta} />
    </>
  );
}
