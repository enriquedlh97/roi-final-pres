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
    caption: "~25% across the window — player approaching the logo.",
    image: "walkover_pre.png",
  },
  {
    label: "Contact",
    frame: 704,
    caption: "Player ON the logo — the hardest occlusion case.",
    image: "walkover_contact.png",
    highlight: true,
  },
  {
    label: "Post-contact",
    frame: 713,
    caption: "~75% across — player exiting.",
    image: "walkover_post.png",
  },
  {
    label: "Exit",
    frame: 723,
    caption: "Window closes. Logo returns to fully visible.",
    image: "walkover_exit.png",
  },
];

export default function WalkoverSequence() {
  const step = useSlideStep();
  const active = FRAMES[step] || FRAMES[0];

  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div className="flex w-full max-w-7xl items-start gap-6">
        {/* Left rail — frame list */}
        <div className="flex w-[200px] shrink-0 flex-col pt-1">
          <span className="mb-2 font-mono text-sm tracking-widest text-accent">19</span>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Walkover sequence
          </h2>
          <div className="mt-2 h-px w-10 bg-accent" />
          <p className="mt-3 text-[11px] leading-snug text-muted">
            Auto-detected window: frames <span className="font-mono">685–723</span>. Five key frames
            spanning the player walking on the floor logo.
          </p>

          <ul className="mt-5 flex flex-col gap-0.5">
            {FRAMES.map((f, i) => {
              const isActive = step === i;
              return (
                <li
                  key={f.label}
                  className="flex items-start gap-2.5 rounded-md px-2 py-2 transition-all duration-300"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                  }}
                >
                  <span
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300"
                    style={{
                      background: isActive ? "var(--accent)" : "rgba(255,255,255,0.15)",
                      boxShadow: isActive ? "0 0 8px var(--accent)" : "none",
                    }}
                  />
                  <span
                    className="text-[13px] leading-snug transition-all duration-300"
                    style={{
                      color: isActive ? "var(--foreground)" : "var(--muted)",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {f.label}
                    <span className="ml-1 font-mono text-[10px] text-muted/60">f{f.frame}</span>
                    {f.highlight && (
                      <span className="ml-0 mt-1 block w-fit rounded-full bg-accent/15 px-1.5 py-0.5 font-mono text-[9px] text-accent">
                        showpiece
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 border-t border-surface-light pt-3">
            <p className="font-mono text-[9px] uppercase tracking-wider text-muted/60">columns</p>
            <ol className="mt-1 flex flex-col gap-0.5 text-[10px] leading-tight text-muted">
              <li>1 · original broadcast</li>
              <li>2 · clean court (no logo)</li>
              <li>3 · our composite</li>
              <li>4 · original − clean (Δ)</li>
              <li>5 · survival heatmap</li>
              <li>6 · leak overlay (red)</li>
            </ol>
          </div>
        </div>

        {/* Right — the forensic sheet image */}
        <div className="flex-1 min-w-0">
          <div className="relative w-full overflow-hidden rounded-lg border border-surface-light bg-black/40">
            {FRAMES.map((f, i) => {
              const isActive = step === i;
              return (
                <div
                  key={f.label}
                  className="absolute inset-0 transition-opacity duration-400"
                  style={{
                    position: isActive ? "relative" : "absolute",
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <img
                    src={`${BASE}/final/${f.image}`}
                    alt={`Walkover forensic sheet frame ${f.frame} — ${f.label}`}
                    className="h-auto w-full object-contain"
                    loading={isActive ? "eager" : "lazy"}
                  />
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-center font-mono text-[11px] tracking-wider text-muted/70">
            f{active.frame} · {active.label.toUpperCase()} — {active.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
