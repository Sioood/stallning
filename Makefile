.PHONY: help verify check lint lint-fix format format-check types knip test build audit fix e2e

PNPM ?= pnpm

.DEFAULT_GOAL := help

help: ## List available targets
	@grep -E '^[a-zA-Z0-9_-]+:.*?## ' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

verify: ## Run CI check job locally (types, lint, format, knip, test, build)
	$(PNPM) verify

check: verify audit ## Run verify + security audit (pre-push equivalent)

lint: ## Run ESLint and Oxlint
	$(PNPM) lint

lint-fix: ## Auto-fix lint issues
	$(PNPM) lint:fix

format: ## Format code with oxfmt
	$(PNPM) format

format-check: ## Check formatting with oxfmt
	$(PNPM) format:check

types: ## Run TypeScript type checking
	$(PNPM) check-types

knip: ## Detect dead code and unused dependencies
	$(PNPM) knip

test: ## Run unit and component tests
	$(PNPM) test

build: ## Build all packages
	$(PNPM) build

audit: ## Run pnpm security audit (high severity and above)
	$(PNPM) audit --audit-level=high

fix: lint-fix format ## Auto-fix lint and formatting issues

e2e: ## Run Playwright E2E tests (not part of pre-push)
	$(PNPM) --filter @stallning/web test:e2e
