SHELL := /bin/bash

build: build-server

docker:
	docker-compose build

generate:
	go generate ./...

build-server:
	CGO_ENABLED=0 go build -v -o ./bin/server ./cmd/server

deps: generate
	cd client && npm install
	go get ./...

client-dist:
	cd client && NODE_ENV=production npm run build

up: docker
	docker-compose up

watch:
	go run github.com/cortesi/modd/cmd/modd

down:
	docker-compose down -v --remove-orphans

db-shell:
	docker-compose exec postgres psql -Uledger

test:
	go test -v ./...

.PHONY: release
release:
	./misc/script/release

clean:
	rm -rf client/node_modules bin data .env internal/graph/generated internal/graph/server.go
	rm -rf vendor
	go clean -modcache