bootstrap:
	docker-compose up -d; \
	yarn workspace @cohdex/server migrate; \
	yarn workspace @cohdex/server seed; 
