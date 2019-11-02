# README

Home Spot Backend application

[![CircleCI](https://circleci.com/gh/HooFoo/jk/tree/master.svg?style=svg)](https://circleci.com/gh/HooFoo/jk/tree/master)

## Ruby version
* 2.5.5

## Development preparation

# Backend
```
bundle install
rails db:migrate
rails s
```

# Fronend
```
cd ./front
npm install
npm run start
```

## Testing
```
RAILS_ENV=test rails db:migrate
rspec
```
