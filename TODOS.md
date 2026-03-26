# TODOS

## P1 — Blocking

### Determine pipeline FPS and update comparison table
- **What:** Benchmark the ROI tracking pipeline (SAM 2 + homography + inpainting + player segmentation) on representative tennis footage. Measure FPS on available GPU hardware.
- **Why:** The comparison table slide has "TBD" in the latency column. Mitsubishi will ask about real-time feasibility. The FPS number determines how the performance narrative is framed: <5 FPS = proof-of-concept, 5-15 FPS = approaching real-time, >15 FPS = near broadcast-viable.
- **Depends on:** Access to pipeline code (separate repo) + GPU for inference.
- **Added:** 2026-03-26 via /plan-ceo-review
