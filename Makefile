NODE_MODULES_TOP = ./node_modules
NODE_BINS = $(NODE_MODULES_TOP)/.bin

.PHONY: all clean compile

all: clean compile

clean:
	rm -rf ./dist
	mkdir -p ./dist

compile:
	$(NODE_BINS)/tsc --project tsconfig.json
