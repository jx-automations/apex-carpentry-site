import { WHY_APEX } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function WhyApex() {
  return (
    <section className="dark-section bg-[var(--color-ink)] text-[var(--color-paper)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <RevealOnScroll>
          <SectionHeading
            eyebrow="Why Apex"
            title="What Sets the Work Apart"
            dark
          />
        </RevealOnScroll>

        <div className="mt-14 grid sm:grid-cols-2 gap-8 lg:gap-12">
          {WHY_APEX.map((item, i) => (
            <RevealOnScroll key={item.title} delay={0.08 * i}>
              <div className="border-t border-[var(--color-paper)]/20 pt-6">
                <h3 className="font-display text-xl sm:text-2xl mb-2">
                  {item.title}
                </h3>
                <p className="text-[var(--color-paper)]/70 leading-relaxed max-w-[50ch]">
                  {item.detail}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
