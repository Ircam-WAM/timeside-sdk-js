generator-dir := generator
generator-config := $(addprefix $(generator-dir)/,typescript-fetch.config.yaml)
spec-openapi-v3 := $(addprefix ${generator-dir}/,openapi-v3.yml)
spec-openapi-v2 := $(addprefix ${generator-dir}/,openapi-v2.yml)
api-dest := .
API_URL = https://wasabi.telemeta.org/timeside/api/

all: install api

install:
# Check docker
ifeq (, $(shell which docker))
 $(error No "docker" in PATH, consider doing apt install docker)
endif

# Check api-spec-converter
ifeq (, $(shell which api-spec-converter))
 $(error No "api-spec-converter" in PATH, consider doing "sudo npm install -g api-spec-converter")
endif

	# Log dependencies' version
	api-spec-converter --version
	docker --version

$(spec-openapi-v3):
	curl --fail $(API_URL)openapi.yml -o $(spec-openapi-v3)

$(spec-openapi-v2): $(spec-openapi-v3)
	api-spec-converter \
    --from=openapi_3 \
    --to=swagger_2 \
    --syntax=yaml \
    --order=alpha $(spec-openapi-v3) > $(spec-openapi-v2)

api: $(spec-openapi-v2)
	docker run --rm \
         -v ${PWD}:/local \
         --user "$$(id -u):$$(id -g)" \
         openapitools/openapi-generator-cli:v4.3.0 generate \
         -i /local/$(spec-openapi-v2) \
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
