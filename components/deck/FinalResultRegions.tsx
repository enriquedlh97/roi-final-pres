"use client";

import { useSlideStep } from "../SlideContext";
import { BASE } from "@/lib/basePath";

const REGIONS = [
  {
    label: "Back banners",
    objIds: "obj_1, obj_2, obj_5",
    surface: "banner",
    note: "3 black banners over the court. Temporal SSIM 0.9999 — visually identical to V68 gold.",
    image: "crops_back.png",
  },
  {
    label: "Left side banner",
    objIds: "obj_4",
    surface: "banner",
    note: "Red Bull logo on the side panel. Edge realism + texture match the binding constraint.",
    image: "crops_left.png",
  },
  {
    label: "Court floor logo",
    objIds: "obj_3",
    surface: "court_floor",
    note: "Red Bull walkover logo on painted floor. Halo absence, occlusion correctness.",
    image: "crops_floor.png",
  },
  {
    label: "Full frame",
    objIds: "all five",
    surface: "—",
    note: "All five placements together. Original baked-in Kia/YoPRO/Melbourne are the quality bar.",
    image: "crops_full.png",
  },
];

export default function FinalResultRegions() {
  const step = useSlideStep();
  const active = REGIONS[step] || REGIONS[0];

  return (
    <div className="flex h-full w-full items-center justify-center px-12">
      <div className="flex w-full max-w-7xl flex-col gap-4">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <span className="mb-1 block font-mono text-sm tracking-widest text-accent">18</span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Final result — region by region
            </h2>
            <div className="mt-2 h-px w-16 bg-accent" />
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              <span className="text-foreground">Top row</span> = unmodified original broadcast
              (real baked-in ads, the quality bar).
              <span className="ml-2 text-foreground">Bottom row</span> = our composite. Both at the
              same six evenly-spaced frames, 3× upscaled.
            </p>
          </div>

          {/* Region tabs */}
          <div className="flex gap-2">
            {REGIONS.map((r, i) => (
              <span
                key={r.label}
                className={`rounded-full px-3 py-1 text-[12px] font-medium transition-all duration-300 ${
                  step === i ? "bg-accent/20 text-accent" : "text-muted/40"
                }`}
              >
                {r.label}
              </span>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full overflow-hidden rounded-xl border border-surface-light bg-black/40">
          {REGIONS.map((r, i) => {
            const isActive = step === i;
            return (
              <div
                key={r.label}
                className="transition-opacity duration-400"
                style={{
                  position: isActive ? "relative" : "absolute",
                  inset: isActive ? "auto" : 0,
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <img
                  src={`${BASE}/final/${r.image}`}
                  alt={`${r.label} — paired original vs composite crop strip`}
                  className="h-auto w-full object-contain"
                  loading={isActive ? "eager" : "lazy"}
                />
              </div>
            );
          })}
        </div>

        {/* Caption */}
        <div className="flex items-center justify-between rounded-xl border border-surface-light bg-surface/50 px-5 py-3">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted/70">
              objects
            </span>
            <span className="font-mono text-sm text-foreground">{active.objIds}</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted/70">
              surface
            </span>
            <span className="font-mono text-sm text-foreground">{active.surface}</span>
          </div>
          <p className="max-w-[60%] text-right text-[12px] leading-snug text-muted">
            {active.note}
          </p>
        </div>
      </div>
    </div>
  );
}
