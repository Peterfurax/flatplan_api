"use strict";
/*jslint node: true */
/*jshint esversion: 6 */
// Require the dev-dependencies
let fs = require('fs');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server');
let lib = require('../src/lib');
// let server = require('../dist/server.min.js');
let should = chai.should();

function statusHttp(uri, httpReponseCode) {
  return new Promise((resolve, reject) => {
    if (typeof httpReponseCode !== 'number') {reject('http code must be a number');}
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
        if (err) {reject(err);}
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
        if (err) {reject(err);}
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
        if (err) {reject(err);}
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
        if (err) {reject(err);}
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
        if (err) {reject(err);}
        resolve(res.body.message.should.equal(waitingMessage));
        done();
      });
    });
  });
}
const httpStatus = 200;
const httpStatusErr = 400;
const waitErrProperty = 'err';
const welcomeMessage = 'Welcome on flatplan_api !';
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
// Chai use
chai.use(chaiHttp);
describe('Api response ', () => {
  describe('#GET', () => {
    describe('#/', () => {
      statusHttp('/', 404);
    });
    describe('#/api', () => {
      const uri = '/api';

      const waitRep = 'message';
      Promise.all([
        statusHttp(uri, httpStatus),
        beJson(uri),
        beObject(uri),
        keyIsString(uri),
        bodyHaveProperty(uri,waitRep),
        stringIsEqual(uri, welcomeMessage)
      ]).then(result => {}, err =>{}).catch(err => {});
    });
    describe('#/api/produit', () => {
      const uri = '/api/produit';
      Promise.all([
        statusHttp(uri, httpStatus),
        beJson(uri)
      ]).then(result => {}, err =>{}).catch(err => {});
    });
    describe('#/api/produit/:produit', () => {
      const uri = '/api/produit/sli';
      Promise.all([
        statusHttp(uri, httpStatus),
        beJson(uri)
      ]).then(result => {}, err =>{}).catch(err => {});
    });
    describe('ERR #/api/produit/:produit', () => {
      const uri = '/api/produit/errorPath';
      Promise.all([
        statusHttp(uri, httpStatusErr),
        beJson(uri),
        bodyHaveProperty(uri,waitErrProperty)
      ]).then(result => {}, err =>{}).catch(err => {});
    });
    describe('#/api/produit/:produit/parution', () => {
      const uri = '/api/produit/sli/parution';
      Promise.all([
        statusHttp(uri, httpStatus),
        beJson(uri)
      ]).then(result => {}, err =>{}).catch(err => {});
    });
    describe('#/api/produit/:produit/parution/:parution', () => {
      const uri = '/api/produit/sli/parution/20160101';
      Promise.all([
        statusHttp(uri, httpStatus),
        beJson(uri)
      ]).then(result => {}, err =>{}).catch(err => {});
    });
    describe('ERR #/api/produit/:produit/parution/:ERR', () => {
      const uri = '/api/produit/sli/parution/errorDate';
      Promise.all([
        statusHttp(uri, httpStatusErr),
        beJson(uri),
        bodyHaveProperty(uri,waitErrProperty)
      ]).then(result => {}, err =>{}).catch(err => {});
    });
    describe('ERR #/api/produit/:ERR/parution/:ERR', () => {
      const uri = '/api/produit/errorProduit/parution/errorDate';
      Promise.all([
        statusHttp(uri, httpStatusErr),
        beJson(uri),
        bodyHaveProperty(uri,waitErrProperty)
      ]).then(result => {}, err =>{}).catch(err => {});
    });
    describe('#/api/produit/:produit/parution/:parution/folio', () => {
      const uri = '/api/produit/sli/parution/20160101/folio';
      Promise.all([
        statusHttp(uri, httpStatus),
        beJson(uri)
      ]).then(result => {}, err =>{}).catch(err => {});
    });
    // describe('#/api/produit/:produit/parution/:parution/folio', () => {
    //   it('should accept GET to : /api/produit/:produit/parution/:parution/folio/:folio ', (done) => {
    //     chai.request(server).get('/api/produit/sli/parution/20160101/folio/01').end((err, res) => {
    //       done();
    //     });
    //   });
    //   it('should accept GET to : /api/produit/:produit/parution/20160101/folio/01/status ', (done) => {
    //     chai.request(server).get('/api/produit/sli/parution/20160101/folio/01/status').end((err, res) => {
    //       done();
    //     });
    //   });
    // });
    //
  });
});
