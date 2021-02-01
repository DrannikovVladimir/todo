install:
	npm cli

start:
	npm run start

develop:
	npx webpack serve

build:
	rm -rf dist
	NODE_ENV=production npx webpack

test:
	npm test

link:
	npx eslint .
