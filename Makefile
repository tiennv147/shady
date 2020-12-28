SHELL:=/usr/bin/env bash
.DEFAULT_GOAL:=all

MAKEFLAGS += --no-print-directory

DOCS_DEPLOY_USE_SSH ?= true
DOCS_DEPLOY_GIT_USER ?= git

VERSION := 0.0.0

YARN:=./build/bin/yarn.sh
PROJECT_ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

.PHONY: help # Print this help message.
 help:
	@grep -E '^\.PHONY: [a-zA-Z_-]+ .*?# .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = "(: |#)"}; {printf "%-30s %s\n", $$2, $$3}'

.PHONY: all # Generate API, Frontend, and backend assets.
all: api frontend backend-with-assets

.PHONY: api # Generate API assets.
api: yarn-ensure
	tools/compile-protos.sh -c "$(PROJECT_ROOT_DIR)/api"

.PHONY: api-lint # Lint the generated API assets.
api-lint:
	tools/compile-protos.sh -c "$(PROJECT_ROOT_DIR)/api" -l

.PHONY: api-lint-fix # Lint and fix the generated API assets.
api-lint-fix:
	tools/compile-protos.sh -c "$(PROJECT_ROOT_DIR)/api" -lf

.PHONY: api-verify # Verify API proto changes include generate frontend and backend assets.
api-verify:
	find backend/api -mindepth 1 -maxdepth 1 -type d -exec rm -rf {} \;
	find frontend/api/src -mindepth 1 -maxdepth 1 -type d -exec rm -rf {} \;
	$(MAKE) api
	tools/ensure-no-diff.sh backend/api frontend/api/src

.PHONY: frontend # Build production frontend assets.
frontend: yarn-ensure
	$(YARN) --cwd frontend install --frozen-lockfile && $(YARN) --cwd frontend build

.PHONY: frontend-dev-build # Build development frontend assets.
frontend-dev-build: yarn-ensure
	$(YARN) --cwd frontend install --frozen-lockfile && $(YARN) --cwd frontend build:dev

.PHONY: frontend-dev # Start the frontend in development mode.
frontend-dev: yarn-ensure
	$(YARN) --cwd frontend install --frozen-lockfile && $(YARN) --cwd frontend start

.PHONY: frontend-lint # Lint the frontend code.
frontend-lint: yarn-ensure
	$(YARN) --cwd frontend lint

.PHONY: frontend-lint-fix # Lint and fix the frontend code.
frontend-lint-fix: yarn-ensure
	$(YARN) --cwd frontend lint:fix

.PHONY: frontend-test # Run unit tests for the frontend code.
frontend-test: yarn-ensure
	$(YARN) --cwd frontend test

.PHONY: frontend-e2e # Run end-to-end tests for the frontend code.
frontend-e2e: yarn-ensure
	./tools/frontend-e2e.sh

.PHONY: frontend-verify # Verify frontend packages are sorted.
frontend-verify: yarn-ensure
	$(YARN) --cwd frontend lint:packages

.PHONY: docs # Build all doc assets.
docs: docs-generate yarn-ensure
	$(YARN) --cwd docs/_website install --frozen-lockfile && $(YARN) --cwd docs/_website build

.PHONY: docs-dev # Start the docs server in development mode.
docs-dev: docs-generate yarn-ensure
	$(YARN) --cwd docs/_website install --frozen-lockfile && BROWSER=none $(YARN) --cwd docs/_website start

.PHONY: docs-generate # Generate the documentation content.
docs-generate:
	cd docs/_website/generator && go run .

.PHONY: yarn-ensure # Install the pinned version of yarn.
yarn-ensure:
	@./tools/install-yarn.sh


