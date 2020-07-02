NODE_ENV=development \
DOMAIN=localhost \
PROTOCOL=http \
PORT=3000 \
HOST=localhost \
KEYGRIP_KEYS=[\"81cb18f857d4d996445f72fa78997fc2c5f0348f18b30a743f164da2aac1cb7dd8650470cb9ea6029ecf018c38a65fde\"] \
KILL_TIMEOUT=3000 \
PGHOST=localhost \
PGUSER=customer \
PGPASSWORD=customer \
PGDATABASE=kometa \
PGPORT=5432 \
clinic doctor --on-port 'autocannon localhost:3000' -- node ./dist/server.js

NODE_ENV=development \
DOMAIN=localhost \
PROTOCOL=http \
PORT=3000 \
HOST=localhost \
KEYGRIP_KEYS=[\"81cb18f857d4d996445f72fa78997fc2c5f0348f18b30a743f164da2aac1cb7dd8650470cb9ea6029ecf018c38a65fde\"] \
KILL_TIMEOUT=3000 \
PGHOST=localhost \
PGUSER=customer \
PGPASSWORD=customer \
PGDATABASE=kometa \
PGPORT=5432 \
clinic bubbleprof --on-port 'autocannon -c 5 -a 500 localhost:3000' -- node ./dist/server.js
