"use client";

import { useState } from "react";
import Image from "next/image";
import { SERVICES } from "@/lib/constants";
import { getImageById } from "@/lib/images";
import AccordionItem from "@/components/ui/AccordionItem";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const activeService = SERVICES[openIndex ?? 0];
  const activeImage = getImageById(activeService.imageId);

  return (
    <section id="services" className="bg-[var(--color-paper)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <RevealOnScroll>
          <SectionHeading eyebrow="What Apex Builds" title="Services" />
        </RevealOnScroll>

        <div className="mt-14 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
          <RevealOnScroll>
            <div>
              {SERVICES.map((service, i) => (
                <AccordionItem
                  key={service.number}
                  number={service.number}
                  title={service.name}
                  summary={service.summary}
                  detail={service.detail}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="hidden lg:block sticky top-28">
            {activeImage && (
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover transition-opacity duration-300"
                />
              </div>
            )}
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
