.DEFAULT_GOAL := help

.PHONY: help # Generate list of targets with descriptions
help:
	    @grep -B1 -E "^[a-zA-Z0-9_-]+\:([^\=]|$$)" Makefile \
         | grep -v -- -- \
         | sed 'N;s/\n/###/' \
         | sed -n 's/^#: \(.*\)###\(.*\):.*/\2###\1/p' \
         | column -t  -s '###'


docker-build: ## Build the app
	docker-compose build app

up: ## Spins up the app with mongoDB
	docker-compose up -d

down: ## Tear down
	docker-compose down

clean: ## Removes dist
	npm run clean

run: ## Runs the app only outside docker
	npm run serve

build: ## Transpile
	npm run build