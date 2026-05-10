"use client";

const items = [
  {
    tag: "Texture",
    title: "Texture-match ceiling",
    points: [
      "Smoothed inpaint micro-grain visible vs gritty court paint at close zoom",
      "Needs real texture transfer (noise injection / GAN-based inpaint)",
    ],
  },
  {
    tag: "Smoothing",
    title: "Adaptive vp_smoothing",
    points: [
      "Code shipped (P3-A2) but the parameter sweep didn't conclude",
      "Motion-aware EMA could lift walkover-window stability further",
    ],
  },
  {
    tag: "Speed",
    title: "Real-time performance",
    points: [
      "End-to-end ~2.7 fps on H200 today",
      "Target 30 fps for broadcast-viable; needs model + pipeline optimisation",
    ],
  },
  {
    tag: "Auto",
    title: "Auto-detection of regions",
    points: [
      "Remove the manual click step (see feat/sam3-light-v1)",
      "Best generic SAM3 prompt: \"sponsor logo on fixed advertising board\"",
    ],
  },
  {
    tag: "Cuts",
    title: "Camera cuts + zoom",
    points: [
      "Detect angle transitions; reseed homography on cuts",
      "Validate on data/zoom-clip-melbourne.mov + multi-clip eval",
    ],
  },
  {
    tag: "Sports",
    title: "Other sports",
    points: [
      "Pipeline supports any clip via configs/eval/reference.yaml",
      "Generalize beyond tennis (football, basketball)",
    ],
  },
];

export default function FutureImprovements() {
  return (
    <div className="flex h-full w-full items-center justify-center px-16">
      <div className="flex w-full max-w-5xl flex-col">
        {/* heading */}
        <div className="animate-stagger mb-8 flex flex-col">
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            Future Improvements
          </h2>
          <div className="mt-3 h-px w-16 bg-accent" />
        </div>

        {/* grid */}
        <div className="grid grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              key={item.tag}
              className={`animate-stagger flex flex-col rounded-xl border border-surface-light bg-surface/50 px-5 py-4 backdrop-blur-sm ${
                i >= 3 ? "col-span-1" : ""
              }`}
              style={{ animationDelay: `${200 + i * 120}ms` }}
            >
              <span className="mb-2 w-fit rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-accent-light">
                {item.tag}
              </span>
              <h3 className="text-[15px] font-semibold text-foreground">
                {item.title}
              </h3>
              <ul className="mt-2 flex flex-col gap-1.5">
                {item.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-[13px] leading-snug text-muted">
                    <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-accent-light/60" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
