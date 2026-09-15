"use client";

import { useState } from "react";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { getImageById } from "@/lib/images";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function About() {
  const [expanded, setExpanded] = useState(false);
  const image = getImageById("interiors-stairwell-landing-01")!;

  return (
    <section id="about" className="bg-[var(--color-paper-alt)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <RevealOnScroll className="relative aspect-[4/5] overflow-hidden order-2 lg:order-1">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </RevealOnScroll>

        <RevealOnScroll className="order-1 lg:order-2">
          <SectionHeading eyebrow="About Apex" title="Built With a Design-Led Approach" />
          <div className="mt-6 space-y-4 text-[var(--color-charcoal)]/85 leading-relaxed max-w-[60ch]">
            <p>
              {SITE.name} is an Auckland based residential building company,
              operating since {SITE.since}. Work is carried out under
              Licensed Building Practitioner status, covering new builds,
              renovations, additions and decks across the region.
            </p>
            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pt-1">
                  Each project moves from an initial scope through to a
                  finished space, with the same attention given to how a
                  build looks as to how it is put together. The portfolio
                  shown here reflects real Apex Carpentry projects across
                  Auckland, not stock photography.
                </p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-4 text-sm tracking-wide text-[var(--color-timber)] underline underline-offset-4 hover:text-[var(--color-timber-deep)] cursor-pointer"
            aria-expanded={expanded}
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
