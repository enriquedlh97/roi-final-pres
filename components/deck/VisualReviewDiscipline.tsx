"use client";

import { useSlideStep } from "../SlideContext";

export default function VisualReviewDiscipline() {
  const step = useSlideStep();

  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div className="flex w-full max-w-6xl flex-col gap-6">
        {/* Header */}
        <div className="animate-stagger flex flex-col">
          <span className="mb-1 block font-mono text-sm tracking-widest text-accent">21</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Visual review {">"} numerical rubric
          </h2>
          <div className="mt-2 h-px w-16 bg-accent" />
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
            We built a deterministic eval framework <em>and</em> an LLM-driven visual rubric to
            score every cycle of the autonomous experimentation. Then we overrode both with
            direct human visual review.
          </p>
        </div>

        {/* Two columns: rubric winner vs visual-review winner */}
        <div className="grid grid-cols-2 gap-5">
          {/* Rubric winner — P3-A38/e2 */}
          <div
            className="rounded-xl border border-surface-light bg-surface/50 p-5 transition-opacity duration-500"
            style={{ opacity: step >= 0 ? 1 : 0 }}
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">Autonomous winner</h3>
              <span className="rounded-full bg-red-400/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-red-300">
                rejected
              </span>
            </div>
            <p className="font-mono text-[11px] text-muted/70">P3-A38/e2 · 14 waves in</p>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              Layered shadow synthesis + <code className="rounded bg-surface px-1 text-[11px]">erase_text=true</code> +
              <code className="rounded bg-surface px-1 text-[11px]">obj_4 padding=0</code> on top of the BTN
              baseline.
            </p>
            <ul className="mt-3 flex flex-col gap-1.5 text-[12px]">
              <li className="flex items-baseline justify-between text-muted">
                <span>realism.halo_presence</span>
                <span className="font-mono text-red-300">5/5</span>
              </li>
              <li className="flex items-baseline justify-between text-muted">
                <span>realism.edge_reflex</span>
                <span className="font-mono text-red-300">5/5</span>
              </li>
              <li className="flex items-baseline justify-between text-muted">
                <span>back / left / full / floor / walkover</span>
                <span className="font-mono text-red-300">5 / 4 / 5 / 4 / 4</span>
              </li>
            </ul>
            <p className="mt-3 text-[11px] leading-snug text-muted/70">
              On <em>direct viewing</em>: floor-shadow darkening read as &quot;blob&quot;,
              MELBOURNE-wordmark erasure flattened the floor context, harder banner edges
              read as &quot;pasted on&quot;.
            </p>
          </div>

          {/* Visual review winner — P3-A1 */}
          <div
            className="rounded-xl border border-accent/40 bg-surface/50 p-5 transition-opacity duration-500"
            style={{ opacity: step >= 1 ? 1 : 0.5 }}
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">Visual-review winner</h3>
              <span className="rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                final
              </span>
            </div>
            <p className="font-mono text-[11px] text-muted/70">P3-A1 · BTN port baseline · 2026-05-05</p>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              V68 manually-clicked corners + BallTrackerNet learned-keypoint dynamic homography
              + hybrid_lock@30 + <span className="text-foreground">V68&apos;s compositor unchanged</span>.
              None of the autonomous tweaks.
            </p>
            <ul className="mt-3 flex flex-col gap-1.5 text-[12px]">
              <li className="flex items-baseline justify-between text-muted">
                <span>per-region pass-gates</span>
                <span className="font-mono text-accent">4 / 4 pass</span>
              </li>
              <li className="flex items-baseline justify-between text-muted">
                <span>walkover_occlusion_iou</span>
                <span className="font-mono text-accent">0.985 (gate &gt; 0.80)</span>
              </li>
              <li className="flex items-baseline justify-between text-muted">
                <span>temporal SSIM</span>
                <span className="font-mono text-accent">≥ 0.99 every region</span>
              </li>
            </ul>
            <p className="mt-3 text-[11px] leading-snug text-muted/70">
              Locked frames are pixel-identical to V68 gold; the ~80 walkover-window frames where
              the camera moves get a stable BTN re-estimation.
            </p>
          </div>
        </div>

        {/* Lesson */}
        <div
          className="rounded-xl border border-accent/30 bg-gradient-to-br from-accent/[0.08] to-transparent px-5 py-4 transition-opacity duration-500"
          style={{ opacity: step >= 1 ? 1 : 0 }}
        >
          <p className="text-[13px] leading-relaxed text-foreground">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
              lesson learned
            </span>
            <br />
            A numerical rubric — even an LLM-driven one — is not a substitute for direct human visual
            review against the ground truth. The deterministic metrics (SSIM, ΔE, jitter, occlusion IoU)
            are great <em>regression gates</em>; the rubric is useful as an outlier detector; but the
            final accept/reject decision needs a human looking at the video.
          </p>
        </div>
      </div>
    </div>
  );
}
