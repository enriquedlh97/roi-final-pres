"use client";

const PROMPT_RESULTS = [
  { prompt: "logo (baseline)", detected: 20, fps: 2.68 },
  { prompt: "advertising banner", detected: "few", fps: 2.04 },
  { prompt: "sponsor logo on fixed courtside…", detected: 11, fps: 3.37 },
  { prompt: "sponsor logo on fixed advertising board on tennis court perimeter", detected: 6, fps: 4.11 },
  { prompt: "sponsor logo on fixed advertising board ✅", detected: 9, fps: 3.95, best: true },
  { prompt: "KIA sponsor logo on fixed advertising board", detected: 8, fps: 4.09 },
];

export default function Sam3Experiments() {
  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div className="flex w-full max-w-6xl flex-col gap-5">
        <div className="animate-stagger flex flex-col">
          <span className="mb-1 block font-mono text-sm tracking-widest text-accent">09</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            SAM3 — auto-detection experiments
          </h2>
          <div className="mt-3 h-px w-16 bg-accent" />
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            Parallel exploration: remove the manual click step by detecting placement regions
            directly from a <span className="text-foreground">text prompt</span>. Two variants on
            separate branches — full per-frame SAM3 (~1 fps) and a <span className="text-foreground">light</span> variant
            that only re-runs SAM3 when an HSV histogram gate detects a scene change.
          </p>
        </div>

        <div className="grid grid-cols-[3fr_2fr] gap-6">
          {/* prompt-tuning experiments */}
          <div className="animate-stagger rounded-xl border border-surface-light bg-surface/50 p-5" style={{ animationDelay: "150ms" }}>
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="text-sm font-semibold text-foreground">
                Prompt-tuning experiments (SAM3-light, A100-80GB)
              </h3>
              <span className="font-mono text-[10px] tracking-wider text-muted/70 uppercase">det · fps</span>
            </div>
            <ul className="flex flex-col gap-1.5">
              {PROMPT_RESULTS.map((r) => (
                <li
                  key={r.prompt}
                  className={`flex items-baseline justify-between gap-3 rounded px-2 py-1 font-mono text-[11px] ${
                    r.best ? "bg-accent/10 text-accent" : "text-muted"
                  }`}
                >
                  <span className="truncate">{r.prompt}</span>
                  <span className="shrink-0 text-muted/60">
                    {r.detected} · <span className={r.best ? "text-accent" : "text-foreground/80"}>{r.fps.toFixed(2)}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-muted/70">
              Detection count vs throughput. Best generic prompt highlighted —
              brand-specific (<span className="text-foreground/70">KIA…</span>) detects fewer
              logos but runs faster.
            </p>
          </div>

          {/* HSV scene-change gate concept */}
          <div className="animate-stagger flex flex-col gap-3" style={{ animationDelay: "300ms" }}>
            <div className="rounded-xl border border-accent/30 bg-surface/50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-foreground">SAM3-light core idea</h3>
              <ol className="flex flex-col gap-2 text-[12px] leading-relaxed text-muted">
                <li>
                  <span className="font-mono text-[10px] text-accent">f0</span> — full SAM3 run;
                  store HSV histogram as <em>target</em>.
                </li>
                <li>
                  <span className="font-mono text-[10px] text-accent">ft</span> — compute
                  <code className="mx-1 rounded bg-surface px-1 py-0.5 text-[10px]">sim = corr(target, cur)</code>.
                </li>
                <li>
                  If <code className="mx-1 rounded bg-surface px-1 py-0.5 text-[10px]">sim &lt; 0.85</code>
                  → re-run SAM3, promote frame as new target.
                </li>
                <li>Else → reuse last masks (tracking + optical flow adapt them).</li>
              </ol>
            </div>

            <div className="rounded-xl border border-surface-light bg-surface/50 p-4">
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold text-foreground">Throughput</h3>
                <span className="font-mono text-[10px] tracking-wider text-muted/70 uppercase">A100-80GB</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-3 text-[12px]">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-muted/70 uppercase">full SAM3</span>
                  <span className="font-mono text-base text-muted">~1 fps</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-accent uppercase">SAM3-light</span>
                  <span className="font-mono text-base text-accent">3–4 fps</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[11px] leading-relaxed text-muted/60">
          Branches:&nbsp;
          <a
            href="https://github.com/enriquedlh97/homography-fitting/tree/feat/sam3-v2"
            className="font-mono text-accent/80 underline-offset-2 hover:underline"
          >
            feat/sam3-v2
          </a>
          &nbsp;·&nbsp;
          <a
            href="https://github.com/enriquedlh97/homography-fitting/tree/feat/sam3-light-v1"
            className="font-mono text-accent/80 underline-offset-2 hover:underline"
          >
            feat/sam3-light-v1
          </a>
          . Detail in <code>docs/FINAL_REPORT.md</code> §10.
        </p>
      </div>
    </div>
  );
}
