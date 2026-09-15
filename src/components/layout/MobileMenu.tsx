"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const reduced = useReducedMotion();

  useScrollLock(open);
  useFocusTrap(panelRef, open, onClose);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    if (reduced) {
      gsap.set(panel, { autoAlpha: 1 });
      gsap.set(linksRef.current, { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        linksRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06, delay: 0.1, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, [open, reduced]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="dark-section fixed inset-0 z-50 bg-[var(--color-ink)] text-[var(--color-paper)] flex flex-col"
    >
      <div className="flex items-center justify-between px-4 sm:px-8 h-18 py-2.5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Image
            src="/images/brand/logo.jpg"
            alt={`${SITE.name} logo`}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="relative w-11 h-11 flex items-center justify-center"
        >
          <span className="absolute w-6 h-px bg-[var(--color-paper)] rotate-45" />
          <span className="absolute w-6 h-px bg-[var(--color-paper)] -rotate-45" />
        </button>
      </div>

      <nav
        className="flex flex-col justify-center gap-6 px-8 flex-1"
        aria-label="Mobile primary"
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            ref={(el) => {
              if (el) linksRef.current[i] = el;
            }}
            onClick={onClose}
            className="font-display text-4xl"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          ref={(el) => {
            if (el) linksRef.current[NAV_LINKS.length] = el;
          }}
          onClick={onClose}
          className="mt-4 inline-flex w-fit items-center border border-[var(--color-paper)]/40 px-6 py-3 text-sm tracking-wide"
        >
          Request a Quote
        </a>
      </nav>
    </div>
  );
}
