"use client";

import { useSlideStep } from "../SlideContext";
import AutoVideo from "../AutoVideo";
import { BASE } from "@/lib/basePath";

type VideoEntry = {
  label: "SAM 3" | "SAM 3-Light";
  prompt: string;
  fps: number;
  video: string;
  detected?: number;
  segmented?: number;
  highlight?: string;
  note?: string;
  tag?: string;
};

const VIDEOS: VideoEntry[] = [
  {
    label: "SAM 3",
    prompt: "sponsor logo on fixed advertising board",
    fps: 1.83,
    segmented: 10,
    video: `${BASE}/sam3-pipeline/sam3_static_v2.mp4`,
  },
  {
    label: "SAM 3-Light",
    prompt: "sponsor logo on fixed advertising board",
    fps: 3.95,
    segmented: 9,
    video: `${BASE}/sam3-pipeline/sam3light_static_v2.mp4`,
    highlight: "~2.2× the FPS vs full SAM 3 (1.83 → 3.95)",
  },
  {
    label: "SAM 3-Light",
    prompt: "KIA sponsor logo on fixed advertising board",
    fps: 4.09,
    segmented: 8,
    video: `${BASE}/sam3-pipeline/sam3light_kia.mp4`,
    tag: "experiment",
    highlight: "~2.2× the FPS vs full SAM 3 (1.83 → 4.09)",
  },
];

export default function FullPipelineExperiments() {
  const step = useSlideStep();
  const activeIdx = Math.min(step, VIDEOS.length - 1);
  const active = VIDEOS[activeIdx];

  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div className="flex w-full max-w-6xl items-start gap-8">
        {/* Left — title + 2-entry list */}
        <div className="flex w-[240px] shrink-0 flex-col pt-1">
          <span className="mb-2 font-mono text-sm tracking-widest text-accent">15</span>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Full Pipeline Experiments
          </h2>
          <div className="mt-2 h-px w-10 bg-accent" />

          <ul className="mt-6 flex flex-col gap-2">
            {VIDEOS.map((v, i) => {
              const isActive = activeIdx === i;
              return (
                <li
                  key={v.label + i}
                  className="rounded-md px-3 py-2 transition-all duration-300"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                  }}
                >
                  <span
                    className="block font-mono text-[13px] font-bold uppercase tracking-wider transition-all duration-300"
                    style={{
                      color: isActive ? "var(--accent)" : "var(--muted)",
                    }}
                  >
                    {v.label}
                  </span>
                  {v.tag && (
                    <span className="mt-1 inline-block rounded-full bg-accent/15 px-1.5 py-0.5 font-mono text-[9px] text-accent">
                      {v.tag}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right — video + caption */}
        <div className="flex flex-1 min-w-0 flex-col gap-3">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-white/[0.02]">
            {VIDEOS.map((v, i) => {
              const isActive = activeIdx === i;
              return (
                <div
                  key={v.label + i}
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

          {/* Caption */}
          <div className="rounded-xl border border-surface-light bg-surface/50 px-4 py-3">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                {active.label}
              </span>
              <span className="ml-auto rounded-md bg-accent/15 px-2 py-0.5 font-mono text-[14px] font-bold text-accent">
                {active.fps.toFixed(2)} fps
              </span>
            </div>
            <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
              <span className="font-mono text-[10px] text-muted/60">prompt</span>{" "}
              <span className="text-foreground/80">&ldquo;{active.prompt}&rdquo;</span>
            </p>
            {active.segmented !== undefined && (
              <p className="mt-1 text-[12px] leading-relaxed text-muted">
                <span className="font-mono text-[10px] text-muted/60">segmented objects</span>{" "}
                <span className="text-foreground/80">{active.segmented}</span>
              </p>
            )}
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
