"use client";

const NUMBERS = [
  {
    value: "5",
    unit: "",
    label: "Simultaneous virtual placements",
    detail: "3 back banners · 1 left side · 1 court-floor walkover logo",
  },
  {
    value: "0.9999",
    unit: "",
    label: "Temporal SSIM · back banners",
    detail: "Visually identical to V68 gold (locked frames)",
  },
  {
    value: "0.985",
    unit: "",
    label: "Walkover occlusion IoU",
    detail: "Player on the floor logo, frames 685–723. Gate is >0.80.",
  },
  {
    value: "767",
    unit: "frames",
    label: "Demo clip · 60 fps",
    detail: "13 seconds from the Melbourne broadcast",
  },
  {
    value: "~50",
    unit: "",
    label: "H200 GPU runs · 14 iteration waves",
    detail: "Phase 3 experiment cycles, < 14 h wall clock",
  },
  {
    value: "13 × 5",
    unit: "",
    label: "Rubric dimensions × regions scored",
    detail: "Visual rubric across realism · color · geometry · temporal",
  },
];

export default function HeadlineNumbers() {
  return (
    <div className="flex h-full w-full items-center justify-center px-8 py-4">
      <div className="flex w-full max-w-[1400px] flex-col gap-5">
        <div className="animate-stagger flex flex-col">
          <span className="mb-1 block font-mono text-sm tracking-widest text-accent">20</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Headline numbers
          </h2>
          <div className="mt-2 h-px w-16 bg-accent" />
          <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-zinc-400">
            The final-run results in one screen — what the eval framework measured on
            <code className="mx-1 rounded bg-surface px-1.5 py-0.5 text-[11px]">experiments/2026-05-05_18-38-39_hull_H200/</code>.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {NUMBERS.map((n, i) => (
            <div
              key={n.label}
              className="animate-stagger flex flex-col items-start gap-2 rounded-xl border border-surface-light bg-surface/50 px-5 py-5"
              style={{ animationDelay: `${120 + i * 80}ms` }}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-5xl font-bold leading-none text-accent">
                  {n.value}
                </span>
                {n.unit && (
                  <span className="font-mono text-sm text-muted/60">{n.unit}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold leading-snug text-foreground">
                  {n.label}
                </span>
                <span className="mt-1 text-[11px] leading-snug text-muted">{n.detail}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-accent/30 bg-gradient-to-br from-accent/[0.08] to-transparent px-5 py-3">
          <p className="text-[12px] leading-relaxed text-foreground">
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
              one-liner
            </span>
            <br />
            V68 manually-clicked corners + BallTrackerNet dynamic homography + hybrid_lock at
            30-px tolerance + V68&apos;s LED-blend compositor — five placements, broadcast-stable,
            occluded correctly through a player walkover.
          </p>
        </div>
      </div>
    </div>
  );
}
