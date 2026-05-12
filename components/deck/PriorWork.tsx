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

const MELIC_CHALLENGES = [
  { label: "Jittering", detail: "Overlay instability across frames — tracking drift causes visible shaking in replaced banners." },
  { label: "Occlusion", detail: "Players walking in front of banners cause artifacts — overlays render on top of or through players." },
  { label: "Speed", detail: "Processing speed below real-time thresholds, limiting viability for live broadcast scenarios." },
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

        {/* Three-column: Commercial + Academic + MELIC Challenges */}
        <div className="flex gap-8">
          {/* Commercial systems — step >= 1 */}
          <div
            className="flex-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: step >= 1 ? 1 : 0,
              transform: step >= 1 ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <h3 className="mb-3 font-mono text-xs tracking-widest text-accent-light">
              COMMERCIAL SYSTEMS
            </h3>
            <div className="flex flex-col gap-2">
              {COMMERCIAL.map((item, i) => (
                <div
                  key={item.name}
                  className="rounded-lg border border-surface-light bg-surface/50 px-3 py-2.5"
                  style={{
                    opacity: step >= 1 ? 1 : 0,
                    transform: step >= 1 ? "translateY(0)" : "translateY(12px)",
                    transition: `all 500ms cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
                  }}
                >
                  <p className="text-xs font-semibold text-foreground">{item.name}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted">{item.detail}</p>
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
            <h3 className="mb-3 font-mono text-xs tracking-widest text-accent-light">
              ACADEMIC WORK
            </h3>
            <div className="flex flex-col gap-2">
              {ACADEMIC.map((text, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-surface-light bg-surface/50 px-3 py-2.5"
                  style={{
                    opacity: step >= 2 ? 1 : 0,
                    transform: step >= 2 ? "translateY(0)" : "translateY(12px)",
                    transition: `all 500ms cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
                  }}
                >
                  <p className="text-[11px] leading-relaxed text-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* MELIC known challenges — step >= 2 */}
          <div
            className="flex-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: step >= 2 ? 1 : 0,
              transform: step >= 2 ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <h3 className="mb-3 font-mono text-xs tracking-widest text-accent-light">
              KNOWN CHALLENGES
            </h3>
            <div className="flex flex-col gap-2">
              {MELIC_CHALLENGES.map((item, i) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2.5"
                  style={{
                    opacity: step >= 2 ? 1 : 0,
                    transform: step >= 2 ? "translateY(0)" : "translateY(12px)",
                    transition: `all 500ms cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
                  }}
                >
                  <p className="text-xs font-semibold text-foreground">{item.label}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted">{item.detail}</p>
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
