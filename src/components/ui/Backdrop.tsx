/* eslint-disable @next/next/no-img-element -- a plain full-bleed <img> is lighter than next/image on a TV. */

interface BackdropProps {
  src: string;
  /** "welcome" is darker in the middle for centred copy; "home" darkens the left and bottom. */
  variant: "welcome" | "home";
}

export function Backdrop({ src, variant }: BackdropProps) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <img src={src} alt="" className="animate-slow-zoom absolute inset-0 size-full object-cover" />
      {variant === "welcome" ? (
        <>
          <div className="absolute inset-0 bg-ink/65" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(11_11_13/0.2)_0%,rgb(11_11_13/0.85)_75%)]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-linear-to-r from-ink/90 via-ink/55 to-ink/25" />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/30 to-ink/60" />
        </>
      )}
    </div>
  );
}
