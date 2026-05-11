"use client";

import { BASE } from "@/lib/basePath";

export default function SingleVanishingPoint() {
  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div className="flex w-full max-w-6xl items-center gap-10">
        {/* Left: text */}
        <div className="animate-stagger flex flex-1 flex-col">
          <span className="mb-1 block font-mono text-sm tracking-widest text-accent">15</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Single vanishing point
          </h2>
          <div className="mt-3 h-px w-16 bg-accent" />

          <p className="mt-5 text-sm leading-relaxed text-zinc-400">
            Before the BallTrackerNet learned-keypoint detector, the per-frame court geometry
            ran on a <span className="text-foreground">classical line-based estimator</span>:
            Hough lines on court markings → cluster by orientation → estimate the depth
            vanishing point → fit the homography.
          </p>

          <ul className="mt-5 flex flex-col gap-3">
            <li className="rounded-xl border border-surface-light bg-surface/50 px-4 py-3">
              <h3 className="text-[13px] font-semibold text-foreground">VP-constrained fitters</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-muted">
                Wall banners and side panels are fitted with rays projecting from the depth or
                width vanishing point — gives geometrically correct perspective without solving
                full intrinsics.
              </p>
            </li>
            <li className="rounded-xl border border-surface-light bg-surface/50 px-4 py-3">
              <h3 className="text-[13px] font-semibold text-foreground">Why it didn&apos;t make the final</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-muted">
                The Hough estimator is frame-to-frame noisy — even with smoothing, projected
                corners deviate 5–15 px between frames on a static camera. Phase 2 swept
                <code className="mx-1 rounded bg-surface px-1 py-0.5 text-[11px]">tolerance_px ∈ {`{2..30}`}</code>
                under hybrid_lock; only the always-locked V68 baseline passed all gates.
              </p>
            </li>
            <li className="rounded-xl border border-surface-light bg-surface/50 px-4 py-3">
              <h3 className="text-[13px] font-semibold text-foreground">Path forward</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-muted">
                Learned 14-keypoint detector (BallTrackerNet) replaces the Hough+VP estimator
                in the final. VP-constrained fitter code lives on
                <a
                  href="https://github.com/enriquedlh97/homography-fitting/tree/feat/court-geometry-stabilisation"
                  className="ml-1 font-mono text-accent/80 underline-offset-2 hover:underline"
                >
                  feat/court-geometry-stabilisation
                </a>
                .
              </p>
            </li>
          </ul>
        </div>

        {/* Right: visual reference */}
        <div className="animate-scale-in flex-1">
          <div className="overflow-hidden rounded-xl border border-surface-light bg-black/40">
            <img
              src={`${BASE}/homography/vanishing_point.png`}
              alt="Vanishing point construction on the court geometry"
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="mt-2 text-center font-mono text-[10px] tracking-wider text-muted/60 uppercase">
            depth VP estimated from court markings
          </p>
        </div>
      </div>
    </div>
  );
}
