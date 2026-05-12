"use client";

import { BASE } from "@/lib/basePath";

export default function Sam2Architecture() {
  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div className="flex w-full max-w-5xl flex-col items-center gap-6">
        <div className="flex w-full items-start gap-10">
          <div className="flex shrink-0 flex-col">
            <span className="mb-2 font-mono text-sm tracking-widest text-accent">08</span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              SAM2 model
            </h2>
            <div className="mt-3 h-px w-16 bg-accent" />
          </div>
          <div className="flex flex-col justify-center pt-6">
            <p className="text-sm leading-relaxed text-muted">
              We use Meta&apos;s <span className="text-foreground/90 font-medium">SAM 2</span> as the backbone for banner segmentation: it requires <span className="text-foreground/90 font-medium">Manual ROI selection on frame 0</span> — a single click, box, or mask prompt — and then tracks and segments the region across all subsequent frames.
            </p>
            <ul className="mt-3 flex flex-col gap-y-3">
              <li className="flex items-start gap-2 whitespace-nowrap text-[13px] leading-snug text-muted">
                <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-accent-light/60" />
                Pre-trained on SA-1B dataset (11M images, 1B+ masks),trained on SA-V video dataset (50.9K videos,35.5M masks)
              </li>
              <li className="flex flex-wrap justify-between gap-x-6 gap-y-1.5">
                <span className="flex items-start gap-2 text-[13px] leading-snug text-muted">
                  <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-accent-light/60" />
                  Prompt with points, boxes, or masks
                </span>
                <span className="flex items-start gap-2 text-[13px] leading-snug text-muted">
                  <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-accent-light/60" />
                  Memory bank for temporal consistency
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full">
          <div className="overflow-hidden rounded-xl border border-surface-light bg-white/[0.03] px-6 py-5 shadow-2xl shadow-black/30">
            <img
              src={`${BASE}/sam-architecture.png`}
              alt="SAM 2 architecture — image encoder, memory attention, mask decoder, memory bank"
              className="w-full"
            />
          </div>
          <p className="mt-2 text-center font-mono text-[10px] text-muted/50">
            SAM 2 Architecture — Meta AI, <a href="https://arxiv.org/abs/2408.00714" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline text-accent/80">&ldquo;SAM 2: Segment Anything in Images and Videos&rdquo; (arXiv:2408.00714)</a>
          </p>
        </div>
      </div>
    </div>
  );
}
