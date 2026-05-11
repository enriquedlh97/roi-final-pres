"use client";

import { useSlideStep } from "../SlideContext";
import { BASE } from "@/lib/basePath";

const REGIONS = [
  {
    label: "Back banners",
    objIds: "obj_1 · obj_2 · obj_5",
    surface: "banner",
    crops: 3,
    note: "3 distinct back-wall banner positions, same frame (f0350). Temporal SSIM 0.9999 · jitter 0.291 — visually identical to V68 gold.",
    image: "crops_back_3banners.png",
  },
  {
    label: "Left side banner",
    objIds: "obj_4",
    surface: "banner",
    crops: 1,
    note: "Red Bull logo on the side panel (was YoPRO baked-in). Temporal SSIM 1.0000 — pass. Edge realism + texture-match are the binding constraints; visible mild halo at letter edges.",
    image: "crops_left_1.png",
  },
  {
    label: "Court floor logo",
    objIds: "obj_3",
    surface: "court_floor",
    crops: 3,
    note: "3 frames from the walkover window (685–723) — player on the logo. Walkover occlusion IoU 0.985 · logo visible pct 0.179 (gate > 0.10).",
    image: "crops_floor_walkover.png",
  },
  {
    label: "Full frame",
    objIds: "all five together",
    surface: "—",
    crops: 3,
    note: "All five placements together. Full-frame temporal SSIM 0.9987. The real baked-in ads (Kia / YoPRO / Melbourne) are the quality bar.",
    image: "crops_full_3.png",
  },
];

export default function FinalResultRegions() {
  const step = useSlideStep();
  const active = REGIONS[step] || REGIONS[0];

  return (
    <div className="flex h-full w-full items-center justify-center px-8 py-6">
      <div className="flex w-full max-w-[1400px] flex-col gap-4">
        {/* Header + region tabs */}
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="mb-1 block font-mono text-sm tracking-widest text-accent">17</span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Final result — region by region
            </h2>
            <div className="mt-2 h-px w-16 bg-accent" />
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-zinc-400">
              <span className="text-foreground">Top row</span> = unmodified original broadcast
              (real baked-in ads, our quality bar). <span className="text-foreground">Bottom row</span>
              {" "}= our composite.
            </p>
          </div>

          <div className="flex gap-1.5">
            {REGIONS.map((r, i) => (
              <span
                key={r.label}
                className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-all duration-300 ${
                  step === i ? "bg-accent/20 text-accent" : "text-muted/40"
                }`}
              >
                {r.label}
              </span>
            ))}
          </div>
        </div>

        {/* Image — cap height so narrow-aspect images (e.g. single-crop left banner)
            don't blow up to full screen when stretched to container width. */}
        <div className="relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-surface-light bg-black/40">
          {REGIONS.map((r, i) => {
            const isActive = step === i;
            return (
              <div
                key={r.label}
                className="flex transition-opacity duration-400"
                style={{
                  position: isActive ? "relative" : "absolute",
                  inset: isActive ? "auto" : 0,
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                  justifyContent: "center",
                  alignItems: "center",
                  width: isActive ? "100%" : "auto",
                }}
              >
                <img
                  src={`${BASE}/final/${r.image}`}
                  alt={`${r.label} — paired original vs composite crop strip`}
                  className="block max-h-[55vh] w-auto max-w-full object-contain"
                  loading={isActive ? "eager" : "lazy"}
                />
              </div>
            );
          })}
        </div>

        {/* Caption */}
        <div className="flex items-center justify-between gap-6 rounded-xl border border-surface-light bg-surface/50 px-5 py-3">
          <div className="flex shrink-0 items-baseline gap-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted/70">
              {active.crops} crops
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted/70">
              objects
            </span>
            <span className="font-mono text-[13px] text-foreground">{active.objIds}</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted/70">
              surface
            </span>
            <span className="font-mono text-[13px] text-foreground">{active.surface}</span>
          </div>
          <p className="text-right text-[12px] leading-snug text-muted">{active.note}</p>
        </div>
      </div>
    </div>
  );
}
