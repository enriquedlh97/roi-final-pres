"use client";

import { useSlideStep } from "../SlideContext";
import { BASE } from "@/lib/basePath";

const STAGES = [
  {
    tag: "01",
    title: "Original broadcast",
    desc: "Real baked-in ads on the back banners + floor wordmark (Kia, YoPRO, Melbourne).",
    image: "logo_overlay_original.png",
  },
  {
    tag: "02",
    title: "Final composite",
    desc: "Original ad erased via median-fill inpaint; new logo warped through the per-frame homography; LED-blend brightness re-bake matches local surface luminance.",
    image: "logo_overlay_composite.png",
  },
  {
    tag: "03",
    title: "Logo on the ground",
    desc: "Walkover window — player walks over the floor logo. Person-mask alpha matting occludes correctly through the silhouette.",
    image: "logo_overlay_walkover_zoom.png",
  },
];

const TECHNIQUES = [
  { title: "Inpaint", desc: "Remove the original logo from the surface (median_fill, temporal)" },
  { title: "LED-blend brightness re-bake", desc: "Match local surface luminance — read as painted, not pasted" },
  { title: "Person-mask occlusion", desc: "Alpha-matte the player silhouette so logos hide behind feet, legs, racket" },
];

export default function LogoOverlay() {
  const step = useSlideStep();
  const active = STAGES[step] || STAGES[0];

  return (
    <div className="flex h-full w-full items-center justify-center px-12">
      <div className="flex w-full max-w-7xl items-center gap-10">
        {/* Left — techniques + step indicator */}
        <div className="flex w-[230px] shrink-0 flex-col">
          <span className="mb-2 font-mono text-sm tracking-widest text-accent">15</span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            New logo overlay
          </h2>
          <div className="mt-3 h-px w-16 bg-accent" />

          <ul className="mt-5 flex flex-col gap-3">
            {TECHNIQUES.map((t) => (
              <li key={t.title} className="flex flex-col gap-0.5">
                <span className="text-[13px] font-semibold text-foreground">{t.title}</span>
                <span className="text-[11px] leading-snug text-muted/70">{t.desc}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-surface-light pt-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted/60">
              stage
            </span>
            <ul className="mt-1 flex flex-col gap-0.5">
              {STAGES.map((s, i) => {
                const isActive = step === i;
                return (
                  <li
                    key={s.tag}
                    className="flex items-center gap-2 text-[11px]"
                    style={{
                      color: isActive ? "var(--accent)" : "var(--muted)",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    <span className="font-mono">{s.tag}</span>
                    <span>{s.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right — example image + caption */}
        <div className="flex flex-1 min-w-0 flex-col gap-3">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-surface-light bg-black/40 shadow-2xl shadow-black/30">
            {STAGES.map((s, i) => {
              const isActive = step === i;
              return (
                <div
                  key={s.image}
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-400"
                  style={{
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <img
                    src={`${BASE}/final/${s.image}`}
                    alt={s.title}
                    className="max-h-full max-w-full object-contain"
                    loading={isActive ? "eager" : "lazy"}
                  />
                </div>
              );
            })}
          </div>
          <div className="rounded-xl border border-surface-light bg-surface/50 px-5 py-3">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] text-accent">{active.tag}</span>
              <span className="text-sm font-semibold text-foreground">{active.title}</span>
            </div>
            <p className="mt-1 text-[12px] leading-relaxed text-muted">{active.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
