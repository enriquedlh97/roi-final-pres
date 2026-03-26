"use client";

import { useSlideStep } from "../SlideContext";
import { BASE } from "@/lib/basePath";

function VideoFrame({ zoomed }: { zoomed: boolean }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-surface-light shadow-2xl shadow-black/40 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-center"
      style={{
        transform: zoomed ? "scale(1.55)" : "scale(1)",
      }}
    >
      {/* Playing video */}
      <video
        src={`${BASE}/original-tennis-clip.mp4`}
        autoPlay
        loop
        muted
        playsInline
        className="block w-full transition-opacity duration-500"
        style={{ opacity: zoomed ? 0 : 1 }}
      />

      {/* Static first frame (shown when zoomed) */}
      <img
        src={`${BASE}/tennis-frame1.jpg`}
        alt="Tennis broadcast frame"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ opacity: zoomed ? 1 : 0 }}
      />

      {/* Bounding box around Kia/Emirates banner */}
      <div
        className="absolute transition-all duration-700 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          top: "1%",
          left: "33%",
          width: "11%",
          height: "7%",
          opacity: zoomed ? 1 : 0,
          transform: zoomed ? "scale(1)" : "scale(0.9)",
        }}
      >
        <div className="h-full w-full rounded border-2 border-accent-light shadow-[0_0_24px_rgba(129,140,248,0.5),inset_0_0_24px_rgba(129,140,248,0.15)]" />
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-accent-light px-2 py-0.5 text-[10px] font-semibold text-background">
          Kia logo
        </span>
      </div>
    </div>
  );
}

export default function ProblemOutline() {
  const step = useSlideStep();
  const zoomed = step >= 1;

  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div className="flex w-full max-w-6xl items-center gap-14">
        {/* Left — text */}
        <div
          className="flex w-[38%] shrink-0 flex-col transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: zoomed ? 0 : 1,
            transform: zoomed ? "translateX(-30px)" : "translateX(0)",
          }}
        >
          <div className="animate-stagger flex flex-col">
            <span className="mb-4 font-mono text-sm tracking-widest text-accent">01</span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Problem Outline
            </h2>
            <div className="mt-2 h-px w-16 bg-accent" />

            <div className="mt-8 rounded-xl border border-accent/20 bg-accent/5 px-5 py-4">
              <span className="font-mono text-xs tracking-wider text-accent-light uppercase">Goal</span>
              <p className="mt-2 text-lg font-medium leading-relaxed text-foreground">
                Real-time custom advertising for event livestreams, to integrate with personalized recommendation systems.
              </p>
            </div>

            <div className="mt-6">
              <span className="font-mono text-xs tracking-wider text-muted uppercase">Focused Scope</span>
              <ul className="mt-3 flex flex-col gap-3">
                <li className="flex items-start gap-3 text-zinc-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  Develop a real-time ROI tracking system for tennis matches.
                </li>
                <li className="flex items-start gap-3 text-zinc-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  Detect advertisement boards and replace them with dynamic ads.
                </li>
              </ul>
            </div>

            <p className="mt-6 font-mono text-xs text-muted/40">
              press → to highlight target region
            </p>
          </div>
        </div>

        {/* Right — video/frame (zooms and centers) */}
        <div
          className="flex-1 min-w-0 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: zoomed ? "translateX(-22%)" : "translateX(0)",
          }}
        >
          <VideoFrame zoomed={zoomed} />
          <p
            className="mt-3 text-center font-mono text-xs text-muted transition-opacity duration-500"
            style={{ opacity: zoomed ? 0 : 1 }}
          >
            Original broadcast footage sample
          </p>
        </div>
      </div>
    </div>
  );
}
