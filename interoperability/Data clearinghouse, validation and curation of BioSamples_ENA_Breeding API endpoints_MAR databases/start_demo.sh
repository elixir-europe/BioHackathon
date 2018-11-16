#!/bin/bash
set -e


# Removes any image
docker-compose down --volumes --rmi local --remove-orphans

# Package the code to a jar file
cd marref_api
mvn clean package 
cd ..

# Build the docker images to use in the docker containers
docker-compose build

# Spin up the docker contains
docker-compose up -d --remove-orphans marref json-schema-validator


