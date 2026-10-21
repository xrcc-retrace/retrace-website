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

/** Real identifier from the codebase (tool name, endpoint, field, model id). */
export function Id({ children }: { children: ReactNode }) {
  return <code className="ident">{children}</code>;
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


/** Section opener: a heading and one lede, left-aligned, no eyebrow. */
export function SectionHeader({
  title,
  lede,
  className = "",
}: {
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-[46rem] ${className}`}>
      <h2 className="text-balance text-[30px] font-medium leading-[1.08] tracking-[-0.025em] text-ink sm:text-[40px] lg:text-[48px]">
        {title}
      </h2>
      {lede && (
        <p className="mt-5 max-w-[40rem] text-pretty text-[16.5px] leading-[1.65] text-muted lg:text-[17.5px]">
          {lede}
        </p>
      )}
    </div>
  );
}

/**
 * Annotated code panel. `lines` is the literal text (rendered verbatim) and
 * `notes` is an optional list of short annotations rendered under it. Keeping
 * payloads as plain strings means the page can't drift from real wire shapes
 * through JSX formatting.
 */
export function CodeBlock({
  title,
  code,
  notes,
  tone = "default",
  className = "",
}: {
  title?: ReactNode;
  code: string;
  notes?: ReactNode[];
  tone?: "default" | "accent";
  className?: string;
}) {
  const border = tone === "accent" ? "border-accent/40" : "border-stroke";
  return (
    <figure
      className={`min-w-0 overflow-hidden rounded-[8px] border ${border} bg-surface/60 ${className}`}
    >
      {title && (
        <figcaption className="flex items-center justify-between gap-3 border-b border-stroke px-4 py-2.5">
          <span className="font-mono text-[11px] tracking-[0.04em] text-muted">
            {title}
          </span>
        </figcaption>
      )}
      <pre className="overflow-x-auto px-4 py-3.5 text-[12.5px] leading-[1.6] text-ink">
        <code>{code}</code>
      </pre>
      {notes && notes.length > 0 && (
        <ul className="border-t border-stroke px-4 py-3 text-[13px] leading-[1.55] text-muted">
          {notes.map((n, i) => (
            <li key={i} className="flex gap-2.5 py-0.5">
              <span
                aria-hidden
                className={`mt-[9px] h-px w-3 shrink-0 ${tone === "accent" ? "bg-accent" : "bg-stroke-hi"}`}
              />
              <span className="min-w-0">{n}</span>
            </li>
          ))}
        </ul>
      )}
    </figure>
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
