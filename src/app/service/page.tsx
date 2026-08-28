import type { Metadata } from "next";
import { servicesPage } from "@/lib/content";
import { ServicesHero } from "@/components/sections/services-page/services-hero";
import { ServicesIndex } from "@/components/sections/services-page/services-index";
import { ServicesSpotlight } from "@/components/sections/services-page/services-spotlight";
import { ServicesPeak } from "@/components/sections/services-page/services-peak";

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
      <ServicesSpotlight />
      <ServicesPeak />
    </>
  );
}
