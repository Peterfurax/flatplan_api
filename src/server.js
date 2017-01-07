"use strict";
/*jslint node: true */
/*jshint esversion: 6 */
// BASE SETUP
// =============================================================================
// - call the packages we need
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dataFile = require('../src/data');
const lib = require('../src/lib');
const data = dataFile;
const port = process.env.PORT || 8e3;
const router = express.Router();
// - configure `app` to use `bodyParser()`
app.use(bodyParser.urlencoded({
  extended: true
}));
// - this will let us get the data from a POST
app.use(bodyParser.json());
// - configure `app.set()` to indent json with 2 spaces in httpReponse
app.set('json spaces', 2);
// FUNCTION
// =============================================================================
//     resErrEnd(err, res);
// return error
// - `@method resErrEnd`
// - `@param  {[any]}          err [captured error]`
// - `@param  {[httpReponse]}  res [capture res http]`
// - `@return {[{"err": err}]}     [ & status(400) & end http]`
//  1. set Http status to 400 (bad request) => `res.status(codeNumber);`
//  2. if err is string => `{"err": err}`
//  3. return a json with err => `res.json({err});`
//  4. end the http  => `res.end();`
function resErrEnd(err, res) {
  res.status(400);
  if (typeof err === "string") {
    res.json({
      "err": err
    });
  }
  else {res.json(err);}
  res.end();
}
// API ROUTES
// =============================================================================
// - Here all the api route, get, post, put, delete
//
// GET ROUTES
// -----
//  - GET /
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome on flatplan_api !'
  });
});
// - GET /produit/
router.get('/produit/', (req, res) => {
  res.json(data);
});
// - GET /produit/:produit
router.get('/produit/:produit', (req, res) => {
  lib.productIdx(req.params.produit).then(productIdx => {
    res.json(data[productIdx]);
    res.end();
  }, err => resErrEnd(err, res)).catch(err => resErrEnd(err, res));
});
// - GET /produit/:produit/parution/
router.get('/produit/:produit/parution/', (req, res) => {
  lib.productIdx(req.params.produit).then(productIdx => {
    res.json(data[productIdx].parution);
    res.end();
  }, err => resErrEnd(err, res)).catch(err => resErrEnd(err, res));
});
// - GET /produit/:produit/parution/:parution
router.get('/produit/:produit/parution/:parution', (req, res) => {
  lib.productIdx(req.params.produit).then(productIdx => {
    lib.parutionIdx(productIdx, req).then(parutionIdx => {
      res.json(data[productIdx].parution[parutionIdx]);
    }, err => resErrEnd(err, res)).catch(err => resErrEnd(err, res));
  }, err => resErrEnd(err, res)).catch(err => resErrEnd(err, res));
});
// - GET /produit/:produit/parution/:parution/folio
router.get('/produit/:produit/parution/:parution/folio', (req, res) => {
  lib.productIdx(req.params.produit).then(productIdx => {
    lib.parutionIdx(productIdx, req).then(parutionIdx => {
      res.json(data[productIdx].parution[parutionIdx].folio);
    }, err => resErrEnd(err, res)).catch(err => resErrEnd(err, res));
  }, err => resErrEnd(err, res)).catch(err => resErrEnd(err, res));
});
// - GET /produit/:produit/parution/:parution/folio/:folio
// router.get('/produit/:produit/parution/:parution/folio/:folio', (req, res) => {
//   console.log(req.params);
//   var idx = data.map((el) => el.produit).indexOf(req.params.produit);
//   var idxparution = data[idx].parution.map((el) => el.parution).indexOf(req.params.parution);
//   console.log("idxparution", idxparution);
//   var idxFolio = data[idx].parution[idxparution].folio.map((el) => el.page).indexOf(Number(req.params.folio));
//   var idxFolio2 = data[idx].parution[idxparution].folio.map((el) => el.page).indexOf("01");
//   console.log(data[idx].parution[idxparution].folio.map((el) => el.page));
//   console.log("idxFolio", idxFolio);
//   console.log("idxFolio2", idxFolio2);
//   console.log("tata", data[idx].parution[idxparution].folio[idxFolio]);
//   res.json(data[idx].parution[idxparution].folio[idxFolio]);
// });
// - GET /produit/
// router.get('/produit/:produit/parution/:parution/folio/:folio/status', (req, res) => {
//   console.log(req.params);
//   var idx = data.map((el) => el.produit).indexOf(req.params.produit);
//   var idxparution = data[idx].parution.map((el) => el.parution).indexOf(req.params.parution);
//   var idxFolio = data[idx].parution[idxparution].folio.map((el) => el.page).indexOf(Number(req.params.folio));
//   console.log(idxFolio);
//   res.json(data[idx].parution[idxparution].folio[idxFolio].status);
// });
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
// router.get('/eggs', (req, res) => {
//  res.redirect('https://www.youtube.com/watch?v=3Yfy_QIgpsc');
// });
