## Run Docker-compose command
docker-compose up -d

## Setup the database
echo "Waiting for the database to setup ..."
sleep 7

## setup the database
docker exec bible-server-app npm run elastic:init_data