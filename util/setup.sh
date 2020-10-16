#!/bin/bash

cd ..
cd backend
yarn cache clean
yarn
docker pull mongo
docker run -d  --name mongo-on-docker  -p 27017:27017 mongo
cp .env.example .env
cd ..
cd frontend
yarn

