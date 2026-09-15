"use client";

import { useState } from "react";
import Image from "next/image";
import { NAV_LINKS, SITE } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="dark-section sticky top-0 z-40 bg-[var(--color-ink)] text-[var(--color-paper)] border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 flex items-center justify-between h-18 py-2.5">
        <a href="#top" className="flex items-center gap-3 shrink-0" aria-label={`${SITE.name} home`}>
          <Image
            src="/images/brand/logo.jpg"
            alt={`${SITE.name} logo`}
            width={48}
            height={48}
            className="rounded-full"
            priority
          />
          <span className="font-display text-lg tracking-wide hidden sm:inline">
            {SITE.shortName}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-[var(--color-paper)]/80 hover:text-[var(--color-paper)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center border border-[var(--color-paper)]/40 px-5 py-2.5 text-sm tracking-wide hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)] transition-colors"
          >
            Request a Quote
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-11 h-11 -mr-2"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className="block w-6 h-px bg-[var(--color-paper)]" />
            <span className="block w-6 h-px bg-[var(--color-paper)]" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
