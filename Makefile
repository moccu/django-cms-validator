validate:
	./node_modules/.bin/eslint . --ext .js

	./node_modules/.bin/sass-lint \
		--verbose \
		--no-exit \
		"./static/scss/**/*.scss"


test:
	./node_modules/.bin/jest --coverage --verbose


release:
	./node_modules/.bin/webpack
