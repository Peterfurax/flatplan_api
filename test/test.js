"use strict";
/*jslint node: true */
/*jshint esversion: 6 */
/*jshint expr: true */
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../build/server.js');
const apiList = require('./provider/apiList');
const apiListErr = require('./provider/apiListErr');
const should = chai.should();
let logData = [];
let counter = 0;
const list = apiList;
const listErr = apiListErr;

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
      chai.request(server).get(uri).end((err, res) => {
        resolve(res.should.have.status(httpReponseCode));
        done();
      });
    });
  });
}

function beJson(uri) {
  return new Promise((resolve, reject) => {
    it('should be json', (done) => {
      chai.request(server).get(uri).end((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.should.be.json);
        done();
      });
    });
  });
}

function beObject(uri) {
  return new Promise((resolve, reject) => {
    it('should be objet', (done) => {
      chai.request(server).get(uri).end((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.body.should.be.a('object'));
        done();
      });
    });
  });
}

function keyIsString(uri) {
  return new Promise((resolve, reject) => {
    it('should body.message is string', (done) => {
      chai.request(server).get(uri).end((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.body.message.should.be.a('string'));
        done();
      });
    });
  });
}

function bodyHaveProperty(uri, waitProperty) {
  return new Promise((resolve, reject) => {
    it('should have property ' + waitProperty + '', (done) => {
      chai.request(server).get(uri).end((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.body.should.have.property(waitProperty));
        done();
      });
    });
  });
}

function stringIsEqual(uri, waitingMessage) {
  return new Promise((resolve, reject) => {
    it('should message equal = ' + waitingMessage + '', (done) => {
      chai.request(server).get(uri).end((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.body.message.should.equal(waitingMessage));
        done();
      });
    });
  });
}
const httpStatus = 200;
const httpStatusErr = 400;
const httpStatusDrop = 404;
const waitErrProperty = 'err';
const welcomeMessage = 'Welcome on flatplan_api !';
// const list = ['/api/produit', '/api/produit/sli', '/api/produit/sli/parution', '/api/produit/sli/parution/20160101', '/api/produit/sli/parution/20160101/folio', '/api/produit/sli/parution/20160101/folio/01', '/api/produit/sli/parution/20160101/folio/01/status'];
// const listErr = ['/api/produit/ERR', '/api/produit/ERR/parution', '/api/produit/sli/parution/ERR', '/api/produit/ERR/parution/20160101', '/api/produit/ERR/parution/ERR', '/api/produit/ERR/parution/20160101/folio', '/api/produit/sli/parution/ERR/folio', '/api/produit/ERR/parution/ERR/folio', '/api/produit/ERR/parution/20160101/folio', '/api/produit/sli/parution/ERR/folio', '/api/produit/ERR/parution/ERR/folio', '/api/produit/ERR/parution/20160101/folio/01', '/api/produit/sli/parution/ERR/folio/01', '/api/produit/sli/parution/20160101/folio/ERR', '/api/produit/ERR/parution/ERR/folio/01', '/api/produit/ERR/parution/ERR/folio/ERR', '/api/produit/ERR/parution/20160101/folio/01/status', '/api/produit/sli/parution/ERR/folio/01/status', '/api/produit/sli/parution/20160101/folio/ERR/status', '/api/produit/ERR/parution/ERR/folio/01/status', '/api/produit/ERR/parution/ERR/folio/01/status', '/api/produit/ERR/parution/ERR/folio/ERR/status'];
function getTest() {
  for (var i = 0; i < list.length; i++) {
    const uri = list[i];
    describe(uri, () => {
      Promise.all([
        statusHttp(uri, httpStatus),
        beJson(uri)
      ]).then(result => logger(result), err => logger(err)).catch(err => logger(err));
    });
  }
}

function getTestErr() {
  for (var i = 0; i < listErr.length; i++) {
    const uri = listErr[i];
    describe(uri, () => {
      Promise.all([
        statusHttp(uri, httpStatusErr),
        beJson(uri)
      ]).then(result => logger(result), err => logger(err)).catch(err => logger(err));
    });
  }
}
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
// Chai use
chai.use(chaiHttp);
describe('Api response ', () => {
  describe('#GET', () => {
    describe('#/', () => {
      statusHttp('/', httpStatusDrop).then(result => logger(result), err => logger(err)).catch(err => logger(err));
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
      ]).then(result => logger(result), err => logger(err)).catch(err => logger(err));
    });
    getTest();
    getTestErr();
  });
});
