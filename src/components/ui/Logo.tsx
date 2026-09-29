/* eslint-disable @next/next/no-img-element -- static brand asset, no optimisation needed. */

/** Transparent variant of public/brand/logo.png, recoloured for dark backgrounds. */
export function Logo({ className = "" }: { className?: string }) {
  return <img src="/brand/logo-dark.png" alt="Indus Hotel Hyderabad" className={className} />;
}

/** Thin gold rule with a diamond, used between headline blocks. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden>
      <span className="h-px w-28 bg-linear-to-r from-transparent to-gold/80" />
      <span className="size-2.5 rotate-45 bg-gold" />
      <span className="h-px w-28 bg-linear-to-l from-transparent to-gold/80" />
    </div>
  );
}
