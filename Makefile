bootstrap:
	docker-compose up -d; \
	yarn workspace @cohdex/server migrate; 
