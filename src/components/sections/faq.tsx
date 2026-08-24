import { faq } from "@/lib/content";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <section className="section-pad bg-surface">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Eyebrow className="text-ink-muted">Frequently Asked</Eyebrow>
          <h2 className="mt-6 text-[10vw] font-black uppercase leading-[0.95] tracking-tight sm:text-[3.2vw]">
            Questions
          </h2>
        </div>

        <Accordion className="lg:col-span-8">
          {faq.map((item, i) => (
            <AccordionItem
              key={item.question}
              value={`item-${i}`}
              className="border-t border-hairline not-last:border-b-0 first:border-t-0"
            >
              <AccordionTrigger className="rounded-none py-6 text-lg font-semibold text-ink hover:no-underline sm:text-xl">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base text-ink-muted sm:text-lg">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
