"use strict";
/*jslint node: true */
/*jshint esversion: 6 */
/*jshint expr: true */
/*jshint loopfunc: true */
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../dist/server');
const getTest = require('./provider/getTest');
const getTestErr = require('./provider/getTestErr');
const should = chai.should();
let logData = [];
let counter = 0;
const testGetArr = getTest;
const testGetArrErr = getTestErr;

function logger(mess) {
  counter += 1;
  logData.push({
    counter: mess
  });
  console.log(counter);
  // console.log(logData);
}

function statusHttp(uri, httpReponseCode) {
  return new Promise((resolve, reject) => {
    if (typeof httpReponseCode !== 'number') {
      reject('http code must be a number');
    }
    it('Http status res ' + httpReponseCode + '', (done) => {
      chai.request(server)
        .get(uri)
        .end((err, res) => {
          resolve(res.should.have.status(httpReponseCode));
          done();
        });
    });
  });
}

function putT(uri) {
  return new Promise((resolve, reject) => {
    it('should be json', (done) => {
      chai.request(server)
        .put(uri)
        .end((err, res) => {
          err ? reject(err) : resolve(res.should.be.json);
          done();
        });
    });
  });
}

function beJson(uri) {
  return new Promise((resolve, reject) => {
    it('should be json', (done) => {
      chai.request(server)
        .get(uri)
        .end((err, res) => {
          err ? reject(err) : resolve(res.should.be.json);
          done();
        });
    });
  });
}

function beObject(uri) {
  return new Promise((resolve, reject) => {
    it('should be objet', (done) => {
      chai.request(server)
        .get(uri)
        .end((err, res) => {
          err ? reject(err) : resolve(res.body.should.be.a('object'));
          done();
        });
    });
  });
}

function keyIsString(uri) {
  return new Promise((resolve, reject) => {
    it('should body.message is string', (done) => {
      chai.request(server)
        .get(uri)
        .end((err, res) => {
          err ? reject(err) : resolve(res.body.message.should.be.a('string'));
          done();
        });
    });
  });
}

function bodyHaveProperty(uri, waitProperty) {
  return new Promise((resolve, reject) => {
    it('should have property ' + waitProperty + '', (done) => {
      chai.request(server)
        .get(uri)
        .end((err, res) => {
          err ? reject(err) : resolve(res.body.should.have.property(waitProperty));
          done();
        });
    });
  });
}

function stringIsEqual(uri, waitingMessage) {
  return new Promise((resolve, reject) => {
    it('should message equal = ' + waitingMessage + '', (done) => {
      chai.request(server)
        .get(uri)
        .end((err, res) => {
          err ? reject(err) : resolve(res.body.message.should.equal(waitingMessage));
          done();
        });
    });
  });
}
const httpStatus = 200;
const httpStatusErr = 400;
const httpStatusDrop = 404;
const welcomeMessage = 'Welcome on flatplan_api !';
const testPutArr = [
'/api/produit/sli',
'/api/produit/sli/parution/20160101',
'/api/produit/sli/parution/20160101/folio/01',
'/api/produit/sli/parution/20160101/folio/01/status/newStatus'
];

function putTest() {
  for (var i = 0; i < testPutArr.length; i++) {
    const uri = testPutArr[i];
    describe(uri, () => {
      Promise.all([
        putT(uri)
      ])
        .then(result => logger(result), err => logger(err))
        .catch(err => logger(err));
    });
  }
}

function getTestArr() {
  for (var i = 0; i < testGetArr.length; i++) {
    const uri = testGetArr[i];
    describe(uri, () => {
      Promise.all([
        statusHttp(uri, httpStatus),
        beJson(uri)
      ])
        .then(result => logger(result), err => logger(err))
        .catch(err => logger(err));
    });
  }
}

function getTestErrArr() {
  for (var i = 0; i < testGetArrErr.length; i++) {
    const uri = testGetArrErr[i];
    describe(uri, () => {
      Promise.all([
        statusHttp(uri, httpStatusErr),
        beJson(uri)
      ])
        .then(result => logger(result), err => logger(err))
        .catch(err => logger(err));
    });
  }
}
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
// Chai use
chai.use(chaiHttp);
describe('Api response ', () => {
  describe('#PATH', () => {
    describe('#/', () => {
      statusHttp('/', httpStatusDrop)
        .then(result => logger(result), err => logger(err))
        .catch(err => logger(err));
    });
    describe('#/api', () => {
      const uri = '/api';
      const waitRep = 'message';
      Promise.all([
        statusHttp(uri, httpStatus),
        beJson(uri),
        beObject(uri),
        keyIsString(uri),
        bodyHaveProperty(uri, waitRep),
        stringIsEqual(uri, welcomeMessage)
      ])
        .then(result => logger(result), err => logger(err))
        .catch(err => logger(err));
    });
    Promise.all([
      getTestArr(),
      getTestErrArr(),
      putTest()
    ])
      .then(result => logger(result), err => logger(err))
      .catch(err => logger(err));
  });
});
