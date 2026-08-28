import type { Metadata } from "next";
import { servicesPage } from "@/lib/content";
import { ServicesHero } from "@/components/sections/services-page/services-hero";
import { ServicesIndex } from "@/components/sections/services-page/services-index";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Online coaching, in-person training in Dallas and the Bay Area, nutrition, recovery, and long-term partnership with Cameron Clark.",
  openGraph: {
    title: "Services | Cameron Clark Fitness",
    description:
      "Online coaching, in-person training in Dallas and the Bay Area, nutrition, recovery, and long-term partnership with Cameron Clark.",
    url: "/service",
  },
};

export default function ServicePage() {
  return (
    <>
      <ServicesHero />
      <ServicesIndex />
      <FinalCta content={servicesPage.cta} />
    </>
  );
}
