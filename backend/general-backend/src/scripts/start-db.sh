#!/bin/bash
set -e

SERVER="postsql";
  PW="admin";
DB="inkfury";

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e PGPASSWORD=$PW \
  -p 5432:5432 \
  -d postgres

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
SLEEP 3;

# create the db 
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
#echo "\c inkfury" | docker exec -i $SERVER psql -U postgres
#echo "CREATE TABLE users (
#      	user_id serial PRIMARY KEY,
#      	username VARCHAR ( 50 ) UNIQUE NOT NULL,
#      	password VARCHAR ( 50 ) NOT NULL,
#      	email VARCHAR ( 255 ) UNIQUE NOT NULL,
#      	created_on TIMESTAMP NOT NULL,
#              last_login TIMESTAMP
#      );" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres
