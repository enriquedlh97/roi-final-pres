"use client";

const S = "#3f3f46";
const SF = "#18181b";
const T = "#e4e4e7";
const TM = "#a1a1aa";
const A = "#6366f1";
const AL = "#818cf8";
const W = "#52525b";

export default function Sam3Light() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-12">
      <div className="flex w-full max-w-6xl flex-col items-center gap-5">
        {/* Title block */}
        <div className="animate-stagger flex w-full items-start gap-10">
          <div className="flex shrink-0 flex-col">
            <span className="mb-2 font-mono text-sm tracking-widest text-accent">13</span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              SAM3-Light
            </h2>
            <div className="mt-3 h-px w-16 bg-accent" />
          </div>
          <div className="flex flex-col justify-center pt-6">
            <p className="text-sm leading-relaxed text-muted">
              A <span className="text-foreground/90 font-medium">light version</span> that runs SAM 3 (Detector + Tracker) only when the scene actually changes, and reuses the previous masks (Tracker) otherwise. This brings throughput from <span className="text-foreground/90 font-medium">~1 fps</span> (full SAM 3) to <span className="text-foreground/90 font-medium">~3–4 fps</span> on the same A100-80GB hardware.
            </p>
          </div>
        </div>

        {/* Workflow SVG */}
        <svg
          viewBox="0 0 1100 370"
          className="w-full max-w-[1100px]"
          fill="none"
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        >
          <defs>
            <marker id="lah" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="7" markerHeight="5" orient="auto">
              <polygon points="0,0.8 9,3.5 0,6.2" fill={W} />
            </marker>
            <marker id="lah-accent" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="7" markerHeight="5" orient="auto">
              <polygon points="0,0.8 9,3.5 0,6.2" fill={AL} />
            </marker>
          </defs>

          {/* ════════════ Row 1: FRAME 0 ════════════ */}
          <text x={22} y={36} fill={TM} fontSize={12} fontWeight={600} letterSpacing="0.12em">
            FRAME 0
          </text>

          {/* Frame 0 */}
          <rect x={28} y={56} width={110} height={56} rx={6} stroke={S} strokeWidth={1.5} fill={SF} />
          <text x={83} y={82} fill={T} fontSize={14} textAnchor="middle" fontWeight={500}>
            Frame 0
          </text>
          <text x={83} y={100} fill={TM} fontSize={11} textAnchor="middle" fontStyle="italic">
            f<tspan dy={3} fontSize={9}>0</tspan>
          </text>

          {/* arrow */}
          <line x1={142} y1={84} x2={186} y2={84} stroke={W} strokeWidth={1.5} markerEnd="url(#lah)" />

          {/* Full SAM 3 */}
          <rect x={190} y={56} width={220} height={56} rx={6} stroke={A} strokeWidth={1.5} fill={SF} />
          <text x={300} y={80} fill={T} fontSize={14} textAnchor="middle" fontWeight={600}>
            Full SAM 3
          </text>
          <text x={300} y={98} fill={TM} fontSize={11} textAnchor="middle">
            detection + segmentation
          </text>

          {/* arrow */}
          <line x1={414} y1={84} x2={458} y2={84} stroke={W} strokeWidth={1.5} markerEnd="url(#lah)" />

          {/* Store HSV hist */}
          <rect x={462} y={56} width={250} height={56} rx={6} stroke={S} strokeWidth={1.5} fill={SF} />
          <text x={587} y={80} fill={T} fontSize={14} textAnchor="middle" fontWeight={500}>
            Store HSV histogram
          </text>
          <text x={587} y={98} fill={TM} fontSize={11} textAnchor="middle">
            → <tspan fill={AL} fontWeight={500}>target</tspan>
          </text>

          {/* Divider */}
          <line x1={28} y1={142} x2={1072} y2={142} stroke={S} strokeWidth={1} strokeDasharray="4 4" />

          {/* ════════════ Row 2: FRAME t > 0 ════════════ */}
          <text x={22} y={172} fill={TM} fontSize={12} fontWeight={600} letterSpacing="0.12em">
            FRAME t &gt; 0
          </text>

          {/* Frame t */}
          <rect x={28} y={210} width={100} height={56} rx={6} stroke={S} strokeWidth={1.5} fill={SF} />
          <text x={78} y={236} fill={T} fontSize={14} textAnchor="middle" fontWeight={500}>
            Frame t
          </text>
          <text x={78} y={254} fill={TM} fontSize={11} textAnchor="middle" fontStyle="italic">
            f<tspan dy={3} fontSize={9}>t</tspan>
          </text>

          {/* arrow */}
          <line x1={132} y1={238} x2={170} y2={238} stroke={W} strokeWidth={1.5} markerEnd="url(#lah)" />

          {/* HSV current */}
          <rect x={174} y={210} width={150} height={56} rx={6} stroke={S} strokeWidth={1.5} fill={SF} />
          <text x={249} y={234} fill={T} fontSize={13} textAnchor="middle" fontWeight={500}>
            HSV histogram
          </text>
          <text x={249} y={252} fill={TM} fontSize={11} textAnchor="middle">
            of current frame
          </text>

          {/* arrow */}
          <line x1={328} y1={238} x2={366} y2={238} stroke={W} strokeWidth={1.5} markerEnd="url(#lah)" />

          {/* correlation */}
          <rect x={370} y={210} width={210} height={56} rx={6} stroke={S} strokeWidth={1.5} fill={SF} />
          <text x={475} y={233} fill={T} fontSize={13} textAnchor="middle" fontWeight={500}>
            sim = corr(target, current)
          </text>
          <text x={475} y={251} fill={TM} fontSize={11} textAnchor="middle">
            HSV-correlation score
          </text>

          {/* arrow → diamond */}
          <line x1={584} y1={238} x2={612} y2={238} stroke={W} strokeWidth={1.5} markerEnd="url(#lah)" />

          {/* Decision diamond */}
          <polygon
            points="690,200 776,238 690,276 604,238"
            stroke={AL}
            strokeWidth={1.5}
            fill={SF}
          />
          <text x={690} y={236} fill={T} fontSize={12} textAnchor="middle" fontWeight={600}>
            sim &lt; threshold
          </text>
          <text x={690} y={252} fill={AL} fontSize={11} textAnchor="middle">
            ?
          </text>

          {/* Branch yes — horizontal arrow from the right vertex of the diamond */}
          <line x1={776} y1={238} x2={816} y2={238} stroke={AL} strokeWidth={1.5} markerEnd="url(#lah-accent)" />
          <text x={789} y={230} fill={AL} fontSize={11} fontWeight={600}>
            yes
          </text>

          {/* Re-run box (top right, aligned with the right vertex) */}
          <rect x={820} y={208} width={260} height={60} rx={6} stroke={A} strokeWidth={1.5} fill={SF} />
          <text x={950} y={230} fill={T} fontSize={13} textAnchor="middle" fontWeight={600}>
            Re-run SAM 3
          </text>
          <text x={950} y={246} fill={TM} fontSize={11} textAnchor="middle">
            Detector + Tracker
          </text>
          <text x={950} y={260} fill={AL} fontSize={10.5} textAnchor="middle" fontStyle="italic">
            update target ← frame t
          </text>

          {/* Branch no — from the bottom vertex, down then right to the tracker box */}
          <path d="M 690 276 L 690 318 L 816 318" stroke={W} strokeWidth={1.5} markerEnd="url(#lah)" fill="none" />
          <text x={700} y={300} fill={TM} fontSize={11} fontWeight={600}>
            no
          </text>

          {/* Tracker only box (bottom right, stacked below Re-run) */}
          <rect x={820} y={288} width={260} height={60} rx={6} stroke={S} strokeWidth={1.5} fill={SF} />
          <text x={950} y={310} fill={T} fontSize={13} textAnchor="middle" fontWeight={600}>
            Tracker only
          </text>
          <text x={950} y={326} fill={TM} fontSize={11} textAnchor="middle">
            reuse active masks from last rerun
          </text>
          <text x={950} y={340} fill={TM} fontSize={10.5} textAnchor="middle" fontStyle="italic">
            adapted by Optical-Flow stage
          </text>
        </svg>
      </div>
    </div>
  );
}
