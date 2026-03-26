"use client";

import { useSlideStep } from "../SlideContext";

const PIPELINE_STAGES = [
  { label: "SAM 2\nSegmentation", color: "rgba(99,102,241,0.3)" },
  { label: "Homography\nFitting", color: "rgba(168,85,247,0.3)" },
  { label: "Optical Flow\nDetection", color: "rgba(14,165,233,0.3)" },
  { label: "Inpainting &\nShadow Match", color: "rgba(245,158,11,0.3)" },
  { label: "Player\nSegmentation", color: "rgba(244,63,94,0.3)" },
  { label: "Final\nComposite", color: "rgba(34,197,94,0.3)" },
];

function Arrow() {
  return (
    <svg width="28" height="16" viewBox="0 0 28 16" className="shrink-0 text-surface-light">
      <line x1="0" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="2" />
      <polygon points="18,3 28,8 18,13" fill="currentColor" />
    </svg>
  );
}

export default function OurApproach() {
  const step = useSlideStep();

  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div className="flex w-full max-w-5xl flex-col items-center gap-10">
        {/* Step 0 — Thesis statement */}
        <div
          className="flex w-full flex-col items-start transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: step >= 0 ? 1 : 0,
            transform: step >= 0 ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <span className="mb-2 font-mono text-sm tracking-widest text-accent">
            04
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Why This Combination is Novel
          </h2>
          <div className="mt-3 h-px w-16 bg-accent" />
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
            Foundation models (SAM 2) eliminate the need for hardware, custom training,
            and continuous operators for the segmentation problem. The remaining
            challenges — perspective geometry, compositing, occlusion — are solved with
            specific classical CV techniques.
          </p>
        </div>

        {/* Step 1 — Pipeline flow diagram (styled node diagram) */}
        <div
          className="w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
          }}
        >
          <div className="flex items-center justify-center gap-2">
            {PIPELINE_STAGES.map((stage, i) => (
              <div key={stage.label} className="flex items-center gap-2">
                <div
                  className="flex h-[72px] w-[120px] items-center justify-center rounded-xl border border-white/[0.12]"
                  style={{
                    background: `linear-gradient(135deg, ${stage.color} 0%, rgba(255,255,255,0.04) 100%)`,
                    backdropFilter: "blur(12px)",
                    boxShadow:
                      "inset 0 1px 1px rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.2)",
                    opacity: step >= 1 ? 1 : 0,
                    transform: step >= 1 ? "translateY(0)" : "translateY(12px)",
                    transition: `all 500ms cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
                  }}
                >
                  <span className="whitespace-pre-line text-center text-[11px] font-semibold leading-tight text-white">
                    {stage.label}
                  </span>
                </div>
                {i < PIPELINE_STAGES.length - 1 && <Arrow />}
              </div>
            ))}
          </div>

          {/* Labels */}
          <div className="mt-4 flex justify-center gap-16">
            <span className="font-mono text-[10px] tracking-widest text-accent/60">
              FOUNDATION MODEL
            </span>
            <span className="font-mono text-[10px] tracking-widest text-muted/60">
              CLASSICAL CV
            </span>
          </div>
        </div>

        {/* Step 2 — Strengths addressing known challenges */}
        <div
          className="w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <div className="flex w-full gap-4">
            {[
              {
                label: "Stable Tracking",
                detail: "Homography fitting combined with optical flow produces consistent overlays with minimal jitter across frames.",
                color: "rgba(34,197,94,0.15)",
                border: "rgba(34,197,94,0.25)",
              },
              {
                label: "Occlusion Handling",
                detail: "Dedicated player segmentation pass generates per-pixel masks, allowing overlays to render correctly behind players.",
                color: "rgba(34,197,94,0.15)",
                border: "rgba(34,197,94,0.25)",
              },
              {
                label: "Targeting 30 fps",
                detail: "Early results suggest real-time performance is achievable with GPU acceleration. Benchmarks in progress.",
                color: "rgba(34,197,94,0.15)",
                border: "rgba(34,197,94,0.25)",
              },
            ].map((item, i) => (
              <div
                key={item.label}
                className="flex-1 rounded-lg border px-4 py-3"
                style={{
                  borderColor: item.border,
                  background: item.color,
                  opacity: step >= 2 ? 1 : 0,
                  transform: step >= 2 ? "translateY(0)" : "translateY(8px)",
                  transition: `all 500ms cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
                }}
              >
                <p className="text-xs font-semibold text-foreground">{item.label}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3 — Conclusion */}
        <div
          className="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <div className="rounded-xl border border-accent/20 bg-accent/5 px-6 py-3">
            <p className="text-center text-sm font-medium text-foreground">
              No prior work assembles this specific pipeline — zero-shot segmentation
              + classical CV geometry + per-pixel occlusion handling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
