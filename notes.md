# Creating a ott-service using nest

## Building and running apllication

```bash
$ nvm use v18
$ npm install -g @nestjs/cli
$ nest new ott-service

#creating .env
$ npm i --save @nestjs/config

#creating my-list crud
$ nest g resource my-list
$ nest g resource user
$ nest g resource movie
$ nest g resource tv-show
$ nest g resource artist

#Running application
$ npm run start:dev ## watch mode
$ npm run start

#Installing packages
$ npm i --save @nestjs/common
$ npm install class-validator
$ npm install class-transformer

#Re structuring directories 
$ nest g controller my-list
$ nest g service my-list
```

## Running prod build in background
Using pm2 
```bash 
$ pm2 start dist/main.js -n ott-service
$ pm2 delete ott-service
 # other commands
$ pm2 flush
$ pm2 reset
$ rm ~/.pm2/dump.pm2
$ rm -rf ~/.pm2/logs
$ pm2 kill
$ pm2 start
$ pm2 update

```

## Deploying Application on Heroku

### Steps
```bash
$ arch -arm64 brew tap heroku/brew && arch -arm64 brew install heroku
$ heroku login
heroku: Press any key to open up the browser to login or q to exit
 ›   Warning: If browser does not open, visit
 ›   https://cli-auth.heroku.com/auth/browser/***
heroku: Waiting for login...
Logging in... done
Logged in as me@example.com

$ node --version
v20.9.0

$ npm --version
10.1.0

$ git --version
git version 2.42.0

$ heroku create  

# create Procfile which contains
# web: node dist/main.js

$ git push heroku master
```