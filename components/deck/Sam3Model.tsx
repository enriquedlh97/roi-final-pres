"use client";

import { BASE } from "@/lib/basePath";

export default function Sam3Model() {
  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div className="flex w-full max-w-5xl flex-col items-center gap-6">
        <div className="flex w-full items-start gap-10">
          <div className="flex shrink-0 flex-col">
            <span className="mb-2 font-mono text-sm tracking-widest text-accent">12</span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              SAM3 model
            </h2>
            <div className="mt-3 h-px w-16 bg-accent" />
          </div>
          <div className="flex flex-col justify-center pt-6">
            <p className="text-sm leading-relaxed text-muted">
              <span className="text-foreground/90 font-medium">SAM 3</span> introduces <span className="text-foreground/90 font-medium">Promptable Concept Segmentation</span>: given a text prompt or positive/negative exemplar prompts, it detects, segments, and tracks all instances of a concept across video frames, enabling <span className="text-foreground/90 font-medium">automatic ROI detection and tracking</span>.
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3">
              {[
                "Text-prompted open-vocabulary detection",
                "New Detector head + SAM 2 Tracker + Memory Bank",
                "Detects new instances mid-video, no per-frame clicks",
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-2 text-[13px] leading-snug text-muted">
                  <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-accent-light/60" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full">
          <div className="overflow-hidden rounded-xl border border-surface-light bg-white/[0.03] px-6 py-5 shadow-2xl shadow-black/30">
            <img
              src={`${BASE}/sam3-architecture.png`}
              alt="SAM 3 architecture — text encoder, image encoder, detector, tracker, memory bank"
              className="w-full"
            />
          </div>
          <p className="mt-2 text-center font-mono text-[10px] text-muted/50">
            SAM 3 Architecture — Meta AI, <a href="https://arxiv.org/pdf/2511.16719v1" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline text-accent/80">&ldquo;SAM 3: Segment Anything with Concepts&rdquo; (arXiv:2511.16719)</a>
          </p>
        </div>

        {/* Pipeline equations — subtle, single row */}
        <div className="flex w-full flex-wrap items-center justify-center gap-x-14 gap-y-1 text-[14px] leading-none text-foreground/75">
          <span className="whitespace-nowrap">
            <span className="italic">M̂</span><sub className="italic">t</sub>
            {" = "}
            <span className="font-mono">propagate</span>
            {"("}<span className="italic">M</span><sub className="italic">t−1</sub>{")"}
          </span>
          <span className="whitespace-nowrap">
            <span className="italic">O</span><sub className="italic">t</sub>
            {" = "}
            <span className="font-mono">detect</span>
            {"("}<span className="italic">I</span><sub className="italic">t</sub>{", "}<span className="italic">P</span>{")"}
          </span>
          <span className="whitespace-nowrap">
            <span className="italic">M</span><sub className="italic">t</sub>
            {" = "}
            <span className="font-mono">match_and_update</span>
            {"("}<span className="italic">M̂</span><sub className="italic">t</sub>{", "}<span className="italic">O</span><sub className="italic">t</sub>{")"}
          </span>
        </div>
      </div>
    </div>
  );
}
