import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function Positioning() {
  return (
    <section className="bg-[var(--color-paper)] py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-8 text-center">
        <RevealOnScroll>
          <p className="font-display italic text-sm tracking-widest uppercase text-[var(--color-timber)] mb-6">
            Design-led builds across Auckland
          </p>
          <p className="font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.4]">
            Every project starts with a clear plan and finishes with a
            considered result. From framing through to final fixings, Apex
            Carpentry Ltd takes a design-led approach to residential building,
            working with each site&apos;s shape, light and materials rather
            than a one-size template.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
