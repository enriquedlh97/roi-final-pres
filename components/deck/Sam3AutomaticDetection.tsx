"use client";

import { useSlideStep } from "../SlideContext";
import AutoVideo from "../AutoVideo";
import { BASE } from "@/lib/basePath";

type VideoEntry = {
  group: "SAM 3" | "SAM 3-Light";
  label: string;            // shown in the left-side menu
  videoTitle?: string;      // shown below the video; falls back to label
  prompt: string;
  fps: number;
  video: string;
  highlight?: string;       // accent-colored line below the prompt
  note?: string;            // muted line below the prompt / highlight
};

const VIDEOS: VideoEntry[] = [
  {
    group: "SAM 3",
    label: "Static",
    prompt: "logo",
    fps: 1.001,
    video: `${BASE}/sam3/sam3_static.mp4`,
  },
  {
    group: "SAM 3",
    label: "Zoom + camera change P1",
    prompt: "logo",
    fps: 0.84,
    video: `${BASE}/sam3/sam3_zoom_labels.mp4`,
  },
  {
    group: "SAM 3",
    label: "Zoom + camera change P2",
    prompt: "sponsor logo on fixed courtside advertising board",
    fps: 1.86,
    video: `${BASE}/sam3/sam3_zoom.mp4`,
  },
  {
    group: "SAM 3-Light",
    label: "Static",
    prompt: "logo",
    fps: 2.136,
    video: `${BASE}/sam3/sam3light_static.mp4`,
    highlight: "Double the FPS vs full SAM 3 (1.001 → 2.136)",
  },
  {
    group: "SAM 3-Light",
    label: "Zoom + change (sim=0.85)",
    videoTitle: "Zoom + change (similarity = 0.85)",
    prompt: "logo",
    fps: 2.326,
    video: `${BASE}/sam3/sam3light_zoom_sim85.mp4`,
    highlight: "~2.8× the FPS vs full SAM 3 on zoom (0.84 → 2.326)",
    note: "Too low to trigger SAM 3 re-computation on the zoom",
  },
  {
    group: "SAM 3-Light",
    label: "Zoom + change (sim=0.95)",
    videoTitle: "Zoom + change (similarity = 0.95)",
    prompt: "logo",
    fps: 1.917,
    video: `${BASE}/sam3/sam3light_zoom_sim95.mp4`,
    note: "3 re-runs across the clip",
  },
  {
    group: "SAM 3-Light",
    label: "Zoom + change (sim=0.97)",
    videoTitle: "Zoom + change (similarity = 0.97)",
    prompt: "logo",
    fps: 1.762,
    video: `${BASE}/sam3/sam3light_zoom_sim97.mp4`,
    note: "Higher similarity → more re-runs to catch the progressive zoom (+ optical flow)",
  },
];

export default function Sam3AutomaticDetection() {
  const step = useSlideStep();
  const activeIdx = Math.min(step, VIDEOS.length - 1);
  const active = VIDEOS[activeIdx];

  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div className="flex w-full max-w-6xl items-start gap-8">
        {/* Left — title + grouped list */}
        <div className="flex w-[260px] shrink-0 flex-col pt-1">
          <span className="mb-2 font-mono text-sm tracking-widest text-accent">14</span>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            SAM3 - Automatic detection
          </h2>
          <div className="mt-2 h-px w-10 bg-accent" />

          {(["SAM 3", "SAM 3-Light"] as const).map((groupName) => (
            <div key={groupName} className="mt-5">
              <span className="block rounded-md bg-accent/10 px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-accent">
                {groupName}
              </span>
              <ul className="mt-1.5 flex flex-col gap-0.5">
                {VIDEOS.map((v, i) => {
                  if (v.group !== groupName) return null;
                  const isActive = activeIdx === i;
                  return (
                    <li
                      key={v.label + i}
                      className="flex items-start gap-2.5 rounded-md px-2 py-1.5 transition-all duration-300"
                      style={{
                        background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                      }}
                    >
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300"
                        style={{
                          background: isActive ? "var(--accent)" : "rgba(255,255,255,0.15)",
                          boxShadow: isActive ? "0 0 8px var(--accent)" : "none",
                        }}
                      />
                      <span
                        className="text-[12px] leading-snug transition-all duration-300"
                        style={{
                          color: isActive ? "var(--foreground)" : "var(--muted)",
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {v.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Right — video + caption */}
        <div className="flex flex-1 min-w-0 flex-col gap-3">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-white/[0.02]">
            {VIDEOS.map((v, i) => {
              const isActive = activeIdx === i;
              return (
                <div
                  key={v.video}
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-400"
                  style={{
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {isActive && (
                    <AutoVideo
                      key={`${v.video}-${isActive}`}
                      src={v.video}
                      className="h-full w-full object-contain"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Caption — specs live here, not in the menu title */}
          <div className="rounded-xl border border-surface-light bg-surface/50 px-4 py-3">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                {active.group}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {active.videoTitle ?? active.label}
              </span>
              <span className="ml-auto font-mono text-[11px] text-accent">
                {active.fps.toFixed(3)} fps
              </span>
            </div>
            <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
              <span className="font-mono text-[10px] text-muted/60">prompt</span>{" "}
              <span className="text-foreground/80">&ldquo;{active.prompt}&rdquo;</span>
            </p>
            {active.highlight && (
              <p className="mt-1 text-[12px] font-medium leading-relaxed text-accent-light">
                {active.highlight}
              </p>
            )}
            {active.note && (
              <p className="mt-1 text-[12px] leading-relaxed text-muted/80">
                {active.note}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
