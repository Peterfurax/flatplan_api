/*jslint node: true */
/*jshint esversion: 6 */
// BASE SETUP
// =============================================================================
// call the packages we need
const express = require('express'); // call express
const app = express(); // define our app using express
const bodyParser = require('body-parser');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.set('json spaces', 2);
const port = process.env.PORT || 8e3; // set our port
// ROUTES FOR OUR API
// =============================================================================
const router = express.Router(); // get an instance of the express Router
let data = [{
  "produit": "ewe",
  "name": "Les Echos Weekend",
  "parution": [{
    "parution": "20160101",
    "folio": [{
      "page": 01,
      "status": "locked",
      "workflow": "bat"
    }, {
      "page": 02,
      "status": "locked",
      "workflow": "bat"
    }]
  }, {
    "parution": "20160102",
    "folio": [{
      "page": 01,
      "status": "locked",
      "workflow": "bat"
    }, {
      "page": 02,
      "status": "locked",
      "workflow": "bat"
    }]
  }]
}, {
  "produit": "sli",
  "name": "Serie Limitée",
  "parution": [{
    "parution": "20160101",
    "folio": [{
      "page": 01,
      "status": "locked",
      "workflow": "bat"
    }, {
      "page": 02,
      "status": "locked",
      "workflow": "bat"
    }]
  }, {
    "parution": "20160102",
    "folio": [{
      "page": 01,
      "status": "locked",
      "workflow": "bat"
    }, {
      "page": 02,
      "status": "locked",
      "workflow": "bat"
    }]
  }]
}];
let productIdx = product => {
  return new Promise((resolve, reject) => {
    if (require.resolve('mongoose')) reject('err : mongoose require ');
    resolve(data.map((el) => el.produit).indexOf(product));
  });
};
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
  // res.json({ message: 'Bienvenue sur l"api de pierre !' });
  res.redirect('https://www.youtube.com/watch?v=3Yfy_QIgpsc');
});
router.get('/produit/', (req, res) => {
  res.json(data);
});
router.get('/produit/:produit', (req, res) => {
  console.log(productIdx(req.params.produit));
  // var idx = data.map((el) => el.produit).indexOf(req.params.produit);
  productIdx(req.params.produit).then(result => {
    res.json(data[result]);
  }, err => {
    res.end();
  });
});
router.get('/produit/:produit/parution/', (req, res) => {
  var idx = data.map((el) => el.produit).indexOf(req.params.produit);
  // var idxparution= data[idxPro].map((el) => el.parution).indexOf(req.params.produit);
  res.json(data[idx].parution);
});
router.get('/produit/:produit/parution/:parution', (req, res) => {
  console.log(req.params);
  var idx = data.map((el) => el.produit).indexOf(req.params.produit);
  var idxparution = data[idx].parution.map((el) => el.parution).indexOf(req.params.parution);
  console.log(idxparution);
  res.json(data[idx].parution[idxparution]);
});
router.get('/produit/:produit/parution/:parution/folio', (req, res) => {
  console.log(req.params);
  var idx = data.map((el) => el.produit).indexOf(req.params.produit);
  var idxparution = data[idx].parution.map((el) => el.parution).indexOf(req.params.parution);
  console.log(idxparution);
  res.json(data[idx].parution[idxparution].folio);
});
router.get('/produit/:produit/parution/:parution/folio/:folio', (req, res) => {
  console.log(req.params);
  var idx = data.map((el) => el.produit).indexOf(req.params.produit);
  var idxparution = data[idx].parution.map((el) => el.parution).indexOf(req.params.parution);
  var idxFolio = data[idx].parution[idxparution].folio.map((el) => el.page).indexOf(Number(req.params.folio));
  console.log(idxFolio);
  res.json(data[idx].parution[idxparution].folio[idxFolio]);
});
router.get('/produit/:produit/parution/:parution/folio/:folio/status', (req, res) => {
  console.log(req.params);
  var idx = data.map((el) => el.produit).indexOf(req.params.produit);
  var idxparution = data[idx].parution.map((el) => el.parution).indexOf(req.params.parution);
  var idxFolio = data[idx].parution[idxparution].folio.map((el) => el.page).indexOf(Number(req.params.folio));
  console.log(idxFolio);
  res.json(data[idx].parution[idxparution].folio[idxFolio].status);
});
// more routes for our API will happen here
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
