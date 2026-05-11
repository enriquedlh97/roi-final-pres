"use client";

import { useSlideMinimap, useMinimapHighlight } from "../SlideContext";

const S = "#3f3f46";
const SF = "#18181b";
const T = "#e4e4e7";
const TM = "#a1a1aa";
const A = "#6366f1";
const AL = "#818cf8";
const W = "#52525b";
const HI = "#f0f0f5";

export default function PipelineOverview() {
  const isMinimap = useSlideMinimap();
  const hl = useMinimapHighlight();
  const hasHighlight = isMinimap && !!hl;

  const n = (id: string) => {
    if (!hasHighlight) return { opacity: 1, lit: false };
    const lit = id === hl || (hl === "homography" && id === "optical-flow") || (hl === "homography" && id === "diamond");
    return { opacity: lit ? 1 : 0.3, lit };
  };

  const bannerSeg = n("banner-seg");
  const homography = n("homography");
  const overlayLogo = n("overlay-logo");
  const detectPlayer = n("detect-player");
  const opticalFlow = n("optical-flow");
  const diamond = n("diamond");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8">
      <div
        className="animate-stagger mb-6 flex flex-col items-center transition-opacity duration-500"
        style={{ opacity: isMinimap ? 0 : 1 }}
      >
        <span className="mb-2 font-mono text-sm tracking-widest text-accent">07</span>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Full Pipeline Overview
        </h2>
        <div className="mt-2 h-px w-16 bg-accent" />
      </div>

      <svg
        viewBox="0 0 980 390"
        className="w-full max-w-[1020px]"
        fill="none"
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        <defs>
          <marker id="ah" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="7" markerHeight="5" orient="auto">
            <polygon points="0,0.8 9,3.5 0,6.2" fill={W} />
          </marker>
        </defs>

        {/* ── section labels ── */}
        <text x={22} y={40} fill={TM} fontSize={14} fontWeight={500} opacity={hasHighlight ? 0.3 : 0.7} letterSpacing="0.06em" style={{ transition: "opacity 400ms" }}>
          livestream
        </text>
        <text x={920} y={34} fill={TM} fontSize={12} fontWeight={500} opacity={hasHighlight ? 0.3 : 0.7} textAnchor="end" letterSpacing="0.04em" style={{ transition: "opacity 400ms" }}>
          Output
        </text>
        <text x={920} y={50} fill={TM} fontSize={12} fontWeight={500} opacity={hasHighlight ? 0.3 : 0.7} textAnchor="end" letterSpacing="0.04em" style={{ transition: "opacity 400ms" }}>
          broadcast stream
        </text>

        {/* ═══════════ INPUT FRAMES ═══════════ */}
        <g style={{ opacity: hasHighlight ? 0.3 : 1, transition: "opacity 400ms" }}>
          <rect x={28} y={82} width={76} height={42} rx={4} stroke={S} strokeWidth={1.2} strokeDasharray="5 3" fill={SF} />
          <text x={66} y={108} fill={TM} fontSize={14} textAnchor="middle" fontStyle="italic">
            f<tspan dy={4} fontSize={10}>t−k</tspan>
          </text>

          <rect x={28} y={176} width={76} height={48} rx={4} stroke="#52525b" strokeWidth={1.5} fill={SF} />
          <text x={66} y={205} fill={T} fontSize={15} textAnchor="middle" fontStyle="italic">
            f<tspan dy={4} fontSize={11}>t</tspan>
          </text>

          <rect x={28} y={268} width={76} height={42} rx={4} stroke={S} strokeWidth={1.2} strokeDasharray="5 3" fill={SF} />
          <text x={66} y={294} fill={TM} fontSize={14} textAnchor="middle" fontStyle="italic">
            f<tspan dy={4} fontSize={10}>t+k</tspan>
          </text>

          <line x1={66} y1={124} x2={66} y2={176} stroke={W} strokeWidth={0.7} strokeDasharray="3 3" strokeOpacity={0.35} />
          <line x1={66} y1={224} x2={66} y2={268} stroke={W} strokeWidth={0.7} strokeDasharray="3 3" strokeOpacity={0.35} />
        </g>

        {/* ═══════════ PROCESS NODES ═══════════ */}

        {/* player segmentation */}
        <g style={{ opacity: detectPlayer.opacity, transition: "opacity 400ms" }}>
          <rect x={195} y={50} width={155} height={44} rx={6}
            stroke={detectPlayer.lit ? HI : "#a855f7"} strokeWidth={detectPlayer.lit ? 1.5 : 1} strokeOpacity={detectPlayer.lit ? 0.9 : 0.4}
            fill={detectPlayer.lit ? HI : "#a855f7"} fillOpacity={detectPlayer.lit ? 0.12 : 0.06}
            style={{ transition: "all 400ms" }}
          />
          <text x={272} y={68} fill={detectPlayer.lit ? HI : "#c4b5fd"} fontSize={11} textAnchor="middle" fontWeight={500} style={{ transition: "fill 400ms" }}>
            person
          </text>
          <text x={272} y={82} fill={detectPlayer.lit ? HI : "#c4b5fd"} fontSize={11} textAnchor="middle" fontWeight={500} style={{ transition: "fill 400ms" }}>
            matte (MA2)
          </text>
        </g>

        {/* diamond, new camera? */}
        <g style={{ opacity: diamond.opacity, transition: "opacity 400ms" }}>
          <polygon
            points="205,158 245,200 205,242 165,200"
            stroke={diamond.lit ? HI : A} strokeWidth={1.2} strokeOpacity={diamond.lit ? 0.9 : 0.45}
            fill={diamond.lit ? HI : A} fillOpacity={diamond.lit ? 0.12 : 0.06}
            style={{ transition: "all 400ms" }}
          />
          <text x={205} y={196} fill={diamond.lit ? HI : AL} fontSize={10} textAnchor="middle" fontWeight={600} style={{ transition: "fill 400ms" }}>
            motion
          </text>
          <text x={205} y={209} fill={diamond.lit ? HI : AL} fontSize={10} textAnchor="middle" fontWeight={600} style={{ transition: "fill 400ms" }}>
            &gt; tol?
          </text>
        </g>

        {/* banner segmentation */}
        <g style={{ opacity: bannerSeg.opacity, transition: "opacity 400ms" }}>
          <rect x={296} y={178} width={142} height={44} rx={6}
            stroke={bannerSeg.lit ? HI : S} strokeWidth={bannerSeg.lit ? 1.5 : 1.2}
            fill={bannerSeg.lit ? HI : SF} fillOpacity={bannerSeg.lit ? 0.12 : 1}
            style={{ transition: "all 400ms" }}
          />
          <text x={367} y={196} fill={bannerSeg.lit ? HI : T} fontSize={11} textAnchor="middle" fontWeight={500} style={{ transition: "fill 400ms" }}>
            banner + court
          </text>
          <text x={367} y={210} fill={bannerSeg.lit ? HI : T} fontSize={11} textAnchor="middle" fontWeight={500} style={{ transition: "fill 400ms" }}>
            keypoints
          </text>
        </g>

        {/* compute homography */}
        <g style={{ opacity: homography.opacity, transition: "opacity 400ms" }}>
          <rect x={464} y={178} width={146} height={44} rx={6}
            stroke={homography.lit ? HI : S} strokeWidth={homography.lit ? 1.5 : 1.2}
            fill={homography.lit ? HI : SF} fillOpacity={homography.lit ? 0.12 : 1}
            style={{ transition: "all 400ms" }}
          />
          <text x={537} y={196} fill={homography.lit ? HI : T} fontSize={11} textAnchor="middle" fontWeight={500} style={{ transition: "fill 400ms" }}>
            BTN court
          </text>
          <text x={537} y={210} fill={homography.lit ? HI : T} fontSize={11} textAnchor="middle" fontWeight={500} style={{ transition: "fill 400ms" }}>
            geometry
          </text>
        </g>

        {/* optical flow */}
        <g style={{ opacity: opticalFlow.opacity, transition: "opacity 400ms" }}>
          <rect x={424} y={308} width={126} height={42} rx={6}
            stroke={opticalFlow.lit ? HI : S} strokeWidth={opticalFlow.lit ? 1.5 : 1.2}
            fill={opticalFlow.lit ? HI : SF} fillOpacity={opticalFlow.lit ? 0.12 : 1}
            style={{ transition: "all 400ms" }}
          />
          <text x={487} y={334} fill={opticalFlow.lit ? HI : T} fontSize={11} textAnchor="middle" fontWeight={500} style={{ transition: "fill 400ms" }}>
            stay at seed
          </text>
        </g>

        {/* overlay logo */}
        <g style={{ opacity: overlayLogo.opacity, transition: "opacity 400ms" }}>
          <rect x={660} y={178} width={122} height={44} rx={6}
            stroke={overlayLogo.lit ? HI : A} strokeWidth={overlayLogo.lit ? 1.5 : 1.3} strokeOpacity={overlayLogo.lit ? 0.9 : 0.5}
            fill={overlayLogo.lit ? HI : A} fillOpacity={overlayLogo.lit ? 0.12 : 0.08}
            style={{ transition: "all 400ms" }}
          />
          <text x={721} y={205} fill={overlayLogo.lit ? HI : AL} fontSize={12} textAnchor="middle" fontWeight={600} style={{ transition: "fill 400ms" }}>
            LED-blend overlay
          </text>
        </g>

        {/* ═══════════ OUTPUT FRAMES ═══════════ */}
        <g style={{ opacity: hasHighlight ? 0.3 : 1, transition: "opacity 400ms" }}>
          <rect x={840} y={82} width={76} height={42} rx={4} stroke={A} strokeWidth={1} strokeDasharray="5 3" strokeOpacity={0.35} fill={A} fillOpacity={0.04} />
          <text x={878} y={108} fill={AL} fontSize={14} textAnchor="middle" fontStyle="italic" opacity={0.65}>
            O<tspan dy={4} fontSize={10}>t−k</tspan>
          </text>

          <rect x={840} y={176} width={76} height={48} rx={4} stroke={A} strokeWidth={1.4} strokeOpacity={0.5} fill={A} fillOpacity={0.06} />
          <text x={878} y={205} fill={AL} fontSize={15} textAnchor="middle" fontStyle="italic">
            O<tspan dy={4} fontSize={11}>t</tspan>
          </text>

          <rect x={840} y={268} width={76} height={42} rx={4} stroke={A} strokeWidth={1} strokeDasharray="5 3" strokeOpacity={0.35} fill={A} fillOpacity={0.04} />
          <text x={878} y={294} fill={AL} fontSize={14} textAnchor="middle" fontStyle="italic" opacity={0.65}>
            O<tspan dy={4} fontSize={10}>t+k</tspan>
          </text>

          <line x1={878} y1={124} x2={878} y2={176} stroke={W} strokeWidth={0.7} strokeDasharray="3 3" strokeOpacity={0.35} />
          <line x1={878} y1={224} x2={878} y2={268} stroke={W} strokeWidth={0.7} strokeDasharray="3 3" strokeOpacity={0.35} />
        </g>

        {/* ═══════════ CONNECTORS ═══════════ */}
        <g style={{ opacity: hasHighlight ? 0.25 : 1, transition: "opacity 400ms" }}>
          <polyline points="138,200 138,72 195,72" stroke={W} strokeWidth={1} markerEnd="url(#ah)" />
          <line x1={104} y1={200} x2={165} y2={200} stroke={W} strokeWidth={1} markerEnd="url(#ah)" />
          <line x1={245} y1={200} x2={296} y2={200} stroke={W} strokeWidth={1} markerEnd="url(#ah)" />
          <text x={255} y={192} fill={AL} fontSize={10.5} fontWeight={600}>RAMP</text>
          <line x1={438} y1={200} x2={464} y2={200} stroke={W} strokeWidth={1} markerEnd="url(#ah)" />
          <line x1={610} y1={200} x2={635} y2={200} stroke={W} strokeWidth={1} />
          <polyline points="205,242 205,329 424,329" stroke={W} strokeWidth={1} markerEnd="url(#ah)" />
          <text x={213} y={278} fill={AL} fontSize={10.5} fontWeight={600}>STAY</text>
          <text x={213} y={294} fill={TM} fontSize={9.5} opacity={0.75}>hybrid_lock, keep seed homography</text>
          <polyline points="550,329 635,329 635,200" stroke={W} strokeWidth={1} />
          <line x1={635} y1={200} x2={660} y2={200} stroke={W} strokeWidth={1} markerEnd="url(#ah)" />
          <polyline points="350,72 721,72 721,178" stroke={W} strokeWidth={1} markerEnd="url(#ah)" />
          <line x1={782} y1={200} x2={840} y2={200} stroke={W} strokeWidth={1} markerEnd="url(#ah)" />
        </g>
      </svg>
    </div>
  );
}
