/*jshint esversion: 6 */
/*jshint node: true */
/*jshint expr: true */

// Require the dev-dependencies
let fs = require('fs');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../dist/server.min.js');
let should = chai.should();

function Json200(res) {
    res.should.have.status(200);
    res.should.be.json;

}
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
// Chai use
chai.use(chaiHttp);
describe('Api response ', () => {
    describe('#GET', () => {
        it('should not accept GET to : / ', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('should accept GET to : /api ', (done) => {
            chai.request(server)
                .get('/api')
                .end((err, res) => {
                    Json200(res);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.a('string');
                    res.body.message.should.equal('Welcome on flatplan_api !');
                    done();
                });
        });
        it('should accept GET to : /api/produit ', (done) => {
            chai.request(server)
                .get('/api/produit')
                .end((err, res) => {
                    Json200(res);
                    done();
                });
        });
        it('should accept GET to : /api/produit/sli ', (done) => {
            chai.request(server)
                .get('/api/produit/sli')
                .end((err, res) => {
                    Json200(res);
                    done();
                });
        });
        it('should accept GET to : /api/produit/:produit/parution/ ', (done) => {
            chai.request(server)
                .get('/api/produit/sli/parution')
                .end((err, res) => {
                    Json200(res);
                    done();
                });
        });
        it('should accept GET to : /api/produit/:produit/parution/:parution ', (done) => {
            chai.request(server)
                .get('/api/produit/sli/parution/20160101')
                .end((err, res) => {
                    Json200(res);
                    done();
                });
        });
        it('should accept GET to : /api/produit/:produit/parution/:parution/folio ', (done) => {
            chai.request(server)
                .get('/api/produit/sli/parution/20160101/folio')
                .end((err, res) => {
                    Json200(res);
                    done();
                });
        });
        it('should accept GET to : /api/produit/:produit/parution/:parution/folio/:folio ', (done) => {
            chai.request(server)
                .get('/api/produit/sli/parution/20160101/folio/01')
                .end((err, res) => {
                    json200(res);
                    done();
                });
        });
        it('should accept GET to : /api/produit/:produit/parution/20160101/folio/01/status ', (done) => {
            chai.request(server)
                .get('/api/produit/sli/parution/20160101/folio/01/status')
                .end((err, res) => {
                    json200(res);
                    done();
                });
        });
    });
});
