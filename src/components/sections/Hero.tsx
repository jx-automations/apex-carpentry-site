"use client";

import { RefObject, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SITE } from "@/lib/constants";
import { getImageById } from "@/lib/images";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Hero({
  sentinelRef,
}: {
  sentinelRef: RefObject<HTMLElement | null>;
}) {
  const image = getImageById("new-builds-twin-cabins-hero")!;
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(imgRef.current, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 })
        .fromTo(headlineRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.7")
        .fromTo(subRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(ctaRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="top"
      className="dark-section relative min-h-[100dvh] flex flex-col justify-end text-[var(--color-paper)] overflow-hidden"
    >
      <div ref={imgRef} className="absolute inset-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-8 pb-16 sm:pb-24 pt-32">
        <p className="text-xs tracking-[0.2em] uppercase text-white mb-4 [text-shadow:0_1px_4px_rgba(0,0,0,0.45)]">
          {SITE.location}
        </p>
        <h1
          ref={headlineRef}
          className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] max-w-3xl"
        >
          {SITE.tagline}.
        </h1>
        <p
          ref={subRef}
          className="mt-6 text-base sm:text-lg text-[var(--color-paper)]/85 max-w-xl leading-relaxed"
        >
          New builds, renovations, additions, decks and landscaping, delivered
          with a design-led approach.
        </p>
        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="inline-flex items-center bg-[var(--color-paper)] text-[var(--color-ink)] px-7 py-3.5 text-sm tracking-wide font-medium hover:bg-white transition-colors"
          >
            Request a Quote
          </a>
          <a
            href="#work"
            className="inline-flex items-center border border-[var(--color-paper)]/50 px-7 py-3.5 text-sm tracking-wide hover:bg-white/10 transition-colors"
          >
            View Our Work
          </a>
        </div>
      </div>

      <div
        ref={sentinelRef as RefObject<HTMLDivElement>}
        className="absolute bottom-0 h-px w-full"
        aria-hidden="true"
      />

      <div className="relative z-10 hidden sm:flex justify-center pb-6">
        <span className="w-px h-10 bg-[var(--color-paper)]/40 animate-pulse" aria-hidden="true" />
      </div>
    </section>
  );
}
