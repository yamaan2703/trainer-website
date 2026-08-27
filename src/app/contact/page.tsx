import type { Metadata } from "next";
import { contactPage } from "@/lib/content";
import { ContactSection } from "@/components/sections/contact/contact-section";

export const metadata: Metadata = {
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
  openGraph: {
    title: "Contact | Cameron Clark Fitness",
    description: contactPage.metaDescription,
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactSection />;
}
