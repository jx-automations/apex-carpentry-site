import Image from "next/image";
import { getFeaturedImages } from "@/lib/images";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

const LABELS: Record<string, string> = {
  "new-builds-twin-cabins-hero": "New Build",
  "new-builds-twin-cabins-02": "New Build",
  "new-builds-shed-skillion-01": "New Build",
  "renovations-villa-dormer-02": "Renovation",
  "decks-coastal-staircase-01": "Outdoor Living",
  "interiors-bathroom-arched-mirror-01": "Interior Finish",
};

export default function FeaturedWork() {
  const featured = getFeaturedImages();
  const [large, ...rest] = featured;

  return (
    <section id="work" className="bg-[var(--color-paper-alt)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <RevealOnScroll>
          <SectionHeading eyebrow="Featured Work" title="Recent Auckland Projects" />
        </RevealOnScroll>

        <div className="mt-14 grid lg:grid-cols-2 gap-6 lg:gap-8">
          <RevealOnScroll className="relative aspect-[4/5] lg:aspect-auto lg:h-full overflow-hidden group">
            <Image
              src={large.src}
              alt={large.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute bottom-4 left-4 bg-[var(--color-ink)]/85 text-[var(--color-paper)] text-xs tracking-widest uppercase px-3 py-1.5">
              {LABELS[large.id] ?? "Residential Build"}
            </span>
          </RevealOnScroll>

          <div className="grid grid-cols-2 gap-6 lg:gap-8">
            {rest.slice(0, 4).map((img, i) => (
              <RevealOnScroll
                key={img.id}
                delay={0.1 * (i + 1)}
                className="relative aspect-[4/5] overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 bg-[var(--color-ink)]/85 text-[var(--color-paper)] text-[10px] tracking-widest uppercase px-2.5 py-1">
                  {LABELS[img.id] ?? "Residential Build"}
                </span>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
