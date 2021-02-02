install:
	npm ci

start:
	npm run start

develop:
	npx webpack serve

build:
	rm -rf dist
	NODE_ENV=production npx webpack

lint:
	npx eslint .

link:
	npx eslint .
