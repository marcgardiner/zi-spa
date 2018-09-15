# zi-spa

[![CircleCI](https://circleci.com/gh/marcgardiner/zi-spa.svg?style=svg)](https://circleci.com/gh/marcgardiner/zi-spa)
[![TravisCI](https://travis-ci.org/marcgardiner/zi-spa.svg?branch=master)](https://travis-ci.org/marcgardiner/zi-spa)

zi location application based on SPA, Node, Mongo, and Angular.

## Prerequisite

* Make sure you have installed Node.js + NPM: https://nodejs.org/en/download/
* Install MongoDB by following instructions from https://docs.mongodb.com/manual/administration/install-community/
* Run `npm install`

## Configure Environment

The project is configured by some environment variables and it's ***required*** to give them appropriate values for your dev environment.

Here are some of them required to define:

* `MONGODB_URI`: MongoDB connection URI (including username and password if they exist); `mongodb://localhost:27017/plotter` as default
* `SERVER_URL`: Backend server base URL; `localhost:3000` as default

You can define these variables either in `{PROJECT_ROOT}/.env` file or in the global scope for the purpose of both development and deployment!
