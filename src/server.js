// INIT FILE SETUP
// =============================================================================
// - use strict option
"use strict";
// - jslint option
/*jslint node: true */
/*jshint esversion: 6 */
// REQUIRE
// =============================================================================
// - call the packages we need
// - must have to go !
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dataFile = require('./provider/data');
const lib = require('./lib/lib');
const data = dataFile;
const port = process.env.PORT || 8e3;
const router = express.Router();
// - Configure `app` to use `bodyParser()`
app.use(bodyParser.urlencoded({
  extended: true
}));
// - Security disable x-powered-by
app.disable('x-powered-by');
// - This will let us get the data from a POST
app.use(bodyParser.json());
// - Configure `app.set()` to indent json with 2 spaces in httpResponse
app.set('json spaces', 2);
// FUNCTION
// =============================================================================
//     errEnd(err, res);
// return captured error to json httpResponse, status 400
//  1. set Http status to `400` (bad request) => `res.status(codeNumber);`
//  2. return a `json` with `err` => `res.json(err);``
/**
 * @method errEnd
 * @param  {any}   err [captured error]
 * @param  {array} res [captured http res]
 * @return {json}      [return http json]
 */
function errEnd(err, res) {
  res.status(400)
    .json({ "err": err });
}
// TODO: capture all put
// temp fonction
function capturePut(req, res) {
  console.log(req.params);
  res.json(req.params);
}
// API ROUTES
// =============================================================================
// - Here all the api route, get, post, put, delete
//
// /
// -----
// - `get`
router.route('/')
  .get((req, res) => {
    res.json({ message: 'Welcome on flatplan_api !' });
  });
// /produit/
// -----
// - `get`
router.route('/produit/')
  .get((req, res) => {
    res.json(data);
  });
// /produit/:produit
// -----
// - `get`
router.route('/produit/:produit')
  .get((req, res) => {
    lib.productIdx(req.params.produit)
      .then(productIdx => {
        res.json(data[productIdx]);
      })
      .catch(err => errEnd(err, res));
  })
  .put((req, res) => capturePut(req, res));
// /produit/:produit/parution/
// -----
// - `get`
router.route('/produit/:produit/parution/')
  .get((req, res) => {
    lib.productIdx(req.params.produit)
      .then(productIdx => {
        res.json(data[productIdx].parution);
      })
      .catch(err => errEnd(err, res));
  });
// /produit/:produit/parution/:parution
// -----
// - `get`
router.route('/produit/:produit/parution/:parution')
  .get((req, res) => {
    lib.productParution(req)
      .then(result => {
        res.json(data[result.productIdx].parution[result.parutionIdx]);
      })
      .catch(err => { errEnd(err, res); });
  })
  .put((req, res) => capturePut(req, res));
// /produit/:produit/parution/:parution/folio
// -----
// - `get`
router.route('/produit/:produit/parution/:parution/folio')
  .get((req, res) => {
    lib.productParution(req)
      .then(result => {
        res.json(data[result.productIdx].parution[result.parutionIdx].folio);
      })
      .catch(err => { errEnd(err, res); });
  });
// /produit/:produit/parution/:parution/folio/:folio
// -----
// TODO: find good wa
router.route('/produit/:produit/parution/:parution/folio/:folio')
  .get((req, res) => {
    lib.productParutionFolio(req)
      .then(result => {
        res.json(data[result.productIdx].parution[result.parutionIdx].folio[result.folioIdx]);
      })
      .catch(err => { errEnd(err, res); });
  })
  // - `put` update folio
  .put((req, res) => {
    lib.productParutionFolio(req)
      .then(result => {
        data[result.productIdx].parution[result.parutionIdx].folio[result.folioIdx].page = req.params.folio;
        res.json(data[result.productIdx].parution[result.parutionIdx].folio[result.folioIdx]);
      })
      .catch(err => { errEnd(err); });
  });
// /produit/:produit/parution/:parution/folio/:folio/status
// -----
// - `get` status of folio
router.route('/produit/:produit/parution/:parution/folio/:folio/status')
  .get((req, res) => {
    lib.productParutionFolio(req)
      .then(result => {
        res.json(data[result.productIdx].parution[result.parutionIdx].folio[result.folioIdx].status);
      })
      .catch(err => { errEnd(err, res); });
  });
// /produit/:produit/parution/:parution/folio/:folio/status/:status
// ------
// - `put` update status false === locked or true === unlocked
router.route('/produit/:produit/parution/:parution/folio/:folio/status/:status')
  .put((req, res) => {
    lib.productParutionFolio(req)
      .then(result => {
        data[result.productIdx].parution[result.parutionIdx].folio[result.folioIdx].status = req.params.status;
        res.json(data[result.productIdx].parution[result.parutionIdx].folio[result.folioIdx].status);
      })
      .catch(err => { errEnd(err); });
  });
// REGISTER ROUTE
// =============================================================================
// all routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
// express.listen port, up httpServer
app.listen(port);
console.log('Magic happens on port ' + port);
// DEBUG SUPPORT
// =============================================================================
module.exports = app;
//
//
//
//
//
//
//
//
//
// easter eggs
// router.route('/eggs', (req, res) => {
//  res.redirect('https://www.youtube.com/watch?v=3Yfy_QIgpsc');
// });
