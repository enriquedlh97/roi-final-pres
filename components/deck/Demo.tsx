"use client";

import { useSlideStep } from "../SlideContext";
import AutoVideo from "../AutoVideo";
import { BASE } from "@/lib/basePath";

// Cache-bust version: bump when the underlying video bytes change so browsers
// that had the previous version don't keep serving stale (and possibly
// codec-incompatible) cached bytes.
const VIDEO_VERSION = "h264-v2";

const DEMOS = [
  {
    label: "Original broadcast",
    video: `${BASE}/final/input_clip.mov?v=${VIDEO_VERSION}`,
    badge: "BEFORE",
    badgeAccent: "bg-accent/85 text-white ring-1 ring-white/30",
    caption: "767 frames @ 60 fps from the Melbourne broadcast — the input to the pipeline.",
    aspect: "video",
  },
  {
    label: "Final composite",
    video: `${BASE}/final/composited.mp4?v=${VIDEO_VERSION}`,
    badge: "AFTER · our composite",
    badgeAccent: "bg-accent/85 text-white ring-1 ring-white/30",
    caption: "Our final output. 5 virtual ad placements + player-occluded floor logo through the walkover window.",
    aspect: "video",
  },
  {
    label: "Side-by-side vs V68 gold",
    video: `${BASE}/final/side_by_side_vs_gold.mp4?v=${VIDEO_VERSION}`,
    badge: "OURS · V68 GOLD · DIFF HEATMAP",
    badgeAccent: "bg-zinc-900/85 text-zinc-100 ring-1 ring-white/20",
    caption:
      "Three panels: 1. our final composite · 2. V68 static-corners gold (the eval-framework regression reference) · 3. absolute-difference heatmap (brighter pixels = larger per-pixel deviation).",
    aspect: "ultrawide",
  },
];

export default function Demo() {
  const step = useSlideStep();
  const active = DEMOS[step] || DEMOS[0];

  return (
    <div className="flex h-full w-full items-center justify-center px-8">
      <div className="flex w-full max-w-[1600px] flex-col items-center gap-4">
        {/* Header row */}
        <div className="flex w-full items-end justify-between">
          <div>
            <span className="mb-1 block font-mono text-sm tracking-widest text-accent">19</span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Demo</h2>
            <div className="mt-2 h-px w-16 bg-accent" />
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {DEMOS.map((d, i) => (
              <span
                key={d.label}
                className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-all duration-300 ${
                  step === i ? "bg-accent/20 text-accent" : "text-muted/40"
                }`}
              >
                {d.label}
              </span>
            ))}
          </div>
        </div>

        {/* Video container — full width for ultra-wide side-by-side */}
        <div className="relative w-full overflow-hidden rounded-xl border border-surface-light bg-black/40 shadow-2xl shadow-black/30">
          {DEMOS.map((d, i) => {
            const isActive = step === i;
            // Match container's aspect ratio to the video so the side-by-side
            // (2868x536 ~ 5.35:1) doesn't get black-barred to 16:9.
            const aspect = d.aspect === "ultrawide" ? "aspect-[5.35/1]" : "aspect-video";
            return (
              <div
                key={d.video}
                className={`transition-opacity duration-400 ${isActive ? aspect : "absolute inset-0 aspect-video"}`}
                style={{
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                  position: isActive ? "relative" : "absolute",
                }}
              >
                {isActive && (
                  <AutoVideo
                    key={d.video + i}
                    src={d.video}
                    className="h-full w-full object-contain"
                  />
                )}
                {/* Persistent BEFORE / AFTER overlay — large enough to be unmistakable
                    even when the deck is in fullscreen mode. */}
                {isActive && (
                  <div className="pointer-events-none absolute top-3 left-3 z-10">
                    <span
                      className={`rounded-md px-3 py-1.5 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm shadow-lg shadow-black/30 ${d.badgeAccent}`}
                    >
                      {d.badge}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Caption — clarifies what's on screen, especially the side-by-side panels */}
        <div className="w-full rounded-xl border border-surface-light bg-surface/50 px-5 py-3">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
              {active.label}
            </span>
            <span className="text-[12px] leading-relaxed text-muted">{active.caption}</span>
          </div>
          <p className="mt-1 text-[10px] text-muted/60">
            Video loops automatically. Use ← / → to step through.
          </p>
        </div>
      </div>
    </div>
  );
}
