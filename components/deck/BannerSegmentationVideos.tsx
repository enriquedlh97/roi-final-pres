"use client";

import { useSlideStep } from "../SlideContext";
import AutoVideo from "../AutoVideo";
import { BASE } from "@/lib/basePath";

const EXPERIMENTS = [
  { label: "Banners Stable Camera", video: `${BASE}/baners_stable_camera.mp4` },
  { label: "Banners Moving Camera", video: `${BASE}/banners_moving_camera.mp4` },
  { label: "Logos Stable Camera", video: `${BASE}/logos_stable_camera.mp4` },
  { label: "Logos Moving Camera", video: `${BASE}/logos_moving_camera.mp4` },
  { label: "Camera Cuts", video: `${BASE}/camera_cuts_experiment.mp4`, tag: "experiment" },
];

export default function BannerSegmentationVideos() {
  const step = useSlideStep();
  const activeIdx = step;

  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div className="flex w-full max-w-6xl items-start gap-8">
        {/* Left — compact title + experiment list */}
        <div className="flex w-[180px] shrink-0 flex-col pt-1">
          <span className="mb-2 font-mono text-sm tracking-widest text-accent">11</span>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Banner Segmentation
          </h2>
          <div className="mt-2 h-px w-10 bg-accent" />

          <ul className="mt-5 flex flex-col gap-0.5">
            {EXPERIMENTS.map((exp, i) => {
              const active = activeIdx === i;
              return (
                <li
                  key={exp.label}
                  className="flex items-start gap-2.5 rounded-md px-2 py-2 transition-all duration-300"
                  style={{
                    background: active ? "rgba(255,255,255,0.05)" : "transparent",
                  }}
                >
                  <span
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300"
                    style={{
                      background: active ? "var(--accent)" : "rgba(255,255,255,0.15)",
                      boxShadow: active ? "0 0 8px var(--accent)" : "none",
                    }}
                  />
                  <span
                    className="text-[13px] leading-snug transition-all duration-300"
                    style={{
                      color: active ? "var(--foreground)" : "var(--muted)",
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {exp.label}
                    {exp.tag && (
                      <span className="ml-0 block mt-1 rounded-full bg-accent/15 px-1.5 py-0.5 font-mono text-[9px] text-accent w-fit">
                        {exp.tag}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right — video */}
        <div className="flex-1 min-w-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-white/[0.02]">
            {EXPERIMENTS.map((exp, i) => {
              const isActive = activeIdx === i;
              return (
                <div
                  key={exp.label}
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-400"
                  style={{
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {exp.video ? (
                    isActive && (
                      <AutoVideo
                        key={`${exp.label}-${isActive}`}
                        src={exp.video}
                        className="h-full w-full object-cover"
                      />
                    )
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-muted/30">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      <span className="font-mono text-[11px]">{exp.label}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
