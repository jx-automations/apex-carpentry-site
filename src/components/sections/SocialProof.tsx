import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function SocialProof() {
  return (
    <section className="bg-[var(--color-paper)] py-16 sm:py-20 border-t border-[var(--color-line)]">
      <div className="mx-auto max-w-2xl px-4 sm:px-8 text-center">
        <RevealOnScroll>
          <p className="font-display italic text-lg text-[var(--color-charcoal)]/70">
            More project photography from current Apex Carpentry builds is
            shared on Instagram.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
