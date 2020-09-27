build:
	./build-push.sh && docker-compose up --build -d && cd api && npm run dev 
rm:
	docker container stop registry && docker container rm -v registry && docker-compose down && docker service rm $$(docker service ls -q) 
ls:
	@echo "Replicated Services\n"
	docker service ls
	@echo "----------------------\n"
	@echo "Containers Running\n"
	docker container ps
