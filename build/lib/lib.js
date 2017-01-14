"use strict";
// BASE SETUP
// =============================================================================
// - Call the packages we need

var dataFile = require('../provider/data');
var data = dataFile;
// INIT LIB
// =============================================================================
var lib = [];
// FUNCTION
// =============================================================================
// productIdx
// ----------
//     productIdx(product);
// Return Promise find index from `product:string`
/**
 * [Return index product]
 * @method productIdx
 * @param  {string}   product [product]
 * @return {Promise}          [index product]
 */
lib.productIdx = function (product) {
  return new Promise(function (resolve, reject) {
    var productIdx = data.map(function (el) {
      return el.produit;
    }).indexOf(product);
    if (productIdx < 0) {
      reject("lib.productIdx() => Product index not found ");
    }
    resolve(productIdx);
  });
};
// parutionIdx
// ----------
//     parutionIdx(productIdx, req);
// Return Promise find req.params.parution index from `productIdx:number`
/**
 * [Return index parution for index product]
 * @method parutionIdx
 * @param  {number}    productIdx [index product]
 * @param  {object}    req        [httprequest for inject0 req.params.parution]
 * @return {Promise}              [index parution]
 */
lib.parutionIdx = function (productIdx, req) {
  return new Promise(function (resolve, reject) {
    var parutIdx = data[productIdx].parution.map(function (el) {
      return el.parution;
    }).indexOf(req.params.parution);
    if (parutIdx < 0) {
      reject("lib.parutionIdx() => Parution index not found ");
    }
    resolve(parutIdx);
  });
};
// folioIdx
// ----------
//     folioIdx(productIdx,parutionIdx, req);
// Return Promise find req.params.folio index from` `productIdx:number ` && `parutionIdx:number `
/**
 * [Return return index folio for index product & index parution]
 * @method folioIdx
 * @param  {number} productIdx  [index product]
 * @param  {number} parutionIdx [index parution]
 * @param  {object} req         [httprequest req.params.folio ]
 * @return {Promise}            [index folio]
 */
lib.folioIdx = function (productIdx, parutionIdx, req) {
  return new Promise(function (resolve, reject) {
    var folioIdx = data[productIdx].parution[parutionIdx].folio.map(function (el) {
      return el.page;
    }).indexOf(req.params.folio);
    if (folioIdx < 0) {
      reject("lib.folioIdx() => folio index not found ");
    }
    resolve(folioIdx);
  });
};
// productParution
// ----------
//     productParution(req);
// Return Promise `{ 'productIdx': productIdx, 'parutionIdx': parutionIdx }`
/**
 * [productParution return object with Product et Parution index]
 * @method productParution
 * @param  {object}        req [request]
 * @return {object}            [{ 'productIdx': productIdx, 'parutionIdx': parutionIdx }]
 */
lib.productParution = function (req) {
  return new Promise(function (resolve, reject) {
    lib.productIdx(req.params.produit).then(function (productIdx) {
      lib.parutionIdx(productIdx, req).then(function (parutionIdx) {
        resolve({ 'productIdx': productIdx, 'parutionIdx': parutionIdx });
      }).catch(function (err) {
        return reject(err);
      });
    }).catch(function (err) {
      return reject(err);
    });
  });
};
// productParutionFolio
// ----------
//     productParutionFolio(req);
// Return Promise `{ 'productIdx': productIdx, 'parutionIdx': parutionIdx, 'folioIdx': folioIdx }`
/**
 * [productParutionFolio return object with Product & Parution index & Folio index]
 * @method productParutionFolio
 * @param  {object}        req [request]
 * @return {object}            [{ 'productIdx': productIdx, 'parutionIdx': parutionIdx, 'folioIdx': folioIdx }]
 */
lib.productParutionFolio = function (req) {
  return new Promise(function (resolve, reject) {
    lib.productIdx(req.params.produit).then(function (productIdx) {
      lib.parutionIdx(productIdx, req).then(function (parutionIdx) {
        lib.folioIdx(productIdx, parutionIdx, req).then(function (folioIdx) {
          resolve({ 'productIdx': productIdx, 'parutionIdx': parutionIdx, 'folioIdx': folioIdx });
        }).catch(function (err) {
          return reject(err);
        });
      }).catch(function (err) {
        return reject(err);
      });
    }).catch(function (err) {
      return reject(err);
    });
  });
};
// EXPORT LIB // DEBUG SUPPORT
// =============================================================================
module.exports = lib;
// if (require.resolve('mongoose')) reject('err : mongoose require ');