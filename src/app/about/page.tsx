import type { Metadata } from "next";
import { aboutPage } from "@/lib/content";
import { AboutHero } from "@/components/sections/about/about-hero";
import { AboutOrigin } from "@/components/sections/about/about-origin";
import { AboutBeyond } from "@/components/sections/about/about-beyond";
import { AboutRoadmap } from "@/components/sections/about/about-roadmap";
import { AboutValues } from "@/components/sections/about/about-values";
import { AboutDifferent } from "@/components/sections/about/about-different";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Cameron Clark — from a $500 paycheck to life-changing rebuilds for high-performing professionals.",
  openGraph: {
    title: "About | Cameron Clark Fitness",
    description:
      "Meet Cameron Clark — from a $500 paycheck to life-changing rebuilds for high-performing professionals.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutOrigin />
      <AboutBeyond />
      <AboutRoadmap />
      <AboutValues />
      <AboutDifferent />
      <FinalCta content={aboutPage.cta} />
    </>
  );
}
