import type { Metadata } from "next";
import { termsPage } from "@/lib/content";
import { LegalDocument } from "@/components/sections/legal-document";

export const metadata: Metadata = {
  title: termsPage.metaTitle,
  description: termsPage.metaDescription,
  openGraph: {
    title: "Terms and Conditions | Cameron Clark Fitness",
    description: termsPage.metaDescription,
    url: "/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <LegalDocument
      heading={termsPage.heading}
      intro={termsPage.intro}
      sections={termsPage.sections}
    />
  );
}
