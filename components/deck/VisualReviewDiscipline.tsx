"use client";

import { useSlideStep } from "../SlideContext";

const DETERMINISTIC_METRICS = [
  { name: "corner_max_jump_px", direction: "<", threshold: "2.0", what: "largest per-frame corner displacement" },
  { name: "corner_accel_p95_px", direction: "<", threshold: "1.0", what: "95th-pct corner acceleration" },
  { name: "quad_area_cv", direction: "<", threshold: "0.05", what: "placement-quad area stability (CV)" },
  { name: "roi_jitter_ratio", direction: "≤", threshold: "1.05", what: "frame-to-frame ROI jitter vs original" },
  { name: "roi_temporal_ssim_mean", direction: ">", threshold: "0.95", what: "temporal coherence inside the ROI" },
  { name: "walkover_logo_visible_pct", direction: ">", threshold: "0.10", what: "logo visible fraction during walkover" },
  { name: "walkover_occlusion_iou", direction: ">", threshold: "0.80", what: "occlusion mask agreement with the gold" },
];

const RUBRIC_GROUPS = [
  {
    group: "Realism",
    dims: [
      "painted_on vs pasted_on",
      "edge_seam_visibility",
      "texture_match",
      "halo_presence",
      "edge_reflex",
    ],
  },
  {
    group: "Color",
    dims: ["hue_match", "brightness_match", "saturation_match"],
  },
  {
    group: "Geometry",
    dims: ["perspective_plausibility", "size_plausibility"],
  },
  {
    group: "Temporal (floor / walkover)",
    dims: ["occlusion_realism", "jitter_visible", "player_contact_shadow"],
  },
];

export default function VisualReviewDiscipline() {
  const step = useSlideStep();

  return (
    <div className="flex h-full w-full items-center justify-center px-8 py-4">
      <div className="flex w-full max-w-[1500px] flex-col gap-4">
        {/* Header */}
        <div className="animate-stagger flex flex-col">
          <span className="mb-1 block font-mono text-sm tracking-widest text-accent">22</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Evaluation, three layers
          </h2>
          <div className="mt-2 h-px w-16 bg-accent" />
          <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-zinc-400">
            Every candidate gets scored at three layers before it can ship: deterministic numerical
            gates, a structured visual rubric, and direct side-by-side review against the original
            baked-in ads.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Layer 1, Deterministic metrics */}
          <div
            className="rounded-xl border border-surface-light bg-surface/50 p-4 transition-opacity duration-500"
            style={{ opacity: step >= 0 ? 1 : 0.4 }}
          >
            <div className="mb-2 flex items-baseline gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent">layer 1</span>
              <h3 className="text-sm font-semibold text-foreground">Numerical metrics</h3>
            </div>
            <p className="text-[11px] leading-relaxed text-muted/80">
              Per-region scorecards. Each region must pass all gated metrics; one warning-only set
              (ΔE, noise variance, edge sharpness) surfaces but doesn&apos;t gate.
            </p>
            <ul className="mt-3 flex flex-col gap-1">
              {DETERMINISTIC_METRICS.map((m) => (
                <li key={m.name} className="flex items-baseline justify-between gap-2 font-mono text-[10.5px]">
                  <span className="text-muted truncate">{m.name}</span>
                  <span className="shrink-0 text-foreground">
                    {m.direction}&nbsp;{m.threshold}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[10px] leading-snug text-muted/60">
              Exit code <span className="font-mono text-foreground">0</span> = pass · <span className="font-mono text-foreground">2</span> = scorecard fail · <span className="font-mono text-foreground">3</span> = regression vs gold reference
            </p>
          </div>

          {/* Layer 2, Visual rubric */}
          <div
            className="rounded-xl border border-surface-light bg-surface/50 p-4 transition-opacity duration-500"
            style={{ opacity: step >= 1 ? 1 : 0.4 }}
          >
            <div className="mb-2 flex items-baseline gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent">layer 2</span>
              <h3 className="text-sm font-semibold text-foreground">Visual rubric</h3>
            </div>
            <p className="text-[11px] leading-relaxed text-muted/80">
              Per-region 1–5 score across 13 dimensions. Inputs are paired top=original /
              bottom=composite crop strips so the original baked-in ad is always the comparison
              anchor.
            </p>
            <div className="mt-3 flex flex-col gap-2.5">
              {RUBRIC_GROUPS.map((g) => (
                <div key={g.group}>
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-muted/70">
                    {g.group}
                  </span>
                  <ul className="mt-1 flex flex-wrap gap-1">
                    {g.dims.map((d) => (
                      <li
                        key={d}
                        className="rounded bg-surface-light/60 px-1.5 py-0.5 font-mono text-[10px] text-muted"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Layer 3, Direct visual review */}
          <div
            className="rounded-xl border border-accent/40 bg-surface/50 p-4 transition-opacity duration-500"
            style={{ opacity: step >= 2 ? 1 : 0.4 }}
          >
            <div className="mb-2 flex items-baseline gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent">layer 3</span>
              <h3 className="text-sm font-semibold text-foreground">Direct visual review</h3>
              <span className="ml-auto rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[9px] text-accent uppercase">
                final
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-muted/80">
              Human review of the actual output video against the original broadcast. The
              accept/reject vote; tie-breaks the numerical and rubric layers when they disagree.
            </p>

            <div className="mt-3 rounded-lg border border-surface-light bg-black/20 p-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted/60">
                example tie-break
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted">
                A rubric-favorite candidate (layered shadow synthesis + aggressive
                {" "}<code className="rounded bg-surface px-1 text-[10px]">erase_text</code>{" "}
                + tight banner padding) scored 5/5 on the v2 user-flagged dimensions
                <em>and</em> passed every numerical gate.
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                On direct viewing: floor shadow read as <em>blob</em>, MELBOURNE wordmark erasure
                flattened the floor context, harder banner edges read as &quot;pasted on&quot;.
              </p>
              <p className="mt-2 text-[11px] font-medium text-foreground">
                → Final pick:{" "}
                <span className="font-mono text-accent">P3-A1</span>, the simpler BTN port
                baseline, with V68&apos;s compositor unchanged.
              </p>
            </div>
          </div>
        </div>

        {/* Closing lesson */}
        <div className="rounded-xl border border-accent/30 bg-gradient-to-br from-accent/[0.08] to-transparent px-5 py-3">
          <p className="text-[13px] leading-relaxed text-foreground">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
              takeaway
            </span>
            <br />
            Numerical gates and the visual rubric are great <em>regression detectors</em>; the rubric
            is great for surfacing dimensions worth inspecting. But the final accept/reject decision
            needs a human looking at the actual video against the original broadcast, the metrics
            we ship are the ones we&apos;d defend on screen, not just on paper.
          </p>
        </div>
      </div>
    </div>
  );
}
