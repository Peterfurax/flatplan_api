# flatplan_api

[![travis](https://travis-ci.org/Peterfurax/flatplan_api.svg?branch=master)](https://travis-ci.org/Peterfurax/flatplan_api) [![macOS Build Status](https://circleci.com/gh/Peterfurax/flatplan_api.svg?style=shield)](https://circleci.com/gh/Peterfurax/flatPlan_api) [![Windows Build status](https://ci.appveyor.com/api/projects/status/github/Peterfurax/flatPlan_api?svg=true&passingText=build%20-%20OK)](https://ci.appveyor.com/project/jshint/jshint/branch/master) [![Code Climate](https://codeclimate.com/github/Peterfurax/flatplan_api/badges/gpa.svg)](https://codeclimate.com/github/Peterfurax/flatplan_api)[![Coverage Status](https://coveralls.io/repos/github/Peterfurax/flatplan_api/badge.svg?branch=master)](https://coveralls.io/github/Peterfurax/flatplan_api?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/peterfurax/flatplan_api/badge.svg)](https://snyk.io/test/github/peterfurax/flatplan_api) [![Dependency Status](https://david-dm.org/peterfurax/flatPlan_api.svg)](https://david-dm.org/peterfurax/flatPlan_api)

## Cloning

- Clone the reposotory : `$ git clone https://github.com/Peterfurax/flatplan_api.git`

  - Change directory to flatplan_api : `$ cd flatplan_api`

## Install

- Full install : `$ npm install`

  - Production dependencies : `$ npm install --production`
  - Devellopement dependencies : `$ npm install --only-dev`

## Script

### Babel

- Babel all : `$ npm run babel`

  - Src folders : `$ npm run babel:src`

### Build

- Run all => clean, lint, babel, uglify, doc : `$ npm run build`

### Start

#### Server

- Prod : `$ npm run start`
- Dev : `$ npm run start:dev`

#### Cluster

- Prod cluster : `$ npm run cluster`
- Dev cluster : `$ npm run cluster:dev`

### Clean

- Clean:* : `$ npm run clean`

  - Build : `$ npm run clean:build`
  - Coverage : `$ npm run clean:coverage`
  - Docs : `$ npm run clean:docs`
  - Docs_Lib : `$ npm run clean:docs_Lib`

### Lint

- Lint:* : `$ npm run lint`

  - Server : `$ npm run lint:server`
  - Cluster : `$ npm run lint:cluster`
  - Lib : `$ npm run lint:lib`

### Documentation

- Doc:* : `$ npm run doc`

  - LibJs : `$ npm run doc:libJs`
  - Test : `$ npm run doc:test`
  - GetTestErr : `$ npm run doc:getTestErr`
  - GetTest : `$ npm run doc:getTest`
  - Server : `$ npm run doc:server`
  - Cluster : `$ npm run doc:cluster`
  - Lib : `$ npm run doc:lib`

### Unit test

- Unitest : `$ npm run unitTest`

### Test

- Run all clean, lint, babel, uglify, doc, unitTest, coverage : `$ npm test`

### Uglify

- Uglify:* : `$ npm run uglify`

  - Server : `$ npm run uglify:server`
  - Cluster : `$ npm run uglify:cluster`
  - Lib : `$ npm run uglify:lib`
  - Provider : `$ npm run uglify:provider`

### Coverage

- Coverage : `$ npm run coverage`
