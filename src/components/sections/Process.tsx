"use client";

import { useState } from "react";
import { PROCESS_STEPS } from "@/lib/constants";
import AccordionItem from "@/components/ui/AccordionItem";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function Process() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="process" className="bg-[var(--color-paper)] py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <RevealOnScroll>
          <SectionHeading eyebrow="How It Works" title="The Process" align="left" />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="mt-14">
          {PROCESS_STEPS.map((step, i) => (
            <AccordionItem
              key={step.number}
              number={step.number}
              title={step.title}
              summary={step.summary}
              detail={step.detail}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
