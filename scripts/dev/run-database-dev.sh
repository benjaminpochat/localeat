docker container prune -f
docker-compose -f docker-compose-run.yml run -d --name database --service-ports database
