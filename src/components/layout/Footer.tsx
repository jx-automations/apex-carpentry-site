import Image from "next/image";
import { NAV_LINKS, SERVICES, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="dark-section bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/brand/logo.jpg"
            alt={`${SITE.name} logo`}
            width={64}
            height={64}
            className="rounded-full mb-4"
          />
          <p className="text-sm text-[var(--color-paper)]/70 max-w-[24ch]">
            {SITE.tagline}.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-widest uppercase text-[var(--color-paper)]/50 mb-4">
            Navigate
          </h3>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-[var(--color-paper)]/80 hover:text-[var(--color-paper)] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-widest uppercase text-[var(--color-paper)]/50 mb-4">
            Services
          </h3>
          <ul className="space-y-2.5">
            {SERVICES.map((service) => (
              <li key={service.number} className="text-sm text-[var(--color-paper)]/80">
                {service.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-widest uppercase text-[var(--color-paper)]/50 mb-4">
            Apex Carpentry Ltd
          </h3>
          <p className="text-sm text-[var(--color-paper)]/80">{SITE.location}</p>
          <p className="mt-3 inline-flex items-center gap-2 text-xs tracking-wide text-[var(--color-paper)]/60 border border-[var(--color-paper)]/20 px-3 py-1.5 rounded-full w-fit">
            Since {SITE.since} &middot; {SITE.credential}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-6 flex flex-col sm:flex-row gap-2 items-center justify-between text-xs text-[var(--color-paper)]/50">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Auckland, New Zealand</p>
        </div>
      </div>
    </footer>
  );
}
