import { type ReactNode, type HTMLAttributes } from "react";

export function MonoLabel({
  children,
  className = "",
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.14em] text-muted ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 inline-flex items-center gap-2">
      <span className="h-px w-8 bg-stroke-hi" aria-hidden />
      <MonoLabel className="text-ink/80">{children}</MonoLabel>
    </div>
  );
}

export function ChipTag({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "destructive" | "accent";
}) {
  const toneCls =
    tone === "destructive"
      ? "border-[color:var(--destructive)]/60 text-[color:var(--destructive)]"
      : tone === "accent"
        ? "border-accent/60 text-accent"
        : "border-stroke text-muted";
  return (
    <span
      className={`inline-flex items-center rounded-[4px] border px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.16em] ${toneCls}`}
    >
      {children}
    </span>
  );
}

export function DiamondMark({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="13.7"
        y="50"
        width="51.3"
        height="51.3"
        rx="8.85"
        transform="rotate(-45 13.7 50)"
        stroke="currentColor"
        strokeWidth="3.28"
        fill="none"
      />
      <rect
        x="35.7"
        y="50"
        width="51.3"
        height="51.3"
        rx="8.85"
        transform="rotate(-45 35.7 50)"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="3.28"
      />
    </svg>
  );
}

export function Section({
  id,
  eyebrow,
  children,
  bordered = true,
  className = "",
}: {
  id?: string;
  eyebrow?: ReactNode;
  children: ReactNode;
  bordered?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative ${bordered ? "border-b border-stroke" : ""} ${className}`}
    >
      <div className="shell py-20 lg:py-32">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <div className="mb-12 max-w-3xl lg:mb-16">
      <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted lg:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Cta({
  href,
  children,
  variant = "primary",
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "glass";
  external?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium tracking-tight transition-colors";
  const variants =
    variant === "primary"
      ? "bg-accent text-[#1a1300] hover:bg-accent/90"
      : variant === "glass"
        ? "border border-white/10 bg-white/[0.06] backdrop-blur-md text-ink hover:bg-white/[0.10]"
        : "border border-stroke-hi text-ink hover:bg-surface";
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${variants} ${className}`}
    >
      {children}
    </a>
  );
}
