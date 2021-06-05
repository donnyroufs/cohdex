prepare: 
	docker-compose up -d && sleep 1

bootstrap: prepare
	yarn workspace @cohdex/server migrate; \
	yarn workspace @cohdex/server seed; \
	yarn workspace @cohdex/server test:migrate; \
	yarn server;
