# ROI Final Presentation

Slide deck for the capstone final presentation on **ROI tracking + virtual ad insertion in tennis broadcasts**. Companion deliverable to the homography-fitting capstone repo; this is the public-facing presentation, not the implementation.

🔗 **Live deck:** [https://enriquedlh97.github.io/roi-final-pres/](https://enriquedlh97.github.io/roi-final-pres/)

🔗 **Underlying pipeline + docs:** [`enriquedlh97/homography-fitting`](https://github.com/enriquedlh97/homography-fitting) (FINAL_REPORT.md, code, experiments, eval framework)

🔗 **Midterm deck (frozen, do not touch):** [https://enriquedlh97.github.io/roi-midterm-pres/](https://enriquedlh97.github.io/roi-midterm-pres/)

---

## Quick start

```bash
# 1. Install dependencies (requires Node ≥20)
npm ci

# 2. Local dev server (hot reload, no GitHub-Pages basePath)
npm run dev
# → http://localhost:3000

# 3. Production build (matches what gets deployed)
npx next build
# → emits ./out/ (static HTML/CSS/JS)

# 4. Deploy = push to main
git push origin main
# → GitHub Actions builds + publishes to gh-pages within ~1 min
```

**Node version**: the CI runner uses Node 20. Locally use `nvm use 20` or any ≥20 version, `next build` requires it.

---

## What's in this repo

| Path | What |
|---|---|
| [`app/`](app) | Next.js App Router entry. `page.tsx` is the deck's slide order + reveal counts; `layout.tsx` is the HTML shell + `<title>`. |
| [`components/Presentation.tsx`](components/Presentation.tsx) | The deck runtime, handles arrow-key navigation, fullscreen, the bottom slide-dots, slide/step state. |
| [`components/SlideContext.tsx`](components/SlideContext.tsx) | React context for `useSlideStep()` (per-slide reveal index) and `useSlideMinimap()` (for the Pipeline Overview minimap). |
| [`components/AutoVideo.tsx`](components/AutoVideo.tsx) | `<video muted loop autoplay playsInline>` wrapper used on the demo slides. Pauses on unmount and on tab visibility change. |
| [`components/slides/`](components/slides) | Generic slide layouts (TitleSlide, BulletSlide, ContentSlide, ImageSlide, SectionSlide, TeamSlide, ClosingSlide). |
| [`components/deck/`](components/deck) | **One file per concrete slide in the deck.** This is where ~all the content lives. See "Slide map" below. |
| [`public/`](public) | Static assets. **Videos and large images live here.** Subdirs: `homography/` (midterm geometry figures), `final/` (everything from the final P3-A1 run). |
| [`lib/basePath.ts`](lib/basePath.ts) | One-liner that returns the production basePath `/roi-final-pres`. **All asset URLs must use this** (e.g. `` `${BASE}/final/composited.mp4` ``) or they'll 404 on GitHub Pages. |
| [`next.config.ts`](next.config.ts) | `output: "export"` (static), `basePath: "/roi-final-pres"`, `images: { unoptimized: true }`. |
| [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) | GitHub Actions workflow. Triggers on push to `main`. Builds with Node 20, uploads `out/` artifact, deploys to GH Pages. |

---

## Slide model

### Where the order lives

[`app/page.tsx`](app/page.tsx) is the canonical source of slide order. It exports a JSX tree of slide components in order, plus two synced metadata structures:

```tsx
// app/page.tsx
const SLIDE_STEPS = [
  1,  // 0  Title
  5,  // 1  Team, 1 heading + 4 reveals
  2,  // 2  Problem Outline
  ...
];

const PIPELINE_MINIMAP = {
  slide: 8,                  // The Pipeline Overview slide
  range: [9, 16],            // Slides that highlight a node on it
  highlights: { ... },       // Per-slide node ID to highlight
};

<Presentation slideSteps={SLIDE_STEPS} minimap={PIPELINE_MINIMAP}>
  <Title />
  <Team />
  ...
</Presentation>
```

`SLIDE_STEPS[i]` = number of `→` arrow presses needed to fully reveal slide `i`. Each slide reads its current step via `useSlideStep()` and conditionally reveals content.

### Adding a new slide

1. Create `components/deck/MyNewSlide.tsx` (use an existing slide as template, patterns vary by content type).
2. Import + add to JSX in `app/page.tsx` at the position you want.
3. Add the reveal count to `SLIDE_STEPS` **at the same index** as the JSX position.
4. Update the **slide-number label** inside the new slide's `<span className="tracking-widest text-accent">XX</span>`, labels follow `label = position - 1` (positions 0 & 1 = Title/Team are unlabeled; Future + Thanks at the end are unlabeled).
5. Shift label numbers in every slide **after** your new one by +1 (sed pattern: `s|text-accent">NN</span>|text-accent">NN+1</span>|`).
6. If your slide affects the pipeline-overview minimap, update `PIPELINE_MINIMAP.range` and `.highlights`.
7. `npx next build` to catch type errors. Push to deploy.

### Removing / reordering slides

Same idea in reverse. Be careful: SLIDE_STEPS, the JSX order in page.tsx, and the slide-number labels inside the components must stay in sync. The label-update step is the easiest one to forget, best done via `sed -i ''` across the affected files.

### Reveal patterns

- **Single-step slide** (no reveals): `SLIDE_STEPS[i] = 1`, slide ignores `useSlideStep()`.
- **Card-by-card reveal** (Project Journey, Visual Review): `step >= n` style, each card lights up at its step.
- **Tab switch** (Demo, Final Result, Walkover): `step === n` style, show only one tab/image at a time.
- **Multi-stage with crossfade** (Logo Overlay, Homography): combination of the above with CSS opacity transitions.

---

## Slide map (deck order, 25 slides total)

| # | UI counter | Label | Slide | Component | Reveals |
|---|---|---|---|---|---|
| 0 | 1 | n/a | Title | `Title.tsx` | 1 |
| 1 | 2 | n/a | Team | `Team.tsx` | 5 |
| 2 | 3 | 01 | Problem Outline | `ProblemOutline.tsx` | 2 |
| 3 | 4 | 02 | Key Challenges | `Challenges.tsx` | 1 |
| 4 | 5 | 03 | Prior Work | `PriorWork.tsx` | 4 |
| 5 | 6 | 04 | Our Approach | `OurApproach.tsx` | 4 |
| 6 | 7 | 05 | **Project Journey** | `ProjectJourney.tsx` | 4 (one per phase) |
| 7 | 8 | 06 | How We Compare | `ComparisonTable.tsx` | 2 |
| 8 | 9 | 07 | Full Pipeline Overview | `PipelineOverview.tsx` | 1 (hosts the minimap) |
| 9 | 10 | 08 | SAM2 Architecture | `Sam2Architecture.tsx` | 1 |
| 10 | 11 | 09 | SAM3 Experiments | `Sam3Experiments.tsx` | 1 |
| 11 | 12 | 10 | Player Segmentation | `PlayerTracking.tsx` | 2 |
| 12 | 13 | 11 | Banner Segmentation & Tracking | `BannerSegmentation.tsx` | 1 (section divider) |
| 13 | 14 | 12 | Banner Segmentation Videos | `BannerSegmentationVideos.tsx` | 5 |
| 14 | 15 | 13 | Homography | `Homography.tsx` | 15 |
| 15 | 16 | 14 | Single Vanishing Point | `SingleVanishingPoint.tsx` | 1 |
| 16 | 17 | 15 | New Logo Overlay | `LogoOverlay.tsx` | 3 (stages) |
| 17 | 18 | 16 | Final Result, region by region | `FinalResultRegions.tsx` | 4 (regions) |
| 18 | 19 | 17 | Walkover Sequence | `WalkoverSequence.tsx` | 5 (frames) |
| 19 | 20 | 18 | Demo | `Demo.tsx` | 3 (videos) |
| 20 | 21 | 19 | **Headline Numbers** | `HeadlineNumbers.tsx` | 1 |
| 21 | 22 | 20 | Evaluation, three layers | `VisualReviewDiscipline.tsx` | 3 (layers) |
| 22 | 23 | 21 | Modal + Speed Benchmarking | `ModalSpeedBenchmark.tsx` | 1 |
| 23 | 24 | n/a | Future Improvements | `FutureImprovements.tsx` | 1 |
| 24 | 25 | n/a | Thanks | `Thanks.tsx` | 1 |

---

## Assets

All static media lives under [`public/`](public). Anything outside the basePath needs `${BASE}` prepended in code (`${BASE}/final/composited.mp4`).

### `public/final/`, the FINAL deliverable assets (all from P3-A1 run)

Sourced from `homography-fitting/experiments/2026-05-05_18-38-39_hull_H200/`. Regenerated via `ffmpeg` if you need different crops; see `README` in the homography-fitting repo or the commit history of this repo for the exact ffmpeg invocations.

| File | Used by | Notes |
|---|---|---|
| `input_clip.mov` | Demo (BEFORE) | 60 fps, 767 frames, 36 MB. H.264 in `.mov` container, Chrome/Safari/Firefox play it fine. |
| `composited.mp4` | Demo (AFTER), Logo Overlay stage 02 | Final composite, H.264 yuv420p. |
| `side_by_side_vs_gold.mp4` | Demo (side-by-side) | Ultra-wide 2868×536 (5.35:1 aspect). **Must be H.264**, previously was MPEG-4 Simple Profile which Chrome refuses to play. See "Video codec gotcha" below. |
| `crops_back_3banners.png` | Final Result · Back banners | 870×300. 3 distinct obj_1/2/5 positions, paired orig/composite. |
| `crops_left_1.png` | Final Result · Left side banner | 460×320. Single paired crop. |
| `crops_floor_walkover.png` | Final Result · Court floor logo | 2160×760. 3 walkover-window frames (f694/704/713). |
| `crops_full_3.png` | Final Result · Full frame | 5736×2207. 3 of 6 columns from the eval-framework strip. |
| `walkover_{entry,pre,contact,post,exit}.png` | Walkover Sequence | 6-column forensic sheets at frames 685/694/704/713/723. |
| `walkover_consecutive.png` | (not currently used in deck, available) | Every frame in the walkover window as a horizontal strip. |
| `logo_overlay_original.png` | Logo Overlay stage 01 | Frame 350 from input_clip. |
| `logo_overlay_composite.png` | Logo Overlay stage 02 | Frame 350 from composited.mp4. |
| `logo_overlay_walkover_zoom.png` | Logo Overlay stage 03 | 900×450 crop of frame 704 around the floor logo + player. |

### `public/homography/`, midterm geometry figures (still used by Homography slide)

`vanishing_point.png`, `1_original.png`, `2_bbox.png`, `3_rectified.png`, `4_logo_flat.png`, `5_overlay.png`, plus a `fit-steps/` subdir.

### Other `public/` videos, used by midterm-derived slides (Banner Segmentation Videos, Player Tracking)

`baners_stable_camera.mp4`, `banners_moving_camera.mp4`, `logos_stable_camera.mp4`, `logos_moving_camera.mp4`, `camera_cuts_experiment.mp4`, `player-tracking.mp4`, `sam2-*.mp4`, `original-tennis-clip.mp4`, `demo-stable.mp4`, `demo-moving.mp4`, `demo-player-overlay.mp4`.

### Cache-busting (important)

GitHub Pages serves video files with no cache headers we control. If you replace a media file in place (same filename, new content), browsers that have the old version will keep serving stale bytes.

**The Demo slide uses `?v=h264-v2` query suffixes on all video URLs** to force a refresh. Bump that version string (`components/deck/Demo.tsx → VIDEO_VERSION`) any time you regenerate a video. The PNG references don't currently cache-bust; if you replace a PNG with different content under the same filename, ask the user to hard-refresh, or rename the file.

### Video codec gotcha

GitHub Pages's `Content-Type` for `.mp4` is fine, but the **codec inside the file matters**: Chrome only plays H.264, H.265, VP8, VP9, AV1. **MPEG-4 Simple Profile (legacy Xvid-style) → black screen with `MEDIA_ERR_SRC_NOT_SUPPORTED`**.

Re-encode any suspect file:
```bash
ffmpeg -i in.mp4 -c:v libx264 -preset fast -crf 22 -pix_fmt yuv420p -movflags +faststart -an out.mp4
```

---

## Common modifications

### Change text on a slide
Each slide file is single-purpose. Open the `.tsx` file, edit the string literals. `npm run dev` for hot reload preview.

### Swap an image
1. Drop new image into `public/final/` (keep filename consistent or update the reference).
2. Update the `image: "..."` field in the slide's data array (e.g. `STAGES` in LogoOverlay, `REGIONS` in FinalResultRegions, `FRAMES` in WalkoverSequence).
3. If the new image has a very different aspect ratio, check that the slide's `<img>` container CSS still produces a sensible layout. The Final Result slide caps height at `max-h-[55vh]` and centers, that handles most aspect ratios.

### Swap a video
1. Drop new video into `public/final/`. Verify codec with `ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of csv=p=0 file.mp4`, must be `h264` or similar browser-supported.
2. Update reference in `components/deck/Demo.tsx` (or wherever it's used).
3. **Bump `VIDEO_VERSION`** in `components/deck/Demo.tsx` to bust browser cache.

### Reorder slides
See "Slide model" above. Three things must stay in sync: JSX order in `app/page.tsx`, `SLIDE_STEPS` array (same length, same indices), and slide-number labels inside each component (`<span className="tracking-widest text-accent">NN</span>`).

### Rebuild the SVG pipeline diagram
[`components/deck/PipelineOverview.tsx`](components/deck/PipelineOverview.tsx) has a hand-coded SVG. Node coordinates are absolute. Each rect-and-text pair is wrapped in a `<g>` that respects the minimap-highlight opacity. To rename a node, just edit the `<text>` content; to move one, edit the `x/y/width/height` on its `<rect>` and reposition its `<text>` to match.

### Re-encode an asset
See the ffmpeg recipes above. Crops, side-by-side strips, and frame extractions were generated by `ffmpeg` directly, no ImageMagick required. Commit messages in this repo's history have the exact incantations used for `crops_back_3banners.png`, `crops_floor_walkover.png`, and `side_by_side_vs_gold.mp4` re-encode.

---

## Project context

**This deck presents** the homography-fitting capstone project. The final delivered output is:
- Config: `configs/experiments/eval_walkover_p3_a1_ball_tracker_net_v1.yaml`
- Run: `experiments/2026-05-05_18-38-39_hull_H200/`
- Recipe: V68 manually-clicked court corners + BallTrackerNet learned-keypoint dynamic homography + hybrid_lock@30 + V68's compositor settings unchanged.

The pipeline code, eval framework, FINAL_REPORT.md narrative, and all experiment artifacts live in the **sister repo**: [`enriquedlh97/homography-fitting`](https://github.com/enriquedlh97/homography-fitting).

This deck repo only contains:
- The deck source (Next.js)
- Compiled visual assets from the final run (videos, paired crop strips, walkover forensic sheets)

If you're trying to **modify the pipeline itself**, you're in the wrong repo, go to homography-fitting and read its `docs/FINAL_REPORT.md`.

---

## Deployment

### How it works
- Default branch: `main`
- Push to `main` → GitHub Actions workflow (`.github/workflows/deploy.yml`) → static export to `out/` → `actions/deploy-pages@v4` publishes
- Cycle time: ~45 seconds from push to live

### Watching a deploy
```bash
gh run list --repo enriquedlh97/roi-final-pres --branch main --limit 3
gh run watch <RUN_ID> --repo enriquedlh97/roi-final-pres --exit-status
```

### Manual deploy
There's no manual deploy path; GitHub Pages is wired to the workflow. If the workflow breaks, debug it locally first:
```bash
npx next build              # full type-check + build
ls -la out/                 # verify output exists
```

If `npm ci` complains about Node version, run `nvm use 20` first.

---

## Style / aesthetic notes

- Dark theme. Background is `bg-zinc-950` (set in `globals.css`).
- Primary accent: `var(--accent)` ≈ Tailwind `indigo-500` (`#6366f1`).
- Typography: Geist Sans for prose, Geist Mono for numbers, labels, codes.
- All slide-number labels use `font-mono text-sm tracking-widest text-accent`.
- All section-title h2s use `text-3xl font-bold tracking-tight text-foreground`.
- All slide containers max-width somewhere between `max-w-5xl` and `max-w-[1500px]` depending on content density.

When adding a new slide, copy CSS conventions from a similar existing slide to keep the visual consistency.

---

## Sister deliverables

| What | Where |
|---|---|
| Pipeline code, eval framework, configs, experiments | [homography-fitting](https://github.com/enriquedlh97/homography-fitting) |
| Project narrative (problem → phases → final → eval) | [homography-fitting/docs/FINAL_REPORT.md](https://github.com/enriquedlh97/homography-fitting/blob/main/docs/FINAL_REPORT.md) |
| Raw experiment log (1900+ lines) | [homography-fitting/docs/EXPERIMENT_LEDGER.md](https://github.com/enriquedlh97/homography-fitting/blob/main/docs/EXPERIMENT_LEDGER.md) |
| Eval framework spec | [homography-fitting/docs/EVALUATION.md](https://github.com/enriquedlh97/homography-fitting/blob/main/docs/EVALUATION.md) |
| Midterm version of this deck (frozen) | [roi-midterm-pres](https://github.com/enriquedlh97/roi-midterm-pres) |
