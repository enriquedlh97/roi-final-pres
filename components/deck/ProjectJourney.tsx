"use client";

import { useSlideStep } from "../SlideContext";

const PHASES = [
  {
    tag: "Phase 1",
    date: "Apr 30",
    title: "V68 · clicked corners",
    bullets: [
      "Manually clicked court corners on a seed frame",
      "Static homography across all 767 frames",
      "5 placements live: 3 back banners + left + floor",
    ],
    verdict: "Looks perfect when the camera is still — drifts off the court the moment it moves.",
    verdictTone: "warn",
  },
  {
    tag: "Phase 2",
    date: "May 4",
    title: "hybrid_lock + line-based estimator",
    bullets: [
      "Per-frame Hough+RANSAC court detection",
      "7 tolerance sweeps · 3 ramp speeds",
      "Gated by hybrid_lock state machine",
    ],
    verdict: "All tolerances regress floor SSIM monotonically. Line estimator is frame-to-frame too noisy. Failed axis — gold remains V68.",
    verdictTone: "fail",
  },
  {
    tag: "Phase 3",
    date: "May 5–6",
    title: "BallTrackerNet learned-keypoint port",
    bullets: [
      "14-channel CNN court-keypoint detector",
      "RANSAC over 14 keypoints → homography",
      "~50 H200 runs across 14 iteration waves",
    ],
    verdict: "Stable enough to gate on with hybrid_lock@30. Per-frame estimates ramp in only when motion exceeds tolerance.",
    verdictTone: "ok",
  },
  {
    tag: "Final",
    date: "May 6",
    title: "P3-A1 · what we ship",
    bullets: [
      "V68 manually-clicked corners (seed)",
      "BTN dynamic homography · hybrid_lock@30",
      "V68 compositor unchanged — none of the experimental tweaks",
    ],
    verdict: "All 4 region scorecards pass · walkover_occlusion_iou = 0.985 · temporal SSIM ≥ 0.99 every region.",
    verdictTone: "win",
  },
];

const TONE_STYLES: Record<string, string> = {
  warn: "border-amber-400/40 text-amber-300",
  fail: "border-red-400/40 text-red-300",
  ok: "border-emerald-400/40 text-emerald-300",
  win: "border-accent/60 text-accent",
};

export default function ProjectJourney() {
  const step = useSlideStep();

  return (
    <div className="flex h-full w-full items-center justify-center px-8">
      <div className="flex w-full max-w-[1500px] flex-col gap-5">
        {/* Header */}
        <div className="animate-stagger flex flex-col">
          <span className="mb-1 block font-mono text-sm tracking-widest text-accent">05</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Project journey</h2>
          <div className="mt-2 h-px w-16 bg-accent" />
          <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-zinc-400">
            How we got from the midterm-era manually-clicked corners to a pipeline that tracks the
            camera through a player walkover. Phase 2 failed; Phase 3 worked. The simpler answer
            won on visual review.
          </p>
        </div>

        {/* Timeline — 4 phase cards */}
        <div className="grid grid-cols-4 gap-3">
          {PHASES.map((p, i) => {
            const isRevealed = step >= i;
            const toneClass = TONE_STYLES[p.verdictTone] || "border-surface-light text-muted";
            return (
              <div
                key={p.tag}
                className="flex flex-col rounded-xl border border-surface-light bg-surface/50 p-4 transition-all duration-500"
                style={{
                  opacity: isRevealed ? 1 : 0.18,
                  transform: isRevealed ? "translateY(0)" : "translateY(8px)",
                }}
              >
                <div className="mb-2 flex items-baseline justify-between">
                  <span className={`font-mono text-[10px] uppercase tracking-wider ${toneClass.split(" ")[1]}`}>
                    {p.tag}
                  </span>
                  <span className="font-mono text-[10px] text-muted/60">{p.date}</span>
                </div>
                <h3 className="text-[14px] font-semibold leading-tight text-foreground">{p.title}</h3>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {p.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-[11.5px] leading-snug text-muted"
                    >
                      <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-accent-light/60" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div
                  className={`mt-3 rounded-lg border bg-surface/50 px-3 py-2 text-[11px] leading-snug ${toneClass}`}
                >
                  {p.verdict}
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrow row — purely visual */}
        <div className="flex items-center justify-between px-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-1 items-center transition-opacity duration-500"
              style={{ opacity: step > i ? 1 : 0.15 }}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="mx-2 text-accent/60">
                <path d="M1 5h13M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
