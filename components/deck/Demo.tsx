"use client";

import { useSlideStep } from "../SlideContext";
import AutoVideo from "../AutoVideo";

const DEMOS = [
  { label: "Stable Camera", video: "/demo-stable.mp4" },
  { label: "Camera Movement", video: "/demo-moving.mp4" },
  { label: "Player Overlay (experimental)", video: "/demo-player-overlay.mp4" },
];

export default function Demo() {
  const step = useSlideStep();

  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div className="flex w-full max-w-5xl flex-col items-center gap-6">
        {/* Header row */}
        <div className="flex w-full items-end justify-between">
          <div>
            <span className="mb-1 block font-mono text-sm tracking-widest text-accent">13</span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Demo</h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-4">
            {DEMOS.map((d, i) => (
              <span
                key={d.label}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                  step === i
                    ? "bg-accent/20 text-accent"
                    : "text-muted/40"
                }`}
              >
                {d.label}
              </span>
            ))}
          </div>
        </div>

        {/* Video container */}
        <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-surface-light bg-black/40 shadow-2xl shadow-black/30">
          {DEMOS.map((d, i) => (
            <div
              key={d.video}
              className="absolute inset-0 transition-opacity duration-400"
              style={{
                opacity: step === i ? 1 : 0,
                pointerEvents: step === i ? "auto" : "none",
              }}
            >
              {step === i && (
                <AutoVideo
                  key={d.video + i}
                  src={d.video}
                  className="h-full w-full object-contain"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
