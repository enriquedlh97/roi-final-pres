"use client";

import { useSlideStep } from "../SlideContext";

const COLUMNS = ["System", "Hardware", "Training", "Operators", "Occlusion", "Stability", "Latency"];

const ROWS = [
  {
    system: "Supponor (NHL)",
    cells: ["IR strips", "Proprietary", "Central hub", "No (clipping)", "High", "Real-time"],
    isOurs: false,
  },
  {
    system: "uniqFEED",
    cells: ["None", "Custom CV", "Trained ops", "Partial (bbox)", "High", "Near real-time"],
    isOurs: false,
  },
  {
    system: "Vizrt / Viz Arena",
    cells: ["Camera HW", "Required", "Required", "Partial (bbox)", "High", "Real-time"],
    isOurs: false,
  },
  {
    system: "MELIC (Prior)",
    cells: ["None", "Custom", "Manual", "Limited", "Jittering", "Below real-time"],
    isOurs: false,
    isPrior: true,
  },
  {
    system: "This Pipeline",
    cells: ["None", "None (SAM 2)", "1 click", "Per-pixel masks", "Stable", "2.68 fps (H200)*"],
    isOurs: true,
  },
];

export default function ComparisonTable() {
  const step = useSlideStep();
  const highlight = step >= 1;

  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div
        className="flex w-full max-w-5xl flex-col items-center gap-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: step >= 0 ? 1 : 0,
          transform: step >= 0 ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <div className="w-full">
          <span className="mb-2 block font-mono text-sm tracking-widest text-accent">
            06
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            How We Compare
          </h2>
          <div className="mt-3 h-px w-16 bg-accent" />
        </div>

        {/* Table */}
        <div className="w-full overflow-hidden rounded-xl border border-surface-light">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-surface-light bg-surface/80">
                {COLUMNS.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 font-mono text-[10px] tracking-widest text-muted uppercase"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => {
                const allCells = [row.system, ...row.cells];
                const isPrior = "isPrior" in row && row.isPrior;

                return (
                  <tr
                    key={row.system}
                    className="border-b border-surface-light/50 last:border-b-0"
                    style={{
                      opacity: step >= 0 ? 1 : 0,
                      transform: step >= 0 ? "translateY(0)" : "translateY(8px)",
                      transition: `all 500ms cubic-bezier(0.16,1,0.3,1) ${(i + 1) * 80}ms`,
                      ...(row.isOurs && highlight
                        ? {
                            borderLeft: "3px solid var(--accent)",
                            boxShadow: "0 0 24px rgba(99,102,241,0.2), inset 0 0 24px rgba(99,102,241,0.05)",
                            background: "rgba(99,102,241,0.06)",
                          }
                        : {}),
                      ...(isPrior
                        ? {
                            background: "rgba(245,158,11,0.04)",
                            borderLeft: "3px solid rgba(245,158,11,0.3)",
                          }
                        : {}),
                    }}
                  >
                    {allCells.map((cell, j) => (
                      <td
                        key={j}
                        className={`px-4 py-2.5 text-sm ${
                          j === 0
                            ? row.isOurs
                              ? "font-bold text-accent"
                              : isPrior
                                ? "font-semibold text-amber-400/80"
                                : "font-semibold text-foreground"
                            : isPrior
                              ? "text-amber-400/50"
                              : "text-muted"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Subtitle that appears with highlight */}
        <div
          className="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: highlight ? 1 : 0,
            transform: highlight ? "translateY(0)" : "translateY(8px)",
          }}
        >
          <p className="text-center text-xs text-muted">
            Fully software-based · Zero training · Minimal operator input · Per-pixel occlusion · Stable tracking
          </p>
          <p className="mt-1 text-center text-[10px] text-muted/50">
            * Measured end-to-end on H200, 767-frame demo clip; ~30 fps real-time target is future work
          </p>
        </div>
      </div>
    </div>
  );
}
