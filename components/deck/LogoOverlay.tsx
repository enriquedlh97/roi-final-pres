"use client";

import { useSlideStep } from "../SlideContext";
import { BASE } from "@/lib/basePath";

export default function LogoOverlay() {
  const step = useSlideStep();

  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div className="flex w-full max-w-6xl items-center gap-12">
        {/* Left — techniques */}
        <div className="flex w-[220px] shrink-0 flex-col">
          <span className="mb-2 font-mono text-sm tracking-widest text-accent">12</span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            New Logo<br />Overlay
          </h2>
          <div className="mt-3 h-px w-16 bg-accent" />

          <ul className="mt-6 flex flex-col gap-3">
            {[
              { title: "Inpaint", desc: "Remove the original logo from the banner surface" },
              { title: "Shadow / Tint Matching", desc: "Match luminosity and color tone of the surface" },
              { title: "Border Blending", desc: "Smooth alpha edges for seamless compositing" },
            ].map((item) => (
              <li key={item.title} className="flex flex-col gap-0.5">
                <span className="text-[13px] font-semibold text-foreground">{item.title}</span>
                <span className="text-[11px] leading-snug text-muted/60">{item.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — example images (crossfade: original → example 1 → example 2) */}
        <div className="relative flex-1 min-w-0 aspect-video overflow-hidden rounded-xl border border-surface-light bg-black/40 shadow-2xl shadow-black/30">
          {[
            { src: `${BASE}/overlay-original.png`, at: 0 },
            { src: `${BASE}/overlay-example-1.png`, at: 1 },
            { src: `${BASE}/overlay-example-2.png`, at: 2 },
          ].map((item) => (
            <div
              key={item.src}
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-400"
              style={{
                opacity: step === item.at ? 1 : 0,
                pointerEvents: step === item.at ? "auto" : "none",
              }}
            >
              <img src={item.src} alt="" className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
