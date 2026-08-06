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

run_test() {
  run_step "Unit tests" pnpm test
}

run_build() {
  run_step "Build" pnpm build
}

run_all() {
  run_types
  run_lint
  run_format
  run_knip
  run_test
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
  test)
    run_test
    ;;
  build)
    run_build
    ;;
  all)
    run_all
    ;;
  *)
    echo "Usage: $0 [types|lint|format|knip|test|build|all]" >&2
    exit 1
    ;;
esac
