#!/usr/bin/env bash
# Set up the environment to render the final report.
#
# Installs Quarto and the TinyTeX TeX distribution it uses for PDF output.
# Idempotent — safe to re-run.
#
# Tested on macOS (Apple Silicon) and Linux (Ubuntu 22.04). Windows users
# should install Quarto via the .msi from https://quarto.org/docs/get-started/
# and then run `quarto install tinytex` manually.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "==> Setting up the report rendering environment"
echo "    Working dir: $SCRIPT_DIR"
echo

# --------------------------------------------------------------------------
# 1. Install Quarto
# --------------------------------------------------------------------------
if command -v quarto >/dev/null 2>&1; then
  echo "==> Quarto already installed: $(quarto --version)"
else
  echo "==> Quarto not found — installing"
  if [[ "$OSTYPE" == "darwin"* ]]; then
    if command -v brew >/dev/null 2>&1; then
      brew install --quiet quarto
    else
      echo "ERROR: Homebrew not found. Install Quarto manually from:"
      echo "       https://quarto.org/docs/get-started/"
      exit 1
    fi
  elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Latest stable .deb for x86_64; adjust the URL if you're on arm.
    TMPDEB="$(mktemp -t quarto.XXXXXX.deb)"
    QUARTO_URL="https://github.com/quarto-dev/quarto-cli/releases/latest/download/quarto-linux-amd64.deb"
    echo "    Downloading $QUARTO_URL"
    curl -fsSL "$QUARTO_URL" -o "$TMPDEB"
    sudo dpkg -i "$TMPDEB"
    rm -f "$TMPDEB"
  else
    echo "ERROR: Unsupported OS ($OSTYPE). Install Quarto manually from:"
    echo "       https://quarto.org/docs/get-started/"
    exit 1
  fi
  echo "==> Installed Quarto: $(quarto --version)"
fi

# --------------------------------------------------------------------------
# 2. Install TinyTeX for PDF output
# --------------------------------------------------------------------------
# Quarto bundles a minimal TeX distribution called TinyTeX. We need it for the
# PDF output target. The `quarto install tinytex` command is idempotent — it
# detects an existing installation and updates packages as needed.
echo
echo "==> Installing/updating TinyTeX (for PDF output)"
quarto install tinytex --update-path --no-prompt

# --------------------------------------------------------------------------
# 3. Optional: download the IEEE CSL citation style
# --------------------------------------------------------------------------
# Our YAML frontmatter requests `csl: ieee.csl`. If that file isn't present
# next to the .qmd, Quarto will silently fall back to a default style. We
# fetch it so citations render in IEEE format.
if [[ ! -f "ieee.csl" ]]; then
  echo
  echo "==> Fetching IEEE CSL citation style"
  curl -fsSL "https://raw.githubusercontent.com/citation-style-language/styles/master/ieee.csl" -o ieee.csl
fi

# --------------------------------------------------------------------------
# 4. Smoke check
# --------------------------------------------------------------------------
echo
echo "==> Running quarto check"
quarto check

echo
echo "==> Setup complete. Render the report with:"
echo "        ./render.sh"
echo
echo "    Or render manually:"
echo "        quarto render final_report.qmd          # both PDF + HTML"
echo "        quarto render final_report.qmd --to pdf"
echo "        quarto render final_report.qmd --to html"
