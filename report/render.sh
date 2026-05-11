#!/usr/bin/env bash
# Render the final report.
#
# Compiles `final_report.qmd` into `final_report.pdf` and `final_report.html`
# using Quarto. Run `./setup.sh` once first to install the toolchain.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if ! command -v quarto >/dev/null 2>&1; then
  echo "ERROR: quarto not found on PATH."
  echo "Run ./setup.sh first to install it."
  exit 1
fi

# Pick the render target. By default we render BOTH pdf and html.
# Pass `pdf`, `html`, or `all` (default) as the first arg.
TARGET="${1:-all}"

case "$TARGET" in
  pdf)
    echo "==> Rendering PDF only"
    quarto render final_report.qmd --to pdf
    ;;
  html)
    echo "==> Rendering HTML only"
    quarto render final_report.qmd --to html
    ;;
  all|"")
    echo "==> Rendering PDF + HTML"
    quarto render final_report.qmd
    ;;
  *)
    echo "Usage: $0 [pdf|html|all]"
    echo "  pdf  , render PDF only"
    echo "  html , render HTML only"
    echo "  all  , render both (default)"
    exit 1
    ;;
esac

echo
echo "==> Render complete. Output files:"
ls -lh final_report.pdf 2>/dev/null || true
ls -lh final_report.html 2>/dev/null || true
echo
echo "Open with:"
[[ -f final_report.pdf ]]  && echo "    open final_report.pdf"
[[ -f final_report.html ]] && echo "    open final_report.html"
