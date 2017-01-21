# flatplan_api

[![travis](https://travis-ci.org/Peterfurax/flatplan_api.svg?branch=master)](https://travis-ci.org/Peterfurax/flatplan_api) [![macOS Build Status](https://circleci.com/gh/Peterfurax/flatplan_api.svg?style=shield)](https://circleci.com/gh/Peterfurax/flatPlan_api) [![Windows Build status](https://ci.appveyor.com/api/projects/status/github/Peterfurax/flatPlan_api?svg=true&passingText=build%20-%20OK)](https://ci.appveyor.com/project/jshint/jshint/branch/master)[![Code Climate](https://codeclimate.com/github/Peterfurax/flatplan_api/badges/gpa.svg)](https://codeclimate.com/github/Peterfurax/flatplan_api)[![Coverage Status](https://coveralls.io/repos/github/Peterfurax/flatplan_api/badge.svg?branch=master)](https://coveralls.io/github/Peterfurax/flatplan_api?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/peterfurax/flatplan_api/badge.svg)](https://snyk.io/test/github/peterfurax/flatplan_api) [![Dependency Status](https://david-dm.org/peterfurax/flatPlan_api.svg)](https://david-dm.org/peterfurax/flatPlan_api)

## Cloning

- Clone the reposotory master to /flatplan_api : `$ git clone https://github.com/Peterfurax/flatplan_api.git`

- Change directory to flatplan_api : `$ cd flatplan_api`

## Install

- Production dependencies : `$ npm install --production`

- Devellopement dependencies : `$ npm install --only-dev`

## Script

### Babel

- Babel all : `$ npm run babel`

- Babel source folders : `$ npm run babel:src`

### Build

- Run all clean, lint, babel, uglify, doc : `$ npm run build`

### Start

#### Server solo

- Production server : `$ npm run start`

- Devellopement server : `$ npm run start:dev`

#### Server Cluster

- Production cluster server : `$ npm run cluster`

- Production cluster server : `$ npm run cluster:dev`

### Clean

- Clean all clean:* : `$ npm run clean`

- Clean build folders : `$ npm run clean:build`

- Clean coverage folders : `$ npm run clean:coverage`

- Clean docs folders : `$ npm run clean:docs`

- Clean docs_Lib folders : `$ npm run clean:docs_Lib`

### Lint

- Lint all lint:* : `$ npm run lint`

- Lint server : `$ npm run lint:server`

- Lint cluster : `$ npm run lint:cluster`

- Lint lib : `$ npm run lint:lib`

### Documentation

- Document all : `$ npm run doc`

- Document libJs : `$ npm run doc:libJs`

- Document test : `$ npm run doc:test`

- Document getTestErr : `$ npm run doc:getTestErr`

- Document getTest : `$ npm run doc:getTest`

- Document server : `$ npm run doc:server`

- Document cluster : `$ npm run doc:cluster`

- Document lib : `$ npm run doc:lib`

### Unit test

- Unitest : `$ npm run unitTest`

### Test

- Run all clean, lint, babel, uglify, doc, unitTest, coverage : `$ npm test`

### Uglify

- Uglify all : `$ npm run uglify`

- Uglify server : `$ npm run uglify:server`

- Uglify cluster : `$ npm run uglify:cluster`

- Uglify lib : `$ npm run uglify:lib`

- Uglify provider : `$ npm run uglify:provider`

### Watch

- Watch : `$ npm run watch`

- Watch : `$ npm run watch:prod`

- Watch : `$ npm run watch:dev`

### Coverage

- Coverage : `$ npm run coverage`
