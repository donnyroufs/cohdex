prepare:
	docker-compose up -d;

bootstrap:
	yarn workspace @cohdex/server migrate; \
	yarn workspace @cohdex/server seed;  \
	yarn server
