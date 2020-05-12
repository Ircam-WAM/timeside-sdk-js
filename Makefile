generator-dir := generator
generator-config := $(addprefix $(generator-dir)/,typescript-fetch.config.yaml)
spec-openapi := $(addprefix ${generator-dir}/,openapi.yml)
api-dest := .
OPEN_API_URL = https://sandbox.wasabi.telemeta.org/timeside/api/schema/

all: install api

install:
# Check docker
ifeq (, $(shell which docker))
 $(error No "docker" in PATH, consider doing apt install docker)
endif

	# Log dependencies' version
	docker --version

$(spec-openapi):
	curl --fail $(OPEN_API_URL) -o $(spec-openapi)

api: $(spec-openapi)
	docker run --rm \
         -v ${PWD}:/local \
         --user "$$(id -u):$$(id -g)" \
         openapitools/openapi-generator-cli:v4.3.1 generate \
         -i /local/$(spec-openapi) \
         -g typescript-fetch \
         -c /local/$(generator-config) \
         -o /local/$(api-dest)

publish:
	cd $(api-dest)
	npm install
	# No need for this because the prepare script is called after install and before publish
	# npm run build 
	npm publish

.PHONY: all install publish api 
