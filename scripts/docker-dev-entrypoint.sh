#!/bin/sh
set -e

cd /app

# Materialize Linux native optional deps (e.g. oxc-parser) inside the container.
# Image build must not rely on a cache-only store; this also refreshes the node_modules volume.
pnpm install --frozen-lockfile

pnpm --filter @stallning/nuxt-essentials exec nuxt prepare
pnpm --filter @stallning/ui exec nuxt prepare
pnpm --filter @stallning/web exec nuxt prepare

exec "$@"
