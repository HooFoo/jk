# README

Home Spot Backend application

[![CircleCI](https://circleci.com/gh/HooFoo/jk/tree/master.svg?style=svg)](https://circleci.com/gh/HooFoo/jk/tree/master)

## Ruby version
* 2.5.5

## Development preparation

### Backend

Uses dotenv gem.
To set environment variables in development mode there shoulbe be created `.env` file in project root folder
with environment variables, for eg
```
DEVISE_JWT_SECRET_KEY=YOUR_SECRET_VALUE
```
You can generate secret key with the next command
```
rake secret
```

To run the project
```
bundle install
rails db:migrate
rails s
```

## Docker
To start working with docker you should have installed `docker-compose`
When it's installed you need to build docker containers
```
dockeer-compose build
```
After it you can run rails commands in docker
```
docker-compose run web rails db:create
docker-compose run web rails db:migrate
docker-compose run web rails db:seed
```
When database is configured you can run application
```
docker-compose up -d
```
When container is up and running the app is accessible via `http://localhost:3000` url.

### Fronend
```
cd ./front
npm install
npm run start
```

### All in one
```
gem install foreman
foreman start
```

## Testing
```
RAILS_ENV=test rails db:migrate
rspec
```
