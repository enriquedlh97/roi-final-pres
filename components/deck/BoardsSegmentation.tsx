"use client";

import { useSlideStep } from "../SlideContext";
import AutoVideo from "../AutoVideo";

const EXPERIMENTS = [
  { label: "Stable Camera", video: "/sam2-stable-camera.mp4" },
  { label: "Moving Camera", video: "/sam2-moving-camera.mp4" },
  { label: "Single Logos", video: "/sam2-single-logos.mp4" },
  { label: "Cuts in Camera Scenes", video: "/sam2-camera-cuts.mp4", tag: "experiment" },
];

export default function BoardsSegmentation() {
  const step = useSlideStep();
  const demoActive = step >= 2;
  const activeIdx = demoActive ? step - 2 : -1;

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
          <span className="mb-4 font-mono text-sm tracking-widest text-accent">07</span>
          <h2 className="text-5xl font-bold leading-tight tracking-tight text-foreground">
            Banner Segmentation<br />& Tracking
          </h2>
          <div className="mt-6 h-px w-16 bg-accent" />
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Detect advertising banners across different regions of the court — ground-level boards, back wall panels, net-mounted banners, umpire stand signage, and more.
          </p>
        </div>
      </div>

      {/* Step 1 — SAM model architecture */}
      <div
        className="absolute inset-0 flex items-center justify-center px-16 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: step === 1 ? 1 : 0,
          transform: step === 1 ? "translateX(0)" : step < 1 ? "translateX(40px)" : "translateX(-40px)",
          pointerEvents: step === 1 ? "auto" : "none",
        }}
      >
        <div className="flex w-full max-w-5xl flex-col items-center gap-6">
          <div className="flex w-full items-start gap-10">
            <div className="flex shrink-0 flex-col">
              <span className="mb-2 font-mono text-sm tracking-widest text-accent">07</span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Segment Anything<br />Model 2
              </h2>
              <div className="mt-3 h-px w-16 bg-accent" />
            </div>
            <div className="flex flex-col justify-center pt-6">
              <p className="text-sm leading-relaxed text-muted">
                We use Meta&apos;s <span className="text-foreground/90 font-medium">SAM 2</span> as the backbone for banner segmentation. Given a single click prompt on the first frame, SAM 2 tracks and segments across all subsequent frames.
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
                {[
                  "Pre-trained on 11M images, 1B+ masks",
                  "Prompt with points, boxes, or masks",
                  "Memory bank for temporal consistency",
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-[13px] leading-snug text-muted">
                    <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-accent-light/60" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full">
            <div className="overflow-hidden rounded-xl border border-surface-light bg-white/[0.03] px-6 py-5 shadow-2xl shadow-black/30">
              <img
                src="/sam-architecture.png"
                alt="SAM 2 architecture — image encoder, memory attention, mask decoder, memory bank"
                className="w-full"
              />
            </div>
            <p className="mt-2 text-center font-mono text-[10px] text-muted/50">
              SAM 2 architecture — Ravi et al., 2024
            </p>
          </div>
        </div>
      </div>

      {/* Steps 2–5 — SAM experiments list + video */}
      <div
        className="absolute inset-0 flex items-center justify-center px-16 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: demoActive ? 1 : 0,
          transform: demoActive ? "translateX(0)" : "translateX(40px)",
          pointerEvents: demoActive ? "auto" : "none",
        }}
      >
        <div className="flex w-full max-w-6xl items-start gap-8">
          {/* Left — compact title + experiment list */}
          <div className="flex w-[180px] shrink-0 flex-col pt-1">
            <h2 className="text-lg font-bold tracking-tight text-foreground">SAM 2</h2>
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

          {/* Right — video placeholder, as large as possible */}
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
    </div>
  );
}
