"use client";

import { useSlideStep } from "../SlideContext";
import { BASE } from "@/lib/basePath";

function StepImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img src={src} alt={alt} className="h-full w-full rounded-lg object-contain" />
  );
}

function Arrow() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="shrink-0 text-muted/30">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Homography() {
  const step = useSlideStep();

  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      {/* Step 0 — title + description */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: step === 0 ? 1 : 0,
          transform: step === 0 ? "scale(1)" : "scale(0.95)",
          pointerEvents: step === 0 ? "auto" : "none",
        }}
      >
        <div className="animate-stagger flex max-w-2xl flex-col items-start">
          <span className="mb-4 font-mono text-sm tracking-widest text-accent">13</span>
          <h2 className="text-5xl font-bold leading-tight tracking-tight text-foreground">
            Homography &<br />Perspective Geometry
          </h2>
          <div className="mt-6 h-px w-16 bg-accent" />
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Understand the geometry and perspective of the banners from the camera&apos;s viewpoint so that overlays and modifications appear realistic to the viewer in the final livestream.
          </p>
        </div>
      </div>

      {/* Steps 1–5 — Motivation workflow */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-12 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: step >= 1 && step <= 5 ? 1 : 0,
          transform: step >= 1 && step <= 5 ? "translateX(0)" : step < 1 ? "translateX(40px)" : "translateX(-40px)",
          pointerEvents: step >= 1 && step <= 5 ? "auto" : "none",
        }}
      >
        <span className="mb-6 font-mono text-xs tracking-widest text-accent uppercase">Motivation</span>

        <div className="flex items-center">
          {[
            { src: `${BASE}/homography/1_original.png`, alt: "Original camera frame", label: "Original frame",        w: "w-52", aspect: "aspect-video", at: 1 },
            { src: `${BASE}/homography/2_bbox.png`,     alt: "Frame with bounding box", label: "Detect region",       w: "w-52", aspect: "aspect-video", at: 2 },
            { src: `${BASE}/homography/3_rectified.png`, alt: "Rectified flat banner", label: "Rectify to flat",      w: "w-44", aspect: "",             at: 3 },
            { src: `${BASE}/homography/4_logo_flat.png`, alt: "Replacement logo (flat)", label: "New logo (flat)",     w: "w-44", aspect: "",             at: 4 },
            { src: `${BASE}/homography/5_overlay.png`,  alt: "New overlay in perspective", label: "Warp overlay back", w: "w-52", aspect: "aspect-video", at: 5 },
          ].map((item, i) => {
            const show = step >= item.at;
            const showArrow = i > 0 && step >= item.at;
            return (
              <div key={item.src} className="flex items-center">
                {/* Arrow (before items 2–5) */}
                {i > 0 && (
                  <div
                    className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      maxWidth: showArrow ? 48 : 0,
                      opacity: showArrow ? 1 : 0,
                      padding: showArrow ? "0 8px" : "0",
                    }}
                  >
                    <Arrow />
                  </div>
                )}
                {/* Image */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    maxWidth: show ? 250 : 0,
                    opacity: show ? 1 : 0,
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`${item.w} ${item.aspect}`}>
                      <StepImage src={item.src} alt={item.alt} />
                    </div>
                    <span className="font-mono text-[10px] text-muted/50 whitespace-nowrap">{item.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 6 — Vanishing point */}
      <div
        className="absolute inset-0 flex items-center justify-center px-16 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: step === 6 ? 1 : 0,
          transform: step === 6 ? "translateX(0)" : step < 6 ? "translateX(40px)" : "translateX(-40px)",
          pointerEvents: step === 6 ? "auto" : "none",
        }}
      >
        <div className="flex w-full max-w-6xl items-center gap-12">
          <div className="flex w-[240px] shrink-0 flex-col">
            <span className="mb-2 font-mono text-sm tracking-widest text-accent">13</span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Vanishing<br />Point
            </h2>
            <div className="mt-3 h-px w-16 bg-accent" />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The vanishing point constrains how banner edges converge — it&apos;s not a true parallelogram but a perspective quadrilateral.
            </p>
          </div>
          <div className="flex-1 min-w-0 overflow-hidden rounded-xl border border-surface-light bg-white/[0.03] shadow-2xl shadow-black/30">
            <img
              src={`${BASE}/homography/vanishing_point.png`}
              alt="Vanishing point visualization with converging lines"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Steps 7–14 — Quadrilateral fitting algorithm */}
      <div
        className="absolute inset-0 flex items-center justify-center px-16 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: step >= 7 ? 1 : 0,
          transform: step >= 7 ? "translateX(0)" : "translateX(40px)",
          pointerEvents: step >= 7 ? "auto" : "none",
        }}
      >
        <div className="flex w-full max-w-6xl items-center gap-12">
          {/* Left — title + step list */}
          <div className="flex w-[220px] shrink-0 flex-col">
            <span className="mb-2 font-mono text-sm tracking-widest text-accent">13</span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Quadrilateral<br />Fitting
            </h2>
            <div className="mt-3 h-px w-16 bg-accent" />

            <ul className="mt-5 flex flex-col gap-0.5">
              {[
                { label: "Original frame", at: 7 },
                { label: "SAM mask", at: 8 },
                { label: "Binary mask", at: 9 },
                { label: "Min-area rectangle", at: 10 },
                { label: "Split along axes", at: 11 },
                { label: "Fit edge lines", at: 12 },
                { label: "Intersect corners", at: 13 },
                { label: "Rectified view", at: 14 },
              ].map((item) => {
                const active = step === item.at;
                const past = step > item.at;
                return (
                  <li
                    key={item.label}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-all duration-300"
                    style={{ background: active ? "rgba(255,255,255,0.05)" : "transparent" }}
                  >
                    <span
                      className="mt-[1px] h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300"
                      style={{
                        background: active ? "var(--accent)" : past ? "var(--accent-light)" : "rgba(255,255,255,0.12)",
                        boxShadow: active ? "0 0 8px var(--accent)" : "none",
                      }}
                    />
                    <span
                      className="text-[12px] leading-snug transition-all duration-300"
                      style={{
                        color: active ? "var(--foreground)" : past ? "var(--muted)" : "rgba(255,255,255,0.25)",
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right — image (crossfade between steps) */}
          <div className="relative flex-1 min-w-0">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-surface-light bg-black/40 shadow-2xl shadow-black/30">
              {[
                { src: `${BASE}/homography/fit-steps/1_frame.png`, at: 7 },
                { src: `${BASE}/homography/fit-steps/2_mask_overlay.png`, at: 8 },
                { src: `${BASE}/homography/fit-steps/3_bw_mask.png`, at: 9 },
                { src: `${BASE}/homography/fit-steps/4_minrect.png`, at: 10 },
                { src: `${BASE}/homography/fit-steps/5_axes_points.png`, at: 11 },
                { src: `${BASE}/homography/fit-steps/6_fitted_lines.png`, at: 12 },
                { src: `${BASE}/homography/fit-steps/7_intersections.png`, at: 13 },
                { src: `${BASE}/homography/fit-steps/8_rectified.png`, at: 14 },
              ].map((item) => (
                <div
                  key={item.src}
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-400"
                  style={{
                    opacity: step === item.at ? 1 : 0,
                    pointerEvents: step === item.at ? "auto" : "none",
                  }}
                >
                  <img src={item.src} alt="" className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
