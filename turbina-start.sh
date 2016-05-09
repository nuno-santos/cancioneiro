# Script to launch the servers

mongod --dbpath /home/nsantos/cancioneiro/production/data > /home/nsantos/cancioneiro/production/logs/mongod.log &

npm start > /home/nsantos/cancioneiro/production/logs/npm.log &

