/*jshint esversion: 6 */
// Require the dev-dependencies
let fs = require('fs');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../dist/server.min.js');
let should = chai.should();

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
// Chai use
chai.use(chaiHttp);
describe('app', () => {
  describe('#port', () => {
    it('should be a number', (done) => {
      server.port.should.be.a('number');
      (10).should.not.equal(0);
      done();
    });
    it('should be equal to 8000', (done) => {
      server.port.should.equal(8e3);
      done();
    });
  });
});
describe('Api response ', () => {
  describe('#POST()', () => {
    it('should accept image multipart/form-data to : / ', (done) => {
      chai.request(server).post('/')
      .set('content-type', 'multipart/form-data')
      .attach('imageField', fs.readFileSync('test/img.jpg'), 'img.jpg')
      .end((err, res) => {
        res.should.have.status(200);
        done();
        });
    });
    it('should accept video multipart/form-data to : / ', (done) => {
      chai.request(server).post('/')
      .set('content-type', 'multipart/form-data')
      .attach('imageField', fs.readFileSync('test/video.mp4'), 'video.mp4')
      .end((err, res) => {
        res.should.have.status(200);
        done();
        });
    });
  });
  describe('#GET', () => {
    it('should accept /GET to : / ', (done) =>{
      chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });
});
