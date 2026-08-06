#!/usr/bin/env bash
set -euo pipefail

run_step() {
  echo "==> $1"
  shift
  "$@"
}

run_types() {
  run_step "Check types" pnpm check-types
}

run_lint() {
  run_step "Lint" pnpm lint
}

run_format() {
  run_step "Format check" pnpm format:check
}

run_knip() {
  run_step "Dead code check" pnpm knip
}

run_build() {
  run_step "Build" pnpm build
}

run_all() {
  run_types
  run_lint
  run_format
  run_knip
  run_build
}

case "${1:-all}" in
  types)
    run_types
    ;;
  lint)
    run_lint
    ;;
  format)
    run_format
    ;;
  knip)
    run_knip
    ;;
  build)
    run_build
    ;;
  all)
    run_all
    ;;
  *)
    echo "Usage: $0 [types|lint|format|knip|build|all]" >&2
    echo "Note: unit tests are omitted on minimal (no test scripts/packages yet)." >&2
    exit 1
    ;;
esac
