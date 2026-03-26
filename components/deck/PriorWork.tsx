"use client";

import { useSlideStep } from "../SlideContext";

const COMMERCIAL = [
  {
    name: "Supponor (NHL DED)",
    detail: "IR strips in dasherboards + AI keying. $1.28B ad revenue (2023-24). Requires proprietary hardware at every venue.",
  },
  {
    name: "uniqFEED (AdApt)",
    detail: "Software-based, deployed at major tennis events. Requires trained operators and custom-trained CV models per sport.",
  },
  {
    name: "Vizrt / Viz Arena",
    detail: "Camera tracking hardware (encoder heads). Real-time but hardware-dependent and operator-intensive.",
  },
];

const ACADEMIC = [
  "Homography estimation — focused on soccer field registration (Nie et al. WACV 2021, Homayounfar CVPR 2017). Not applied to ad replacement.",
  "SAM 2 in sports — used for ball tracking and player tracking. Not applied to advertisement board segmentation.",
  "Virtual ad insertion research — soccer-only, predates foundation models, uses hand-crafted features.",
];

export default function PriorWork() {
  const step = useSlideStep();

  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div className="flex w-full max-w-5xl flex-col gap-8">
        {/* Title — always visible */}
        <div
          className="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: step >= 0 ? 1 : 0,
            transform: step >= 0 ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <span className="mb-2 block font-mono text-sm tracking-widest text-accent">
            03
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Existing Approaches & Landscape
          </h2>
          <div className="mt-3 h-px w-16 bg-accent" />
        </div>

        {/* Two-column: Commercial (left) + Academic (right) */}
        <div className="flex gap-12">
          {/* Commercial systems — step >= 1 */}
          <div
            className="flex-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: step >= 1 ? 1 : 0,
              transform: step >= 1 ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <h3 className="mb-4 font-mono text-xs tracking-widest text-accent-light">
              COMMERCIAL SYSTEMS
            </h3>
            <div className="flex flex-col gap-3">
              {COMMERCIAL.map((item, i) => (
                <div
                  key={item.name}
                  className="rounded-lg border border-surface-light bg-surface/50 px-4 py-3"
                  style={{
                    opacity: step >= 1 ? 1 : 0,
                    transform: step >= 1 ? "translateY(0)" : "translateY(12px)",
                    transition: `all 500ms cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
                  }}
                >
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic work — step >= 2 */}
          <div
            className="flex-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: step >= 2 ? 1 : 0,
              transform: step >= 2 ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <h3 className="mb-4 font-mono text-xs tracking-widest text-accent-light">
              ACADEMIC WORK
            </h3>
            <div className="flex flex-col gap-3">
              {ACADEMIC.map((text, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-surface-light bg-surface/50 px-4 py-3"
                  style={{
                    opacity: step >= 2 ? 1 : 0,
                    transform: step >= 2 ? "translateY(0)" : "translateY(12px)",
                    transition: `all 500ms cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
                  }}
                >
                  <p className="text-xs leading-relaxed text-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gap statement — step >= 3 — accent callout box */}
        <div
          className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? "translateY(0) scale(1)" : "translateY(12px) scale(0.98)",
          }}
        >
          <div className="rounded-xl border border-accent/20 bg-accent/5 px-6 py-4">
            <p className="text-center text-base font-semibold text-foreground">
              No prior work combines foundation model segmentation with classical CV
              for end-to-end sports ad replacement.
            </p>
            <p className="mt-1 text-center text-xs text-muted">
              Each component exists individually — the pipeline does not.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
