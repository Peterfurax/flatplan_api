'use strict';

/*jslint node: true */
/*jshint esversion: 6 */
// BASE SETUP
// =============================================================================
// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('json spaces', 2);
var port = process.env.PORT || 8e3; // set our port
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router
var data = [{
    "produit": "ewe",
    "name": "Les Echos Weekend",
    "parution": [{
        "parution": "20160101",
        "folio": [{
            "page": "01",
            "status": "locked",
            "workflow": "bat"
        }, {
            "page": "02",
            "status": "locked",
            "workflow": "bat"
        }]
    }, {
        "parution": "20160102",
        "folio": [{
            "page": "01",
            "status": "locked",
            "workflow": "bat"
        }, {
            "page": "02",
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
            "page": "01",
            "status": "locked",
            "workflow": "bat"
        }, {
            "page": "02",
            "status": "locked",
            "workflow": "bat"
        }]
    }, {
        "parution": "20160102",
        "folio": [{
            "page": "01",
            "status": "locked",
            "workflow": "bat"
        }, {
            "page": "02",
            "status": "locked",
            "workflow": "bat"
        }]
    }]
}];
var productIdx = function productIdx(product) {
    return new Promise(function (resolve, reject) {
        // if (require.resolve('mongoose')) reject('err : mongoose require ');
        var idx = data.map(function (el) {
            return el.produit;
        }).indexOf(product);
        if (idx > 0) {
            resolve(idx);
        } else {
            reject(idx);
        }
    });
};
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({
        message: 'Welcome on flatplan_api !'
    });
    // res.redirect('https://www.youtube.com/watch?v=3Yfy_QIgpsc');
});
router.get('/produit/', function (req, res) {
    res.json(data);
});
router.get('/produit/:produit', function (req, res) {
    console.log(productIdx(req.params.produit));
    // var idx = data.map((el) => el.produit).indexOf(req.params.produit);
    productIdx(req.params.produit).then(function (result) {
        res.json(data[result]);
    }, function (err) {
        res.end();
    }).catch(function (err) {});
});
router.get('/produit/:produit/parution/', function (req, res) {
    var idx = data.map(function (el) {
        return el.produit;
    }).indexOf(req.params.produit);
    // var idxparution= data[idxPro].map((el) => el.parution).indexOf(req.params.produit);
    res.json(data[idx].parution);
});
router.get('/produit/:produit/parution/:parution', function (req, res) {
    console.log(req.params);
    var idx = data.map(function (el) {
        return el.produit;
    }).indexOf(req.params.produit);
    var idxparution = data[idx].parution.map(function (el) {
        return el.parution;
    }).indexOf(req.params.parution);
    console.log(idxparution);
    res.json(data[idx].parution[idxparution]);
});
router.get('/produit/:produit/parution/:parution/folio', function (req, res) {
    console.log(req.params);
    var idx = data.map(function (el) {
        return el.produit;
    }).indexOf(req.params.produit);
    var idxparution = data[idx].parution.map(function (el) {
        return el.parution;
    }).indexOf(req.params.parution);
    console.log(idxparution);
    res.json(data[idx].parution[idxparution].folio);
});
router.get('/produit/:produit/parution/:parution/folio/:folio', function (req, res) {
    console.log(req.params);
    var idx = data.map(function (el) {
        return el.produit;
    }).indexOf(req.params.produit);
    var idxparution = data[idx].parution.map(function (el) {
        return el.parution;
    }).indexOf(req.params.parution);
    var idxFolio = data[idx].parution[idxparution].folio.map(function (el) {
        return el.page;
    }).indexOf(Number(req.params.folio));
    console.log(idxFolio);
    res.json(data[idx].parution[idxparution].folio[idxFolio]);
});
router.get('/produit/:produit/parution/:parution/folio/:folio/status', function (req, res) {
    console.log(req.params);
    var idx = data.map(function (el) {
        return el.produit;
    }).indexOf(req.params.produit);
    var idxparution = data[idx].parution.map(function (el) {
        return el.parution;
    }).indexOf(req.params.parution);
    var idxFolio = data[idx].parution[idxparution].folio.map(function (el) {
        return el.page;
    }).indexOf(Number(req.params.folio));
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
// for debug support
module.exports = app;
