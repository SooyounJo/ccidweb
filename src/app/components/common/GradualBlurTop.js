"use client";

export default function GradualBlurTop({ sectionOn }) {
  // Blur + soft lavender gradient behind the nav (fades downward).
  // Keep it subtle so it reads as atmosphere, not a hard band.
  const baseGradient =
    "linear-gradient(to bottom, rgba(193,184,251,0.22) 0%, rgba(193,184,251,0.12) 42%, rgba(240,240,236,0) 100%)";
  const coverBoost =
    "linear-gradient(to bottom, rgba(193,184,251,0.14) 0%, rgba(193,184,251,0.08) 42%, rgba(15,15,19,0) 100%)";
  const background = sectionOn === "cover" ? coverBoost : baseGradient;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 h-[120px] z-[450]"
      style={{
        background,
        backdropFilter: "blur(14px) saturate(160%)",
        WebkitBackdropFilter: "blur(14px) saturate(160%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0) 100%)",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0) 100%)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}


