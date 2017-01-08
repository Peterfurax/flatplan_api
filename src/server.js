"use strict";
/*jslint node: true */
/*jshint esversion: 6 */
// BASE SETUP
// =============================================================================
// - call the packages we need
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
//  2. if `err` is `string` => `{"err": err}`
//  3. return a `json` with `err` => `res.json(err);``
/**
 * @method errEnd
 * @param  {[any]}   err [captured error]
 * @param  {[array]} res [captured http res]
 * @return {[json]}      [return http json]
 */
function errEnd(err, res) {
  // if (typeof err === "string") {
  //   res.json({
  //     "err": err
  //   });
  // } else {
  //   res.json(err);
  // }
  res.status(400);
  res.json({
    "err": err
  });
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
  }, err => errEnd(err, res)).catch(err => errEnd(err, res));
});
// - GET /produit/:produit/parution/
router.get('/produit/:produit/parution/', (req, res) => {
  lib.productIdx(req.params.produit).then(productIdx => {
    res.json(data[productIdx].parution);
  }, err => errEnd(err, res)).catch(err => errEnd(err, res));
});
// - GET /produit/:produit/parution/:parution
router.get('/produit/:produit/parution/:parution', (req, res) => {
  lib.productIdx(req.params.produit).then(productIdx => {
    lib.parutionIdx(productIdx, req).then(parutionIdx => {
      res.json(data[productIdx].parution[parutionIdx]);
    }, err => errEnd(err, res)).catch(err => errEnd(err, res));
  }, err => errEnd(err, res)).catch(err => errEnd(err, res));
});
// - GET /produit/:produit/parution/:parution/folio
router.get('/produit/:produit/parution/:parution/folio', (req, res) => {
  lib.productIdx(req.params.produit).then(productIdx => {
    lib.parutionIdx(productIdx, req).then(parutionIdx => {
      res.json(data[productIdx].parution[parutionIdx].folio);
    }, err => errEnd(err, res)).catch(err => errEnd(err, res));
  }, err => errEnd(err, res)).catch(err => errEnd(err, res));
});
// - GET /produit/:produit/parution/:parution/folio/:folio
router.get('/produit/:produit/parution/:parution/folio/:folio', (req, res) => {
  lib.productIdx(req.params.produit).then(productIdx => {
    lib.parutionIdx(productIdx, req).then(parutionIdx => {
      lib.folioIdx(productIdx, parutionIdx, req).then(folioIdx => {
        res.json(data[productIdx].parution[parutionIdx].folio[folioIdx]);
      }, err => errEnd(err, res)).catch(err => errEnd(err, res));
    }, err => errEnd(err, res)).catch(err => errEnd(err, res));
  }, err => errEnd(err, res)).catch(err => errEnd(err, res));
});
// - GET /produit/
router.get('/produit/:produit/parution/:parution/folio/:folio/status', (req, res) => {
  lib.productIdx(req.params.produit).then(productIdx => {
    lib.parutionIdx(productIdx, req).then(parutionIdx => {
      lib.folioIdx(productIdx, parutionIdx, req).then(folioIdx => {
        res.json(data[productIdx].parution[parutionIdx].folio[folioIdx].status);
      }, err => errEnd(err, res)).catch(err => errEnd(err, res));
    }, err => errEnd(err, res)).catch(err => errEnd(err, res));
  }, err => errEnd(err, res)).catch(err => errEnd(err, res));
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
// router.get('/eggs', (req, res) => {
//  res.redirect('https://www.youtube.com/watch?v=3Yfy_QIgpsc');
// });
