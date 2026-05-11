"use client";

const GPU_MATRIX = [
  { gpu: "T4", vram: "16 GB", cost: "$0.59" },
  { gpu: "L4", vram: "24 GB", cost: "$0.80" },
  { gpu: "A10G", vram: "24 GB", cost: "$1.10" },
  { gpu: "L40S", vram: "48 GB", cost: "$1.95" },
  { gpu: "A100", vram: "40 GB", cost: "$2.10" },
  { gpu: "A100-80GB", vram: "80 GB", cost: "$2.50" },
  { gpu: "H100", vram: "80 GB", cost: "$3.95" },
  { gpu: "H200 (final)", vram: "141 GB", cost: "$4.54" },
  { gpu: "B200", vram: "192 GB", cost: "$6.25" },
];

const FINAL_RUN = [
  { label: "Frames", value: "767" },
  { label: "Input fps", value: "59.0" },
  { label: "End-to-end", value: "286 s" },
  { label: "Output fps", value: "2.68" },
  { label: "GPU", value: "H200" },
  { label: "VRAM used", value: "139.8 GB" },
];

export default function ModalSpeedBenchmark() {
  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div className="flex w-full max-w-5xl flex-col gap-6">
        <div className="animate-stagger flex flex-col">
          <span className="mb-1 block font-mono text-sm tracking-widest text-accent">21</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Modal + Speed Benchmarking
          </h2>
          <div className="mt-3 h-px w-16 bg-accent" />
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            Every experiment ran on <span className="text-foreground">Modal</span>, a serverless GPU
            platform. Up to <span className="text-foreground">10 concurrent GPUs</span> let us run
            parallel waves of experiments — ~50 H200 runs across 14 waves of iteration in Phase 3.
            Configs are frozen per-run; outputs land in <code className="rounded bg-surface px-1.5 py-0.5 text-[11px]">experiments/&lt;timestamp&gt;_&lt;gpu&gt;/</code>.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* GPU cost matrix */}
          <div className="animate-stagger rounded-xl border border-surface-light bg-surface/50 p-5" style={{ animationDelay: "150ms" }}>
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="text-sm font-semibold text-foreground">Modal GPU matrix</h3>
              <span className="font-mono text-[10px] tracking-wider text-muted/70 uppercase">$/hr</span>
            </div>
            <ul className="flex flex-col gap-1">
              {GPU_MATRIX.map((g) => {
                const isFinal = g.gpu.includes("final");
                return (
                  <li
                    key={g.gpu}
                    className={`grid items-baseline gap-3 font-mono text-[12px] ${
                      isFinal ? "rounded bg-accent/10 px-2 py-0.5 text-accent" : "px-2 text-muted"
                    }`}
                    style={{ gridTemplateColumns: "1fr 4.5rem 4rem" }}
                  >
                    <span>{g.gpu}</span>
                    <span className={`text-right tabular-nums ${isFinal ? "text-accent" : "text-muted/70"}`}>
                      {g.vram}
                    </span>
                    <span className={`text-right tabular-nums ${isFinal ? "text-accent" : "text-foreground/80"}`}>
                      {g.cost}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Final-run metrics */}
          <div className="animate-stagger flex flex-col gap-4" style={{ animationDelay: "300ms" }}>
            <div className="rounded-xl border border-accent/30 bg-surface/50 p-5">
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                Final run — P3-A1
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {FINAL_RUN.map((m) => (
                  <div key={m.label} className="flex flex-col">
                    <span className="font-mono text-[10px] tracking-wider text-muted/70 uppercase">{m.label}</span>
                    <span className="font-mono text-sm text-foreground">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-surface-light bg-surface/50 p-5">
              <h3 className="mb-2 text-sm font-semibold text-foreground">Parallelism unlock</h3>
              <p className="text-[13px] leading-relaxed text-muted">
                10 concurrent H200 slots let us launch 5–8 parallel runs per wave.
                Phase 3 ran ~50 runs in &lt;14 hours wall clock — most of that budget
                went on per-cycle evaluation + visual review, not GPU inference itself.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
