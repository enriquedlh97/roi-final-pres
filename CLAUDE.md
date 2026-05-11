# Claude Code briefing, roi-final-pres

You are working in a **Next.js 16 static-export slide deck** that gets deployed to GitHub Pages. It is the public-facing presentation for a capstone project on virtual ad insertion in tennis broadcasts. **The pipeline implementation lives in a sister repo, [`enriquedlh97/homography-fitting`](https://github.com/enriquedlh97/homography-fitting)**, not here.

Read `README.md` for the human-facing version of this. This file is the operational quickref for an AI agent.

---

## Three rules to internalize before editing

1. **`app/page.tsx`, `SLIDE_STEPS`, and the slide-number labels (`<span className="tracking-widest text-accent">NN</span>` inside each slide component) must stay in sync.** When you add / remove / reorder slides, all three move together. The convention is: position 0 = Title, position 1 = Team, both unlabeled; from position 2 onward each slide's label = `position - 1` (so Problem Outline at pos 2 has label `01`). Future Improvements and Thanks at the end are unlabeled per midterm convention.

2. **All asset URLs must use `${BASE}` from `lib/basePath.ts`.** In production the basePath is `/roi-final-pres`. If you write `<img src="/final/foo.png">` it will 404 on GitHub Pages because Next.js doesn't auto-rewrite absolute paths inside JSX. Always write `` <img src={`${BASE}/final/foo.png`}> ``.

3. **Browsers cache media aggressively.** If you replace a video file under the same filename, every browser that already loaded the old version keeps serving stale bytes. The Demo slide uses a `?v=h264-v2` query suffix on its video URLs (`VIDEO_VERSION` constant in `components/deck/Demo.tsx`). **Bump that string any time you regenerate a video.** PNGs don't currently cache-bust, rename PNGs if you replace their contents.

---

## Repo state at hand-off (2026-05-11)

- Deck has **25 slides** producing a ~30-min final presentation
- Latest deploy: live at https://enriquedlh97.github.io/roi-final-pres/
- Default branch: `main` (push here → auto-deploy via `.github/workflows/deploy.yml`)
- Local Node requirement: **20+** for `next build`. The user has nvm with v20.19.5 available, `export PATH="$HOME/.nvm/versions/node/v20.19.5/bin:$PATH"` if the default shell node is too old (it usually is, the system node is 16.13.2).
- The user has **a Chrome tab open at the deployed URL** (tab ID may have changed between sessions). They also have a separate `localhost:8765` tab for an unrelated project, don't touch it.

---

## Common task playbook

### "Edit slide N's text"
1. Find the slide in `components/deck/` (see table below).
2. Edit the string literals.
3. `npm run dev` → http://localhost:3000 to preview, OR `npx next build` to verify there are no type errors.
4. Commit + push to `main`. Wait ~45s for GH Pages to redeploy.
5. Validate via browser automation if available (see "Browser validation" below).

### "Swap a video on the Demo slide"
1. ffprobe the new file, must be H.264 yuv420p inside MP4 or MOV. **MPEG-4 Simple Profile = unsupported = black screen** in Chrome. Re-encode with `ffmpeg -i in.mp4 -c:v libx264 -preset fast -crf 22 -pix_fmt yuv420p -movflags +faststart -an out.mp4`.
2. Drop into `public/final/`.
3. Update the `video: ` field in `components/deck/Demo.tsx`'s `DEMOS` array.
4. **Bump `VIDEO_VERSION`** in the same file.
5. Build + commit + push.

### "Add a new slide"
1. Create `components/deck/MyNewSlide.tsx`. Look at `ProjectJourney.tsx` (multi-card reveal), `HeadlineNumbers.tsx` (grid of stats), `FinalResultRegions.tsx` (tab-switcher), `Demo.tsx` (video tabs), or `LogoOverlay.tsx` (3-stage with text+image) for patterns.
2. Import + add to JSX in `app/page.tsx` at the desired position.
3. Add reveal count to `SLIDE_STEPS` at the matching index.
4. Set the new slide's `<span className="tracking-widest text-accent">NN</span>` to `position - 1` (zero-padded).
5. **Shift every later slide's label by +1.** Easiest via sed loop (see commit `f3cbba1` for an example sweep). Don't forget: `Homography.tsx` has the same label appearing **three times** (multi-step internal layout).
6. If the new slide should appear in the pipeline-overview minimap range, update `PIPELINE_MINIMAP.range` and `.highlights` in `app/page.tsx`.
7. `npx next build` → catch type errors → commit → push.

### "Generate new crop / forensic / video asset"

Source material is in the sister repo `homography-fitting`. Cap the path with `CAPSTONE=~/repositories/capstone-data-candidates/homography-fitting`. Useful invocations:

```bash
# Frame extraction (single frame at index N)
ffmpeg -y -loglevel error -i $CAPSTONE/data/melbourne-walking-over-logo.mov \
    -vf "select='eq(n,704)'" -frames:v 1 out.png

# Frame extraction with crop
ffmpeg -y -loglevel error -i $CAPSTONE/experiments/.../outputs/composited.mp4 \
    -vf "select='eq(n,704)',crop=720:380:600:660" -frames:v 1 out.png

# Vertical stack (original on top, composite on bottom)
ffmpeg -y -loglevel error -i orig.png -i comp.png \
    -filter_complex "[0:v][1:v]vstack" pair.png

# Horizontal concat (multiple stacked pairs)
ffmpeg -y -loglevel error -i a.png -i b.png -i c.png \
    -filter_complex "[0:v][1:v][2:v]hstack=inputs=3" out.png

# Re-encode for browser compat
ffmpeg -y -i in.mp4 -c:v libx264 -preset fast -crf 22 -pix_fmt yuv420p \
    -movflags +faststart -an out.mp4
```

Frame indices that matter on the demo clip:
- 685 → walkover entry
- 694 → ~25% across (pre-contact)
- 704 → player ON the floor logo (the showpiece)
- 713 → ~75% (post-contact)
- 723 → walkover exit
- 350 → mid-clip, used for Logo Overlay + back-banner crops (no player on floor)

---

## Slide-by-slide map

| Pos | Component | What it does |
|---|---|---|
| 0 | `Title.tsx` | Cover. Authors + date. |
| 1 | `Team.tsx` | Photos + roles. |
| 2 | `ProblemOutline.tsx` | Goal + scope. |
| 3 | `Challenges.tsx` | Three challenge cards. |
| 4 | `PriorWork.tsx` | Commercial + academic landscape. |
| 5 | `OurApproach.tsx` | Pipeline thesis. |
| 6 | `ProjectJourney.tsx` | **4 phase cards**, V68 → Phase 2 fail → BTN port → P3-A1. |
| 7 | `ComparisonTable.tsx` | Mitsubishi-style comparison row vs commercial systems. |
| 8 | `PipelineOverview.tsx` | **Hand-coded SVG** of the data-flow graph. Hosts the minimap for slides 9-16. |
| 9 | `Sam2Architecture.tsx` | SAM 2 model card. |
| 10 | `Sam3Experiments.tsx` | Prompt-tuning table for SAM 3-light, + HSV-gate scheme. |
| 11 | `PlayerTracking.tsx` | Person segmentation, with video demo. |
| 12 | `BannerSegmentation.tsx` | Section divider (single-paragraph intro). |
| 13 | `BannerSegmentationVideos.tsx` | 5-tab video showcase. |
| 14 | `Homography.tsx` | 15-step deep dive. Longest single slide. |
| 15 | `SingleVanishingPoint.tsx` | Detail on the line-based VP-constrained fitter (Phase 2 axis). |
| 16 | `LogoOverlay.tsx` | 3-stage compositor walkthrough (original → composite → walkover zoom). |
| 17 | `FinalResultRegions.tsx` | **4-tab result showcase**, back / left / floor / full. Each tab swaps the image + caption. |
| 18 | `WalkoverSequence.tsx` | **5-frame forensic-sheet reveal** at frames 685/694/704/713/723. |
| 19 | `Demo.tsx` | **3 videos**, input / composite / side-by-side. BEFORE/AFTER overlay badges. |
| 20 | `HeadlineNumbers.tsx` | 6 big-number cards. |
| 21 | `VisualReviewDiscipline.tsx` | "Evaluation, three layers": numerical / visual rubric / direct review. |
| 22 | `ModalSpeedBenchmark.tsx` | GPU cost matrix + final-run timing. |
| 23 | `FutureImprovements.tsx` | 6 future-work cards. |
| 24 | `Thanks.tsx` | Closing slide. |

---

## Browser validation playbook

The deck has autoplay videos that prevent `document_idle` from firing → `mcp__claude-in-chrome__computer screenshot` and `read_page` and `find` all **timeout with `Page still loading (executeScript waited 45000ms for document_idle)`**.

Workaround: use `mcp__claude-in-chrome__javascript_tool` which uses a different exec path that does NOT wait for document_idle. Pattern:

```js
(() => {
  // First always pause all videos so subsequent calls have a chance
  document.querySelectorAll('video').forEach(v => {
    try { v.pause(); v.preload='none'; } catch(e){}
  });
  // ... your validation logic ...
})()
```

Don't use async/await with `setTimeout` chains > 30s, the CDP `Runtime.evaluate` will time out and you'll freeze the renderer. Use short sleeps (<= 2000ms) or split into multiple synchronous calls.

When the user reports "I don't see X" but the content is in the DOM, they almost always have a stale cache. Either ask them to hard-refresh (Cmd+Shift+R) or navigate them to `?bust=N` with a fresh number.

---

## Things NOT to do

- **Don't touch the midterm repo** [`roi-midterm-pres`](https://github.com/enriquedlh97/roi-midterm-pres). It's frozen as the midterm-deployed reference. There's even a `midterm-deployed` git tag on it.
- **Don't refactor `Presentation.tsx` or `SlideContext.tsx`** unless you have a strong reason. The reveal-step machinery and arrow-key bindings live there; breaking them silently breaks every slide.
- **Don't add a CMS or content-management layer.** All slide content is intentionally in TSX so it's grep-able and refactor-able. The audience for this code is "a future maintainer skimming files in their editor", keep it that way.
- **Don't add tracking analytics, cookie banners, or third-party SDKs.** Static deck. Stays that way.
- **Don't change `next.config.ts` basePath** unless you're renaming the repo (and even then the workflow + lib/basePath.ts also need updating).
- **Don't commit secrets / API keys / tokens.** There aren't any in here; keep it that way.

---

## Quick health-check before sign-off

After any non-trivial change:

```bash
# 1. Local build
export PATH="$HOME/.nvm/versions/node/v20.19.5/bin:$PATH"  # or whatever Node 20 you have
npx next build       # should end with "○  (Static)  prerendered as static content"

# 2. Push
git add -A && git -c commit.gpgsign=false commit --no-verify -m "..."
git push origin main

# 3. Wait for deploy + verify
RUN_ID=$(gh run list --repo enriquedlh97/roi-final-pres --branch main --limit 1 --json databaseId --jq '.[0].databaseId')
gh run watch $RUN_ID --repo enriquedlh97/roi-final-pres --exit-status

# 4. Smoke-test from terminal (HTML must say "Final Presentation", asset must serve)
curl -s https://enriquedlh97.github.io/roi-final-pres/ | grep -oE '<title>[^<]+</title>'
curl -sI https://enriquedlh97.github.io/roi-final-pres/final/composited.mp4 | head -3

# 5. (optional) browser validation via mcp__claude-in-chrome__javascript_tool
```

If you got this far, the deck is shippable.
