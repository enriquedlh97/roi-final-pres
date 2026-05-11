# Final report

The capstone final report — single Quarto document (`final_report.qmd`) that
compiles to PDF + HTML.

## Files

| File | What |
|---|---|
| `final_report.qmd` | The report source. Quarto markdown with YAML frontmatter for PDF + HTML targets. |
| `references.bib` | BibTeX citation database (BallTrackerNet, SAM 2, MatAnyone2, commercial systems, academic prior work). |
| `ieee.csl` | IEEE citation style (downloaded by `setup.sh`, gitignored). |
| `setup.sh` | One-time toolchain install — Quarto + TinyTeX + IEEE CSL. |
| `render.sh` | Renders the report. Targets: `pdf`, `html`, or `all` (default). |
| `.gitignore` | Excludes compiled outputs and Quarto's temp dirs. |

## Quick start

```bash
# 1. One-time setup — install Quarto + TinyTeX + IEEE CSL
./setup.sh

# 2. Render both PDF and HTML
./render.sh

# 3. Open the output
open final_report.pdf
```

Subsequent renders are just `./render.sh`.

You can also render only one format:

```bash
./render.sh pdf
./render.sh html
```

## Requirements

- **macOS or Linux.** Windows users should install Quarto manually from
  [https://quarto.org/docs/get-started/](https://quarto.org/docs/get-started/)
  and run `quarto install tinytex` separately. `render.sh` should still work
  via Git Bash or WSL.
- **`curl`** for fetching the IEEE CSL style on first setup.
- **On macOS:** `brew` (Homebrew) for the Quarto install path.
- **On Linux:** `sudo` rights for `dpkg -i` (a `.deb` is downloaded).

The setup script is idempotent — running it twice does nothing harmful.

## Figures

The report references PNG/MP4 assets in `../public/final/` (the deck's asset
directory). Quarto resolves the relative paths at render time, so the report
compiles against the existing assets without copying them. If you move or
rename a figure, update the corresponding `![](...)` path in `final_report.qmd`.

## Citation style

We use IEEE format (`ieee.csl`). To switch to a different style:

1. Pick one from [https://www.zotero.org/styles](https://www.zotero.org/styles).
2. Drop the `.csl` file into this folder.
3. Update the `csl:` line in `final_report.qmd`'s YAML frontmatter.

## Troubleshooting

- **"Quarto not found"** — run `./setup.sh` first.
- **"LaTeX Error: File X not found"** — TinyTeX is missing a package. Run
  `quarto install tinytex --update-path` (or `./setup.sh` again, which does
  the same).
- **PDF won't render but HTML does** — usually a TeX issue. Check
  `quarto render final_report.qmd --to pdf --verbose` for the actual error.
- **Figures don't appear** — verify the relative path. The QMD assumes
  rendering from inside `report/`, so figures at `../public/final/foo.png`
  resolve to `<repo>/public/final/foo.png`.

## Hand-off

The report is the single canonical document for the capstone deliverable. It
covers:

1. **Introduction** — motivation, contributions, structure
2. **Problem and demonstration clip** — what makes virtual ad insertion hard;
   the Melbourne walkover case
3. **Related work** — commercial systems and academic prior work
4. **Pipeline architecture** — SAM 2, hull fitting, BallTrackerNet,
   hybrid-lock, MatAnyone2, compositor
5. **Evaluation framework** — three-layer eval (numerical, rubric, visual)
6. **Project journey** — Phase 1 (V68) → Phase 2 (failed) → Phase 3
   (BTN port + iteration) → visual-review override
7. **Results** — per-region metrics, walkover analysis, figures
8. **Discussion** — strengths, limitations, lessons learned
9. **Future work** — texture transfer, real-time throughput, multi-clip
   validation, auto-detection
10. **Conclusion**

For the implementation (code, configs, experiments, eval framework
internals), see the sister repo
[`enriquedlh97/homography-fitting`](https://github.com/enriquedlh97/homography-fitting).
