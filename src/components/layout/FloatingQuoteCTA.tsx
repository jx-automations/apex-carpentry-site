"use client";

import { RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import { useHasScrolledPastHero } from "@/hooks/useHasScrolledPastHero";
import { useSectionInView } from "@/hooks/useSectionInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function FloatingQuoteCTA({
  heroSentinelRef,
}: {
  heroSentinelRef: RefObject<HTMLElement | null>;
}) {
  const pastHero = useHasScrolledPastHero(heroSentinelRef);
  // Contact already has its own "Request a Quote" submit button, so hide the
  // floating one there too rather than doubling up, the same reasoning that
  // keeps it off the hero.
  const contactInView = useSectionInView("contact");
  const visible = pastHero && !contactInView;
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced) {
      gsap.set(node, { autoAlpha: visible ? 1 : 0 });
      return;
    }

    gsap.to(node, {
      autoAlpha: visible ? 1 : 0,
      y: visible ? 0 : 12,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [visible, reduced]);

  return (
    <a
      ref={ref}
      href="#contact"
      className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 bg-[var(--color-ink)] text-[var(--color-paper)] px-5 py-3 text-sm tracking-wide shadow-lg pointer-events-auto opacity-0 invisible"
      style={{ visibility: "hidden" }}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      Request a Quote
    </a>
  );
}
