# Audit triage — six-axis blind review

Six blind sub-agent passes on `final_report.qmd` and `final_report.pdf`, persona = aggressive Harvard CS faculty + MELIC researcher. Each finding is annotated with the source axis and the agent's finding ID for back-reference.

Axes:
- **A1** Citations and bibliography (re-run)
- **A2** Mathematical / algorithmic correctness
- **A3** Quantitative results integrity
- **A4** Methodological soundness
- **A5** Writing, structure, layout (re-run)
- **A6** Contributions and research-paper voice

Deduplicated and merged.

---

## CRITICAL — fix before the committee sees it

### C1. Clip is 59 fps, not 60 fps
- **Source:** A3-F001
- **Where:** abstract (l. 15), §2.2 (l. 100), §7.5 headline bullet (l. 615)
- **What:** Report says "60 fps (767 frames)". Actual is `input_fps: 59.23857868020305` per `metrics.json`. 767 / 59.24 = 12.95 s, which matches the "thirteen-second" descriptor; 767 / 60 = 12.78 s does not. The sister-repo `docs/FINAL_REPORT.md` already says "59 fps".
- **Fix:** "approximately 59 fps" (or "≈59.24 fps") in all three locations.

### C2. "Approximately 80 walkover-window frames" — actual is 16
- **Source:** A3-F002, A5-F005
- **Where:** §4.4 (l. 297)
- **What:** "approximately 80 walkover-window frames where the camera drifts pick up stable per-frame tracking." `metrics.json` reports `hybrid_lock_locked_frames: 751`, `hybrid_lock_ramp_frames: 16`, `hybrid_lock_estimate_frames: 0`. No frames reach full estimate; only 16 ramp.
- **Fix:** "approximately 16 walkover-window frames ramp toward the dynamic estimate (751 of 767 frames stay locked at the seed homography; 16 ramp; 0 reach the full estimate state on this clip)."

### C3. Walkover window is 39 frames, not 38
- **Source:** A3-F003, A5-F005
- **Where:** @fig-walkover-grid caption (l. 582)
- **What:** Caption says "aggregated across all 38 frames in the window." Window is 685–723 inclusive = 39 frames. `runner.py:174` confirms `window_len = end - start + 1`.
- **Fix:** "across all 39 frames in the window."

### C4. Homography is in PGL(3), not SL(3)
- **Source:** A2-F001, A2-F020
- **Where:** §2.1 "Geometry" prose (l. 92); RANSAC objective @eq-btn-ransac (l. 264)
- **What:** Homography is defined up to non-zero scale; the correct group is PGL(3, ℝ). SL(3) is a strict 8-D subgroup that fixes det=1 — a specific normalization, not the homography group. OpenCV's `findHomography` actually normalizes to `h[2,2]=1`, which is not even the SL(3) chart.
- **Fix:** Replace `\mathrm{SL}(3)` with `\mathrm{PGL}(3, \mathbb{R})` (or `\mathrm{GL}(3,\mathbb{R})/\mathbb{R}^*`) in both locations.

### C5. Hybrid-lock displacement metric: equation says max, code computes mean
- **Source:** A2-F002
- **Where:** @eq-hybrid-disp (l. 282)
- **What:** Equation writes `d_t = max_i ‖π(H_seed c_i) - π(H_t c_i)‖`. `court_geometry.py:1335-1343` `corner_displacement_px` uses `.mean()`. With τ_lock=30 px tuned against the mean implementation, the equation is the side that should change.
- **Fix:** `d_t = (1/4) Σ_i ‖π(H_seed c_i) - π(H_t c_i)‖_2` (mean, not max).

### C6. Hybrid-lock ramp equation interpolates homographies; code interpolates corners
- **Source:** A2-F003, A2-F010
- **Where:** @eq-hybrid-lock and surrounding prose (l. 287–295)
- **What:** Equation: `(1 - β_t) H_seed + β_t H_t` with `β_t = min(1, r_t/R)`, R=3. Two errors: (a) the code never linearly combines homographies; `HybridLockState.step` does a corner-space recurrence `last_committed += (target − last_committed) / steps_left` (`court_geometry.py:1421-1448`); (b) ramp length is adaptive `n = max(3, ⌈d_t / v_max⌉)` with `v_max = 2 px/frame`, not a fixed R=3 (so for d_t=30 the ramp is 15 frames, not 3).
- **Fix:** Rewrite as a corner-space recurrence with adaptive length:

  $$\mathbf{c}_i^{(k)} = \mathbf{c}_i^{(k-1)} + \frac{1}{n-k+1}\bigl(\pi(H_t \mathbf{c}_i) - \mathbf{c}_i^{(k-1)}\bigr),\quad k=1,\dots,n$$

  with $n = \max(R_{\min}, \lceil d_t / v_{\max} \rceil)$, $R_{\min}=3$, $v_{\max}=2$ px/frame. Drop the claim "R = 3" as a constant.

### C7. LED-blend formula has the wrong denominator
- **Source:** A2-F004
- **Where:** @eq-led-blend (l. 346)
- **What:** Report writes the gain as `Y(I_inpaint(p)) / (Y(L̃(p)) + ε)` — background over warped-logo luminance. Code (`composite/painted.py:359-373`) is `illumination(p) / median(illumination_inside_quad)` raised to `shade_strength`. The warped logo's own luminance does not appear in the gain at all.
- **Fix:**
  $$\tilde{L}_t^{\text{led}}(p) = \tilde{L}_t(p) \cdot \mathrm{clip}\!\left(\frac{Y(G_\sigma * \hat I_t^{\text{inpaint}})(p)}{\bar Y_{\text{quad}}}\right)^{\!s},$$
  where $\bar Y_{\text{quad}}$ = median Gaussian-blurred background luminance inside the placement quad, $s$ = `shade_strength`, and the clip range is `[shade_clip_min, shade_clip_max]`.

### C8. `nie2021` middle-author surname is misspelled
- **Source:** A1-F001
- **Where:** `references.bib` entry `nie2021`
- **What:** Listed as "Chen, Shixiang". Actual author per DBLP `conf/wacv/NieCH21` and CVF Open Access: **Shixing Chen**. Different researcher.
- **Fix:** `author = {Nie, Xiaohan and Chen, Shixing and Hamid, Raffay}`.

### C9. TennisCourtDetector bib claims "MIT License" and "2021" — both wrong
- **Source:** A1-F002, A1-F003
- **Where:** `references.bib` entry `yastrebksv_tenniscourtdetector` (l. 35–41)
- **What:** GitHub API returns `"license": null` for `yastrebksv/TennisCourtDetector` (no LICENSE file). Repo `created_at: 2023-06-09`, not 2021. Mis-claiming an MIT license is materially worse than a typo for a project that ships derived weights.
- **Fix:** Remove the "MIT License" claim from `note`; set `year = {2023}`. Note that without a license the derived TrackNet adaptation is technically all-rights-reserved — the team may want to email the upstream author for clarification.

### C10. "Eq. Equation 8" / "Table Table 4" / "Table Table 5" double-prefix bugs
- **Source:** A5-F001, A5-F002, A5-F003
- **Where:** @fig-compositor-steps caption (l. 361), §7.2 prose (l. 582), §7.4 prose (l. 590); also l. 505 and l. 645
- **What:** Source writes "Eq. @eq-led-blend" or "Table @tbl-final"; Quarto's auto-prefix produces "Eq. Equation 8" and "Table Table 4" in the PDF.
- **Fix:** Drop every manual "Eq. " / "Table " prefix; let Quarto handle it. `(@eq-led-blend)` → "(Equation 8)"; `@tbl-final` → "Table 4".

### C11. Title-page date renders as "2026-05-01"
- **Source:** A5-F004
- **Where:** PDF p. 1; qmd l. 13 (`date: "May 2026"`)
- **What:** Quarto parses "May 2026" as 2026-05-01 and renders ISO format.
- **Fix:** Add `date-format: "MMMM YYYY"` to the YAML, OR change the date string to a format Quarto won't auto-parse, e.g., `date: "May, 2026"` plus the format override.

### C12. "Section [Future Work]" / "Section [Related Work]" renders as bare hyperlink text
- **Source:** A5-F006
- **Where:** qmd l. 80, 136, 359, 451, 505, 606
- **What:** PDF prints "described in Section The visual-review override" — reads as broken English. No section number is emitted; print readers lose the cue entirely.
- **Fix:** Add `{#sec-future-work}` IDs to each header and switch to `[Section @sec-future-work]` form (renders "Section 9"). Or rewrite each as "Section 6.4 (The visual-review override)" with the section number hand-anchored.

### C13. Same placement is named "side panel" / "left side panel" / "left-side banner" interchangeably
- **Source:** A5-F007
- **Where:** abstract (l. 15), headline numbers (l. 612), §2.2 (l. 102, 111), Table 1, Table 4, figures 4/6 captions
- **What:** Abstract says "one side panel"; headline-numbers bullet says "one left side panel"; tables and figures say "left-side banner".
- **Fix:** Pick one canonical term (recommend "left-side banner") and replace globally.

### C14. Single-clip evaluation supports population-level claims; abstract overclaims
- **Source:** A4-F001, A6-F003, A6-F011
- **Where:** abstract; §7 Results; §7.5 headline bullets; §8.1 Strengths
- **What:** Entire empirical basis is one 13-second clip. The team's own `docs/EVALUATION.md` mandates three-clip evaluation; the report ran only Melbourne and skipped the zoom-clip stress test (which is exactly the scenario that would exercise the dynamic-homography axis). Abstract presents "0.985 IoU, SSIM 0.9999" with no qualifier.
- **Fix:** Two options. (a) Run the zoom and side-view clips before final submission — the framework supports it. (b) Reframe every quantitative claim as "on the canonical Melbourne demonstration clip" throughout: abstract, headline bullets, conclusion. The Limitations section already concedes this; the abstract has to as well.

### C15. Gate thresholds were calibrated from V68; V68's descendant is then certified against them
- **Source:** A4-F002
- **Where:** @tbl-gates; §8.2 Limitations
- **What:** `walkover_logo_visible_pct > 0.10` calibrated to gold's 0.18; `walkover_occlusion_iou > 0.80` calibrated to V68. P3-A1 is then evaluated against these same gates. Tautological. The abstract presents gate-passing as if external.
- **Fix:** (a) Add a sensitivity row: what happens if every gate is tightened by 10% / 25%? (b) Distinguish "absolute-grounded" gates (SSIM > 0.95 is a well-established perceptual floor) from "V68-grounded" gates and only claim independent validity for the former. (c) Recast the framework's role honestly: it is a regression detector between candidates, not an absolute certification.

### C16. Rubric scorer is undisclosed — actually an LLM, presented as human
- **Source:** A4-F003
- **Where:** §5.3 Layer 2; §6.4 visual-review override
- **What:** Report says "scored manually by a reviewer" (singular, anonymous). The sister-repo ledger and the project's memory both confirm: Layer 2 scoring was done by LLM vision sub-agents reading PNG crops. The override at Layer 3 was a single human stakeholder. No inter-rater reliability anywhere. Misrepresenting LLM scoring as human review is a research-integrity issue, not just an omission.
- **Fix:** State explicitly that Layer 2 was scored by a vision-capable LLM operating on paired crop strips, and that Layer 3 was a single domain-expert visual review. Recast the §6.4 finding as "LLM-judged rubric vs human reviewer disagreed" — which is a more interesting result and an honest one. Add at minimum a small calibration paragraph (LLM-vs-human agreement on 5–10 candidates).

### C17. Broadcast clip has no rights-holder attribution
- **Source:** A6-F001
- **Where:** §2.2 (l. 100), Acknowledgements, figure captions
- **What:** "the 2026 Melbourne broadcast" — never names broadcaster, rights-holder, or licensing basis. For a paper that displays altered broadcast frames containing third-party logos, the absence is the single biggest IP exposure.
- **Fix:** Add a "Broadcast source" line in §2.2 naming the rights-holder. Add a footnote on the first figure depicting broadcast frames: "Broadcast frames reproduced for academic research and commentary; all rights remain with the original rights-holder." Clear with MELIC before any external release.

### C18. Third-party trademarks shown without disclaimer
- **Source:** A6-F002
- **Where:** abstract; §2.2; @fig-back, @fig-left, @fig-floor, @fig-walkover-grid
- **What:** Report depicts and names KIA, YoPRO, MELBOURNE wordmark, Red Bull. None accompanied by a trademark notice. The visual pattern — removing KIA, YoPRO, MELBOURNE and inserting Red Bull — is precisely the brand-substitution scenario brand owners' counsel flags.
- **Fix:** Add a "Trademarks" block before Acknowledgements: list each mark by name; state no affiliation with the trademark owners; state academic-demonstration-only; state marks remain owners' property. For an external journal submission, consider replacing the inserted Red Bull logo with a fictitious brand — zero impact on the technical contribution.

---

## MAJOR — should fix before submission

### M1. SAM 2 memory-attention equation is mis-simplified
- **Source:** A2-F005
- **Where:** @eq-sam2-memory (l. 229)
- **What:** Three issues: (a) one cross-attention head, no self-attention — the actual block is a stack of self-attn → cross-attn blocks; (b) keys/values from spatial memory + object pointers concatenated, but the equation hides the pointers; (c) `K = MW_K`, `V = MW_V` projections never written.
- **Fix:** Label as schematic and add the full single-block form:

  $$F'_t = F_t + \mathrm{SelfAttn}(F_t),\quad \tilde F_t = F'_t + \mathrm{CrossAttn}(Q = F'_t W_Q,\ K = [M; P] W_K,\ V = [M; P] W_V)$$

  where $M$ = spatial memory, $P$ = object pointers, citing [@ravi2025sam2] Fig. 3.

### M2. MatAnyone gloss confuses the "current query" with the memory readout
- **Source:** A2-F006
- **Where:** §4.6 (l. 311–317)
- **What:** The fusion equation is correct, but the prose says "$U_t \to 1$ at boundaries (trust the current query, preserve detail) and $U_t \to 0$ in core regions (trust the propagated memory)" — $V_t^m$ is the memory readout at the current query, not the query itself. The phrase "trust the current query" is technically wrong.
- **Fix:** "$U_t \to 1$ in regions where the alpha changed substantially between frames (typically object boundaries) — fuse the freshly-attended memory readout $V_t^m$. $U_t \to 0$ in stable core regions — keep the propagated $V_{t-1}$ to suppress flicker."

### M3. RANSAC fallback description omits the "<4 keypoints" case
- **Source:** A2-F007
- **Where:** §4.2 (l. 267)
- **What:** Report: "When fewer than five keypoints are detected we fall back to an exhaustive best-of-twelve four-point configuration search." Code paths: ≥5 → RANSAC; =4 → best-of-12; <4 → returns no homography (placement holds seed). Report drops the <4 case.
- **Fix:** "When at least five keypoints are detected we run RANSAC with a five-pixel reprojection threshold; with exactly four keypoints we fall back to an exhaustive best-of-twelve four-point configuration search [@yastrebksv_tenniscourtdetector]; with fewer than four detections the estimator returns no homography and the placement holds the seed."

### M4. @eq-btn-ransac mis-states RANSAC as a Huber-loss M-estimator
- **Source:** A2-F008
- **Where:** @eq-btn-ransac (l. 263)
- **What:** Equation writes `arg min_H Σ ρ(...)` (continuous Huber loss / IRLS). RANSAC is a discrete consensus-set search. `cv2.findHomography(..., RANSAC, ransac_threshold_px=5.0)` is what runs.
- **Fix:**

  $$\hat H_t^{\text{net}} = \arg\max_H\;\Big|\{k \in \mathcal{I} : \|(\hat u_k, \hat v_k) - \pi(H[X_k, Y_k, 1]^\top)\| < \tau_{\text{reproj}}\}\Big|,\quad \tau_{\text{reproj}} = 5\,\text{px},$$

  followed by inlier-only DLT refinement.

### M5. Frame-zero bridge: code uses classical estimator H, not manual H
- **Source:** A2-F011
- **Where:** @eq-frame-zero-bridge (l. 271)
- **What:** Equation: `B = H_manual(0) · H_btn(0)^-1`. Code (`court_geometry_ball_tracker.py:616`): `bridge = h_cls @ h_btn_inv` — the *classical* line-based estimator's frame-0 homography, not the manually-clicked one. The manually-clicked corners enter through the hybrid-lock seed, separately.
- **Fix:** Rename to $H_{\text{classical}}(0)$ and explain: the BTN→classical bridge aligns YAML `court_quad` fractional coords with the BTN reference rectangle; the manually-clicked seed enters via the hybrid-lock state, not via this bridge.

### M6. HoughCircles described as "peak detector" — misleading
- **Source:** A2-F009
- **Where:** §4.2 (l. 255)
- **What:** Code runs `cv2.HoughCircles` with `minRadius=10, maxRadius=25, param2=2` on a binarized heatmap. It is a Hough-gradient *circle* detector coerced into peak-centring by `param2=2`. Calling it a peak detector elides the radius assumption and the circle-detector mechanism.
- **Fix:** "Sub-pixel keypoints are extracted by thresholding the heatmap (τ = 170/255) and locating the centre of the strongest connected blob via `cv2.HoughCircles` with a very loose accumulator threshold (param2 = 2) and radii in [10, 25] px on the 640×360 resized frame — a peak-centring trick inherited from the upstream TennisCourtDetector."

### M7. Walkover-delta is on full BGR, not luminance
- **Source:** A2-F012
- **Where:** §5.4 / walkover-detection step 2 (l. 458)
- **What:** Report: `Δ_t = mean |Y(I_t) - Y(C_t)|` (luminance delta). Code (`eval/walkover.py:86-90`): `np.abs(roi_o - roi_c).mean()` on full BGR — no luminance conversion.
- **Fix:** Either change the equation to `Δ_t = (1/3) mean ‖I_t(p) - C_t(p)‖_1`, OR change the code to convert to luminance first (the luminance variant is arguably the better metric).

### M8. @eq-occlusion polarity convention is non-standard
- **Source:** A2-F014, A5-F026
- **Where:** @eq-occlusion (l. 353)
- **What:** Equation is self-consistent but inverts the standard matting convention. Standard: $\alpha=1$ on foreground, $O = \alpha F + (1-\alpha) B$. Report: $\alpha=1$ "where the player covers the logo", with $(1-\alpha) \tilde L$ + $\alpha I$. The code's effective alpha is "logo visibility" — the opposite of the report's α.
- **Fix:** Rewrite to match the code's convention:

  $$O_t = \alpha_t^{\text{logo}} \tilde L_t^{\text{led}} + (1 - \alpha_t^{\text{logo}}) I_t,\quad \alpha_t^{\text{logo}} = m_t^{\text{quad}} \cdot (1 - \alpha_t^{\text{player}}).$$

### M9. Inpaint equation uses a temporal-median clean-plate term the compositor doesn't use
- **Source:** A2-F015
- **Where:** §4.7 (l. 329)
- **What:** Report describes the inpaint as a temporal median over clean-plate frames at the same pixel. Compositor code (`composite/painted.py:467-495`) uses a **spatial** median over a surround region of the current frame, plus Gaussian blur, plus matched noise. The clean-plate video is used by the *eval* (walkover detection, occlusion IoU), not by the compositor.
- **Fix:** Replace with the spatial-median form, or admit that the deployed config does not wire the clean plate into the compositor.

### M10. Walkover-IoU threshold T is undefined
- **Source:** A4-F009
- **Where:** @tbl-gates row `walkover_occlusion_iou`
- **What:** Metric is `IoU(1{|I - C| > T}, 1{|O - L_baked| > T})`. T never given. Metric is non-trivially sensitive to T; reader cannot reproduce 0.985.
- **Fix:** State T explicitly (units, luminance or BGR, any morphological pre-processing) and add a one-row sensitivity sweep (IoU at T-5, T, T+5).

### M11. Hiera, Canny, Hough, Lab ΔE, Huber, EMA named without citation
- **Source:** A1-F005, A1-F007, A1-F008, A1-F009, A1-F010, A1-F014
- **Where:** §4.2 (l. 225 Hiera, l. 255 Hough, l. 482 Canny + Hough), §5.2 (l. 428 Lab ΔE), §4.2 (l. 267 Huber), §4.4 (EMA)
- **Fix:** Add bib entries and cite at first mention:
  - Ryali et al. ICML 2023 "Hiera"
  - Canny 1986 "A computational approach to edge detection"
  - Matas, Galambos, Kittler 2000 (probabilistic Hough) or Duda & Hart 1972 (classical Hough)
  - Sharma et al. 2005 (CIEDE2000) for Lab ΔE
  - Huber 1964 for Huber loss

  EMA needs a value (the α coefficient) more than a citation.

### M12. SAM 3 named in Future Work without citation; verify it's what the implementation actually used
- **Source:** A1-F004, A6-F005
- **Where:** §9 (l. 661)
- **What:** "A parallel branch in our implementation explored using SAM 3 text prompts." SAM 3 exists (Meta AI 2025/2026) but has no bib entry. Also: confirm the implementation actually used SAM 3, not Grounded-SAM / GroundingDINO / OWLv2 / SAM-1 + text encoder.
- **Fix:** Either add `@misc{meta2025sam3, ...}` and cite, or correct the model name to whatever was actually used.

### M13. `fischler1981ransac` is `@inproceedings` but RANSAC is a CACM journal article
- **Source:** A1-F011
- **Where:** `references.bib`
- **Fix:** Change to `@article` with `journal = {Communications of the ACM}`.

### M14. Phase 2 diagnosis "estimator noise is the binding constraint" is overstated
- **Source:** A4-F004
- **Where:** §6.2, §8.3 first bullet
- **What:** Sweep had three knobs; ledger entry P2-C012 shows tol=30, vp=0.5 produced floor SSIM 0.9843 with the line estimator — i.e., the estimator was usable with the right controller. The actionable diagnosis is that the @eq-hybrid-disp metric (max projected-corner L2) is direction-blind — a controller design issue, confounded with the estimator-noise hypothesis.
- **Fix:** Soften to "for this estimator and this displacement-gate, no Pareto improvement was reachable in the sweep." Acknowledge that an axis-decomposed gate (separate vertical/horizontal thresholds) was not tested.

### M15. `any_regression: true` is presented as a soft pass without making the override prominent
- **Source:** A4-F005
- **Where:** §7 Results, paragraph after Table 4
- **What:** Final deliverable triggers `any_regression: true` (floor jitter 0.494 → 0.805, +63%). Framework's exit code is 3 = regression. Report explains this away as "by design" in a paragraph; reader doesn't see that the framework's own verdict was overridden.
- **Fix:** (a) Either modify the eval framework to compute jitter conditional on hybrid-lock state (locked frames vs ramping frames separately), OR (b) state prominently in Results that one reference-comparison flag fires by design; do not bury.

### M16. Visual-review override diagnosis is post-hoc with N=1 reviewer
- **Source:** A4-F006
- **Where:** §6.4
- **What:** The lesson "rubric is not ground truth" rests on one disagreement between an LLM rubric and one human. No inter-rater reliability; no re-scoring with a stricter prompt; the conclusion generalizes from one preference event.
- **Fix:** Reframe as a process recommendation, not a methodological claim: "In our project, rubric scoring drifted from the stakeholder's preference; we therefore adopted direct review as the final gate."

### M17. Cost estimate excludes operator overhead
- **Source:** A4-F007, A4-F013
- **Where:** @tbl-gpu caption ("approximately 0.36 USD per clip"); §7.4 throughput
- **What:** The 0.36 USD is GPU-hours of the final inference only. Excludes: seed-frame clicks × 5 regions, clean-plate generation, MatAnyone seed-mask annotation, rubric scoring, the ~50 H200 iteration cycles in Phase 3 (~$18 of H200 alone), and the V68 baseline cost. The 2.68 fps figure also excludes operator time per clip.
- **Fix:** Decompose: "Marginal H200 inference cost per clip: 0.36 USD. Per-clip operator time (clicks + clean-plate confirmation): ~X minutes. One-time per-tournament setup: ~Y. Iteration during development: not amortised." Acknowledge that "real-time" means real-time inference *given* a pre-prepared seed and clean plate.

### M18. Clean-plate dependency understated
- **Source:** A4-F008
- **Where:** §4.7 step 1, §5.4, §8.1 strengths
- **What:** Three load-bearing components depend on a clean-court reference video (inpaint, walkover-window auto-detector, walkover-occlusion-IoU metric). The report says only that the clean plate "can be produced offline". How — temporal median across a long broadcast? — is undisclosed.
- **Fix:** Add a paragraph in §2.2 or §4.7 describing how the Melbourne clean plate was produced; the assumptions it makes (static camera over enough frames, no court repainting, consistent lighting); the failure modes for clips without one. Demote "zero in-venue instrumentation" — the clean plate is the soft equivalent.

### M19. No ablation; no baseline comparison
- **Source:** A6-F010, A4-F011, A6-F005
- **Where:** §7 Results; §3 Related Work
- **What:** Only quantitative comparison is P3-A1 vs V68 (prior version of the same system). No ablations of (a) full pipeline, (b) -MatAnyone, (c) -hybrid-lock, (d) -LED-blend. No baseline against [@homayounfar2017], [@nie2021], or even a naïve fixed-quad. Without ablations no claim attributes to any specific design choice.
- **Fix:** Add a one-clip ablation table (single highest-impact change to lift this to research grade): naïve static placement, V68 manual, V68 + always-dynamic line estimator, V68 + hybrid lock (final). Each on the standard gates. The negative cases are already in the ledger.

### M20. Related-work depth is thin
- **Source:** A6-F005
- **Where:** §3
- **What:** Only 3 academic citations (Homayounfar 2017, Nie 2021, Huang TrackNet 2019). Obvious omissions: Sharma sports-field registration, Citraro real-time field registration, Chen and Little, image-harmonization literature for LED re-bake, RVM / BGMv2 video matting alternatives. No comparison table.
- **Fix:** Add 8–12 academic citations; add a 3×N comparison table (system × {court reg, segmentation, matting, occlusion, photometric blend, software-only}).

### M21. Contribution #3 ("documented project journey") is not a research contribution
- **Source:** A6-F001
- **Where:** §1.2 contributions list
- **What:** "A documented project journey ... including one failed experimental axis ... plus an instance in which the rubric and the numerical gates jointly favoured a candidate that direct visual review rejected." Process narrative, not a contribution.
- **Fix:** Either drop and reframe as Discussion content, or sharpen into a real methodological claim ("we propose a three-layer evaluation framework with a mandatory human-review override and document a failure mode in which LLM-rubric scoring drifts from human review").

### M22. "Three-layer framework is reusable" is unsupported
- **Source:** A6-F002
- **Where:** §8.1 Strengths
- **What:** Claims reusability with no transfer experiment. Contradicts the Limitations admission of single-clip evaluation.
- **Fix:** Either demonstrate transfer to a second clip, or downgrade: "The framework is designed for reuse; multi-clip validation is left to future work."

### M23. "Broadcast-credible" is never defined
- **Source:** A6-F006
- **Where:** §3.3, §8.1 strengths
- **Fix:** Define operationally at first use: "we use 'broadcast-credible' to mean: passes the Layer 3 visual-review gate when a domain reviewer compares the composite against the original broadcast at native resolution and frame rate."

### M24. Casual fragment "By the metrics it was the right pick"
- **Source:** A5-F009, A6-F007
- **Where:** §6.4 (l. 518)
- **Fix:** "On the Layer 1 numerical gates and Layer 2 rubric alone, P3-A38/e2 was the recommended candidate."

### M25. Leftover `$\sim$` symbols in body prose
- **Source:** A5-F012
- **Where:** @fig-walkover-grid caption (l. 584), §7.4 (l. 606)
- **What:** "$\sim 25\%$ across the window", "$\sim 75\%$ across", "real-time broadcast target ($\sim 30$ fps)".
- **Fix:** "approximately 25%", "approximately 75%", "approximately 30 fps".

### M26. "Phase 2: hybrid_lock with a line-based estimator" — underscore not hyphen
- **Source:** A5-F011
- **Where:** §6.2 title (l. 480)
- **What:** Code identifier `hybrid_lock` (underscore) leaked into a section title; every other body reference is `hybrid-lock` (hyphen).
- **Fix:** "Phase 2: hybrid-lock with a line-based estimator (failed axis)".

### M27. "All four region scorecards pass" — but elsewhere "five placements"
- **Source:** A5-F010
- **Where:** l. 547
- **What:** Table 4 has 4 rows; pipeline has 5 placements. "Four" counts table rows, reader will mis-parse.
- **Fix:** "All region scorecards pass (back banners reported as a group; left side banner, floor logo, and full-frame summaries reported separately); the walkover-window evaluation passes both floor-specific gates."

### M28. "Five stages" parenthetical lists six items
- **Source:** A5-F008
- **Where:** §4.1 (l. 217)
- **Fix:** Either "six stages" or collapse two (e.g., "segmentation and quad fitting" as one stage).

### M29. References split across pages with no `References` heading
- **Source:** A5-F013, A5-F014
- **Where:** PDF pp. 23–24
- **What:** No `# References` heading; [1]–[3] on p. 23 below Acknowledgements, [4]–[13] on p. 24. No TOC entry.
- **Fix:** Add `# References {.unnumbered}` plus `\clearpage` immediately before the `::: {#refs} :::` block.

### M30. Table 4 "Left side banner" header wraps awkwardly
- **Source:** A5-F016
- **Where:** PDF p. 17
- **Fix:** Switch Table 4 to a `\begin{tabular}` with `p{}` column widths (same pattern already used for `tbl-gates`).

### M31. Headline bullet "13 × 5 structured-rubric dimensions and regions" is unclear
- **Source:** A5-F019
- **Where:** l. 617
- **What:** Multiplication is misleading — 3 of the 13 dimensions only apply to one region.
- **Fix:** "approximately 60 rubric cells scored per candidate run (13 rubric dimensions, applied per region, with 3 walkover-only dimensions on the floor logo)."

### M32. No reproducibility block
- **Source:** A4-F012, A6-F004
- **What:** No commit SHA, no RANSAC seed (EVALUATION.md requires `np.random.seed(0)` — confirm honoured), no SAM 2 checkpoint variant, no TrackNet weights URL+SHA, no MatAnyone checkpoint, no CUDA/driver versions.
- **Fix:** Half-page Reproducibility paragraph at end of §7: commit hash, all checkpoint identifiers, seeds, exact YAML config path, GPU/CUDA stack, demo clip identifier.

### M33. Anonymity blockers if blind-review version needed
- **Source:** A6-F008
- **What:** Authors named with full institutions; footnote `enriquedlh97/homography-fitting` deanonymizes even without title block; Acknowledgements names MELIC, AC297r, Harvard SEAS.
- **Fix:** If a blind-review version is wanted, strip the four-author block, replace the repo URL with "supplementary materials", and remove Acknowledgements. Otherwise N/A.

### M34. Code-availability / licence statement missing
- **Source:** A6-F003
- **Fix:** One-line "Code availability" subsection before Acknowledgements: licence (MIT/Apache-2.0/CC-BY-NC/etc.), public-at-submission status, repo URL with commit hash, sponsor-approval note.

### M35. Sponsor-iteration content may be sensitive for external publication
- **Source:** A6-F006
- **Where:** §6 Project Journey, §7.4 GPU cost table
- **What:** Internal designations (V68, P3-A1), "stakeholder reviewer" reference, GPU cost table with hourly USD pricing, iteration count ("approximately 50 cycles") — appropriate for a capstone deliverable, but a sponsor typically wants to review before external publication.
- **Fix:** Route §6 + §7.4 past MELIC before any external (journal) submission.

### M36. SAM 2 architecture figure attribution — "reproduced from"
- **Source:** A6-F009
- **Where:** @fig-sam2-arch caption (l. 238)
- **What:** "reproduced from" is a term of art that in many venues requires permission. If `public/sam-architecture.png` is the verbatim SAM 2 paper figure, either obtain permission or replace with a team-redrawn version.
- **Fix:** Confirm origin; if verbatim, change to "adapted from" only if the figure was redrawn; else seek permission.

### M37. Introduction skips the "gap" paragraph
- **Source:** A6-F012
- **Where:** §1
- **What:** Section 1.1 → 1.2 jumps motivation → contributions. The actual gap is in §3.3 (three sections later).
- **Fix:** Add a paragraph between §1.1 and §1.2 stating the research gap explicitly.

### M38. Phase 2 sweep coverage is sparse and asymmetric
- **Source:** A4-F015
- **Where:** @tbl-phase2
- **Fix:** Either show the full 7 × 3 grid or state explicitly that the ramp axis was held while tolerance was swept.

### M39. Walkover-window auto-detector is circular with its own evaluation metric
- **Source:** A4-F016
- **What:** Window detected by `|I - C| > μ + 2σ`; occlusion-IoU metric then uses `|I - C| > T`. Same signal twice.
- **Fix:** Cross-check the auto-detected window (685–723) against bounding boxes from a generic person detector; confirm overlap; report it.

### M40. Frame-zero bridge is fragile and not stress-tested
- **Source:** A4-F014
- **Fix:** Mention the option of aggregating $B$ across the first $K$ static frames; report the numerical residual $\|H_{\text{manual}}(0) - B H_0^{\text{net}}\|_F$ for the Melbourne clip.

### M41. TOC is two pages but only ten section entries
- **Source:** A5-F015
- **Where:** PDF pp. 2–3
- **Fix:** `toc-depth: 2`, or tighten TOC baselineskip slightly. Target one-page TOC.

### M42. `regression_floor_roi_jitter_ratio` rendering fragile
- **Source:** A5-F017
- **Where:** l. 564
- **What:** Source mixes inline-code spans with raw `\allowbreak`; fragile under Pandoc.
- **Fix:** Use `\seqsplit` for the identifier, or name the flag informally in prose with a single monospace footnote.

### M43. Figure 8 floats below referencing paragraph
- **Source:** A5-F018
- **Fix:** `fig-pos: "!htbp"` on the figure, or move the include earlier.

### M44. "Real tennis broadcasts" — odd phrasing
- **Source:** A5-F021
- **Where:** abstract (l. 15)
- **What:** "Real tennis" is a distinct sport.
- **Fix:** "live tennis broadcasts" or "tennis broadcast video".

### M45. Conclusion's headline takeaway is the weakest claim, not the strongest
- **Source:** A6-F016
- **Where:** §10 last sentence
- **What:** Ends on the rubric/visual-review observation (N=1 anecdote). Should end on the systems contribution.
- **Fix:** Reorder so the integrated-pipeline result lands last; the rubric observation goes second.

### M46. First-person plural overuse, especially in §4 architecture
- **Source:** A6-F008, A5-F022
- **Fix:** Pass over §4 specifically; convert ~half of "we use SAM 2", "we adapt", etc. to declarative or passive voice.

### M47. Personal-account companion-repo URL
- **Source:** A6-F012
- **Where:** footnote on l. 82
- **Fix:** Mirror to a programme/institutional GitHub org or Zenodo with DOI for the journal version. Keep personal URL for the capstone deliverable.

---

## MINOR — polish

| # | Issue | Source | Fix |
|---|---|---|---|
| m1 | TrackNet output described as "14 keypoints + 1 auxiliary"; code comment is "14 + 1 unused legacy" | A2-F017 | "...one unused legacy channel inherited from the original ball-tracking head, retained for weight-loading compatibility" |
| m2 | Heatmap eq indexes don't note 640×360 resized input | A2-F018 | Use $I_t'$ for the resized input; note 15-th channel discarded |
| m3 | Effective alpha has two branches (SAM vs MatAnyone path); not made explicit | A2-F019 | One sentence stating the deployed config uses the MatAnyone-α path |
| m4 | "Approximately 80" inconsistency carries into §4.4 prose around line 297 | A2-F016 | Resolves with C2 fix |
| m5 | `quad_area_cv` symbol uses unqualified $\mu/\sigma$ | A2-F021 | "$\mathrm{std}_t(A_t) / \mathrm{mean}_t(A_t)$" |
| m6 | $\Delta E$ direction not stated | A2-F013 | "warns when $\Delta E^*_{ab} > 5$" |
| m7 | Floor SSIM precision: Table 4 has 4 decimals, jitter ratios 3 decimals | A3-F006 | Standardize to 4 decimals throughout |
| m8 | Side-by-side video dimensions "2868 × 536" likely off-by-1 (1074/2 = 537) | A3-F004 | `ffprobe` and quote actual dimensions |
| m9 | "Gold is 0.179 (we match by design)" — gold is 0.1787; conflates with P3-A1's 0.1788 | A3-F005 | "...we are within 1e-4 of that by construction (the gate is calibrated to the gold)" |
| m10 | "Headline numbers 13 × 5" ambiguity | A3-F008, A5-F019 | Resolves with M31 |
| m11 | `supponor`, `uniqfeed`, `vizrt_arena` missing access date; `uniqfeed.com` TLS-broken | A1-F012 | Add `note = {Accessed: 2026-05-11}`; URL → `https://www.uniqfeed.com` |
| m12 | `ravi2025sam2` mixes `@inproceedings` + `eprint` fields | A1-F013 | Sanity-check rendered citation; pick one form |
| m13 | `huang2019tracknet` author name diacritic — verify renders | A1-F016 | Eyeball PDF |
| m14 | Cutie author "Alexander G. Schwing" vs CVF's "Alexander Schwing" | A1-F006 | Acceptable as-is |
| m15 | Hull-based quad fitter is a single short paragraph | A5-F023 | Either expand by half a paragraph, or fold into the SAM 2 section |
| m16 | `melbourne-walking-over-logo.mov` capitalisation vs body "Melbourne walkover clip" | A5-F024 | Introduce the file name explicitly: "the *Melbourne walkover clip*, source file `melbourne-walking-over-logo.mov`" |
| m17 | "1920-px frames" introduced for the first time in §7.4 | A5-F025 | State broadcast frame resolution in §2.2: "...at 59 fps (767 frames, 1920 × 1080)" |
| m18 | "14-keypoint" vs "fourteen-keypoint" vs "14 court landmarks" vs "fourteen court landmarks" | A5-F027 | Standardize on "14" (digits) or "fourteen" (words) throughout |
| m19 | "Ten-fold speed-up" vs "approximately one order of magnitude" — same fact, two phrasings | A5-F028 | Pick one |
| m20 | "Lessons learned" header is corporate-postmortem flavour | A6-F015 | "Methodological observations" or fold into the Discussion |
| m21 | Acknowledgements duplicates institutional info from author block | A6-F018 | Trim |
| m22 | Data provenance for the demo clip undisclosed | A6-F017, A6-F013 | Either name the broadcaster (resolves C17) or drop the "Melbourne" geographic anchor; don't stay in the middle |

---

## What's outstanding, in priority order

1. **C5–C7, M5, M7, M9, M10** — math vs code drift. Edit eight equations. These are the issues a CV reviewer who can read code will catch first.
2. **C14–C16, M14–M19** — methodological honesty cluster. The single highest-impact change here is adding **an ablation table** (M19) and either running the second clip or explicitly scoping every quantitative claim to "the Melbourne demonstration clip" (C14).
3. **C17–C18, M34–M35** — IP / sponsor. Trademark disclaimer + broadcaster attribution + clear-with-MELIC pass before external release.
4. **C1–C3, C10–C13** — visible rendering / typo bugs in the PDF. These are 30 minutes of edits and they are exactly the kind of polish a Harvard professor notices in the first three pages.
5. **C4** — homography group. One-character fix at two locations.
6. **C8–C9, M11–M13** — bibliography hygiene. Half an hour of bib edits.
7. The rest of the Major list is meaningful but lower urgency.

Total: 18 CRITICAL, 47 MAJOR, 22 MINOR. The CRITICAL list is the must-fix; everything Major is should-fix; Minors are polish.
