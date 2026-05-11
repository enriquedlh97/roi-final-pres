"use client";

import { useSlideStep } from "../SlideContext";
import AutoVideo from "../AutoVideo";
import { BASE } from "@/lib/basePath";

export default function PlayerTracking() {
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
          <span className="mb-4 font-mono text-sm tracking-widest text-accent">10</span>
          <h2 className="text-5xl font-bold leading-tight tracking-tight text-foreground">
            Player<br />Segmentation
          </h2>
          <div className="mt-6 h-px w-16 bg-accent" />
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Detect and segment players on the court to ensure overlaid banners render behind them, preserving a natural viewing experience.
          </p>
        </div>
      </div>

      {/* Step 1 — video demo */}
      <div
        className="absolute inset-0 flex items-center justify-center px-12 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? "translateX(0)" : "translateX(40px)",
          pointerEvents: step >= 1 ? "auto" : "none",
        }}
      >
        <div className="w-full max-w-4xl">
          <div className="overflow-hidden rounded-xl border border-surface-light bg-black/40 shadow-2xl shadow-black/30">
            {step >= 1 && (
              <AutoVideo
                key="player-tracking"
                src={`${BASE}/player-tracking.mp4`}
                className="w-full"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
