up:
	@docker compose up --build -d --wait
	@docker compose watch

down:
	@docker compose down -v