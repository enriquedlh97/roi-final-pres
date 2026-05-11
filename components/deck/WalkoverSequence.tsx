"use client";

import { useSlideStep } from "../SlideContext";
import { BASE } from "@/lib/basePath";

const FRAMES = [
  {
    label: "Entry",
    frame: 685,
    caption: "Player begins entering the floor-logo region.",
    image: "walkover_entry.png",
  },
  {
    label: "Pre-contact",
    frame: 694,
    caption: "~25% across the window, player approaching the logo.",
    image: "walkover_pre.png",
  },
  {
    label: "Contact",
    frame: 704,
    caption: "Player ON the logo, the hardest occlusion case.",
    image: "walkover_contact.png",
    highlight: true,
  },
  {
    label: "Post-contact",
    frame: 713,
    caption: "~75% across, player exiting.",
    image: "walkover_post.png",
  },
  {
    label: "Exit",
    frame: 723,
    caption: "Window closes. Logo returns to fully visible.",
    image: "walkover_exit.png",
  },
];

const COLUMNS = [
  "original broadcast",
  "clean court (no logo)",
  "our composite",
  "original − clean (Δ)",
  "survival heatmap",
  "leak overlay (red)",
];

export default function WalkoverSequence() {
  const step = useSlideStep();
  const active = FRAMES[step] || FRAMES[0];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-4">
      <div className="flex w-full max-w-[1500px] flex-col gap-4">
        {/* Header row, title left, tabs right */}
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="mb-1 block font-mono text-sm tracking-widest text-accent">19</span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Walkover sequence
            </h2>
            <div className="mt-2 h-px w-16 bg-accent" />
            <p className="mt-2 text-[12px] leading-relaxed text-zinc-400">
              Auto-detected walkover window: frames <span className="font-mono">685–723</span> ·
              5 key frames span entry → contact → exit
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {FRAMES.map((f, i) => {
              const isActive = step === i;
              return (
                <span
                  key={f.label}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-all duration-300 ${
                    isActive ? "bg-accent/20 text-accent" : "text-muted/40"
                  }`}
                >
                  <span>{f.label}</span>
                  <span className="font-mono text-[10px] opacity-70">f{f.frame}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Hero image, centered, much wider */}
        <div className="relative w-full overflow-hidden rounded-xl border border-surface-light bg-black/40">
          {FRAMES.map((f, i) => {
            const isActive = step === i;
            return (
              <div
                key={f.label}
                className="transition-opacity duration-400"
                style={{
                  position: isActive ? "relative" : "absolute",
                  inset: isActive ? "auto" : 0,
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <img
                  src={`${BASE}/final/${f.image}`}
                  alt={`Walkover forensic sheet frame ${f.frame}, ${f.label}`}
                  className="block h-auto w-full object-contain"
                  loading={isActive ? "eager" : "lazy"}
                />
              </div>
            );
          })}
        </div>

        {/* Columns legend, horizontal strip below the image (since the image already shows the 6 columns visually) */}
        <div className="flex items-center gap-3 overflow-x-auto">
          {COLUMNS.map((c, i) => (
            <span
              key={c}
              className="flex shrink-0 items-baseline gap-1.5 rounded-full border border-surface-light bg-surface/50 px-2.5 py-1 font-mono text-[10px] text-muted"
            >
              <span className="text-accent/80">{i + 1}</span>
              <span>{c}</span>
            </span>
          ))}
          {active.highlight && (
            <span className="ml-auto shrink-0 rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[10px] text-accent uppercase tracking-wider">
              showpiece
            </span>
          )}
        </div>

        {/* Active-frame caption */}
        <div className="rounded-xl border border-surface-light bg-surface/50 px-5 py-3">
          <span className="font-mono text-[11px] text-accent">f{active.frame} · {active.label.toUpperCase()}</span>
          <span className="ml-3 text-[13px] text-muted">{active.caption}</span>
        </div>
      </div>
    </div>
  );
}
