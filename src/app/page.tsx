import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Services } from "@/components/sections/services";
import { Timeline } from "@/components/sections/timeline";
import { Story } from "@/components/sections/story";
import { About } from "@/components/sections/about";
import { Outcomes } from "@/components/sections/outcomes";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Services />
      <Timeline />
      <Story />
      {/* <About /> */}
      <Outcomes />
      <Process />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
