# move into the client repo to install pkg
npm --prefix ./services/bible-client-app/ install

# move into the server repo to install pkg
npm --prefix ./services/bible-server-app/ install

# Run Docker-compose command
docker-compose up -d

# Setup the database
echo "Waiting for the database to setup ..."

# setup the database
npm --prefix ./services/bible-server-app/ run elastic:init_data