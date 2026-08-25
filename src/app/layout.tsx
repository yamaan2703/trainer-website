import type { Metadata, Viewport } from "next";
import { Roboto_Condensed } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import { Preloader } from "@/components/loader/preloader";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
});

const SITE_URL = "https://www.cameronclarkfitness.com";
const SITE_TITLE = "Cameron Clark Fitness | Personal Fitness Coach";
const SITE_DESCRIPTION =
  "Cameron Clark Fitness offers a Personal Fitness Coach Online to guide you with tailored workouts, expert support and strategies for real results.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Cameron Clark Fitness",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Cameron Clark Fitness",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${robotoCondensed.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Preloader />
        <AppProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
