interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
  dark = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === "center" ? "text-center mx-auto" : ""} max-w-2xl ${className}`}
    >
      {eyebrow && (
        <p
          className={`font-display italic text-sm tracking-widest uppercase mb-3 ${
            dark ? "text-[var(--color-paper)]/60" : "text-[var(--color-timber)]"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.15]">
        {title}
      </h2>
    </div>
  );
}
