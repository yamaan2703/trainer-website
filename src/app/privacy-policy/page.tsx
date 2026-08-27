import type { Metadata } from "next";
import { privacyPage } from "@/lib/content";
import { LegalDocument } from "@/components/sections/legal-document";

export const metadata: Metadata = {
  title: privacyPage.metaTitle,
  description: privacyPage.metaDescription,
  openGraph: {
    title: "Privacy Policy | Cameron Clark Fitness",
    description: privacyPage.metaDescription,
    url: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      heading={privacyPage.heading}
      intro={privacyPage.intro}
      sections={privacyPage.sections}
    />
  );
}
