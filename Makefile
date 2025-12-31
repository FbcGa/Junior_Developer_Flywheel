up:
	@docker compose up --build -d --wait

down:
	@docker compose down -v