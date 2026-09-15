# Apex Carpentry Ltd — Website Concept

A premium, design-led marketing website for Apex Carpentry Ltd, an Auckland
residential building company. Built with Next.js, TypeScript, Tailwind CSS
and GSAP.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS (custom design tokens in `src/app/globals.css`)
- GSAP + ScrollTrigger for scroll-based motion, gated by `prefers-reduced-motion`
- `next/image` for responsive, optimized images
- `next/font/google` (Fraunces + Inter)

## Getting started

```bash
npm install
npm run dev
```

## Project structure

- `src/app` — routes, layout, metadata, sitemap/robots
- `src/components/layout` — Header, MobileMenu, Footer, FloatingQuoteCTA
- `src/components/sections` — one component per homepage section
- `src/components/ui` — shared primitives (Lightbox, AccordionItem, SectionHeading)
- `src/components/motion` — GSAP provider and scroll-reveal wrapper
- `src/lib/images.ts` — single source of truth for every photo used on the site
- `src/lib/estimator` — the quote estimator's state machine (pure, framework-agnostic)
- `src/hooks` — scroll lock, focus trap, reduced motion, scroll-past-hero
- `scripts/process-images.mjs` — one-off pipeline that resizes/strips metadata
  from the raw source photography into `public/images/<category>/`

## Content notes

- Every factual claim on the site (Auckland, since 2016, LBP, the five listed
  services) is sourced from the business's own logo and Instagram bio. No
  pricing, testimonials, team members, or unverified claims are included.
- The quote estimator is a qualification tool only. It deliberately never
  shows a dollar figure or range, since no real Apex Carpentry pricing data
  exists to base one on.
- The contact form is UI only; there is no backend wired up yet, and the
  success state says so explicitly rather than claiming a message was sent.

## Deployment

Not yet deployed. A new GitHub repository and Vercel project should be
created once this concept is reviewed and approved.
