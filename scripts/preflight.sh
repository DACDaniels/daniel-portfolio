#!/usr/bin/env bash

# Pre-deploy preflight. Runs the production-equivalent checks against
# the local workspace and bails on the first failure. Designed to be
# called from CI (`bash scripts/preflight.sh`) or manually before
# tagging a deploy.
#
# Steps (in order):
#   1. Lint            -> ESLint via `npm run lint`
#   2. Type check      -> `tsc --noEmit`
#   3. Production build -> `npm run build`
#
# Exits non-zero on the first step that fails so CI surfaces the
# correct failing stage. set -euo pipefail makes the script fail
# immediately on any unset variable or unhandled error.

set -euo pipefail

cd "$(dirname "$0")/.."

bold()  { printf '\033[1m%s\033[0m\n' "$1"; }
green() { printf '\033[32m%s\033[0m\n' "$1"; }
red()   { printf '\033[31m%s\033[0m\n' "$1"; }
gray()  { printf '\033[90m%s\033[0m\n' "$1"; }

run_step() {
  local label="$1"
  shift
  bold ""
  bold "▶ $label"
  gray "  \$ $*"
  if "$@"; then
    green "✓ $label passed"
  else
    local status=$?
    red "✗ $label failed (exit $status)"
    exit "$status"
  fi
}

bold "Preflight for $(node -p "require('./package.json').name")"
gray "Node $(node --version)  ·  npm $(npm --version)"

run_step "Lint"          npm run lint
run_step "Type check"    npx tsc --noEmit
run_step "Production build" npm run build

bold ""
green "All preflight checks passed. Safe to deploy."
