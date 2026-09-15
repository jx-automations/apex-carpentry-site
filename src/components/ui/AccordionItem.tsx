"use client";

import { useEffect, useRef, useState, useId } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AccordionItemProps {
  number: string;
  title: string;
  summary: string;
  detail: string;
  open: boolean;
  onToggle: () => void;
}

export default function AccordionItem({
  number,
  title,
  summary,
  detail,
  open,
  onToggle,
}: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();
  const [hasOpenedOnce, setHasOpenedOnce] = useState(open);
  const panelId = useId();

  // Track "has opened at least once" during render (ref), not as a set-state
  // side effect, so detail text mounts the first time a step opens and then
  // stays mounted (avoids re-clipping the closing animation).
  if (open && !hasOpenedOnce) {
    setHasOpenedOnce(true);
  }

  useEffect(() => {
    const content = contentRef.current;
    const chevron = chevronRef.current;
    if (!content) return;

    const targetHeight = open ? content.scrollHeight : 0;

    if (reduced) {
      content.style.height = open ? "auto" : "0px";
      if (chevron) chevron.style.transform = open ? "rotate(180deg)" : "rotate(0deg)";
      return;
    }

    gsap.to(content, {
      height: targetHeight,
      duration: 0.45,
      ease: "power2.inOut",
      onComplete: () => {
        if (open) content.style.height = "auto";
      },
    });
    if (chevron) {
      gsap.to(chevron, {
        rotate: open ? 180 : 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  }, [open, reduced]);

  return (
    <div className="border-b border-[var(--color-line)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center gap-4 sm:gap-6 py-6 text-left cursor-pointer group"
      >
        <span className="font-display italic text-[var(--color-timber)] text-lg sm:text-xl w-8 shrink-0">
          {number}
        </span>
        <span className="flex-1">
          <span className="block font-display text-xl sm:text-2xl">{title}</span>
          <span className="block text-sm text-[var(--color-charcoal)]/70 mt-1">
            {summary}
          </span>
        </span>
        <svg
          ref={chevronRef}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="shrink-0 text-[var(--color-charcoal)]/60"
          aria-hidden="true"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        id={panelId}
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: open ? "auto" : 0 }}
      >
        {hasOpenedOnce && (
          <p className="pb-6 pl-12 sm:pl-14 pr-4 text-[var(--color-charcoal)]/80 leading-relaxed max-w-[65ch]">
            {detail}
          </p>
        )}
      </div>
    </div>
  );
}
