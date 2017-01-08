"use strict";
// BASE SETUP
// =============================================================================
// - Call the packages we need
//  - DataJson
const dataFile = require('./data');
const data = dataFile;
// INIT LIB
// =============================================================================
const lib = [];
// FUNCTION
// =============================================================================
//     productIdx(productIdx, req);
// return Promise find index from `product:string`
/**
 * [productIdx description]
 * @method productIdx
 * @param  {string}   product [product]
 * @return {Promise}          [index product]
 */
lib.productIdx = product => {
  return new Promise((resolve, reject) => {
    const productIdx = data.map((el) => el.produit).indexOf(product);
    if (productIdx < 0) {
      reject("lib.productIdx() => Product index not found ");
    }
    resolve(productIdx);
  });
};
//     parutionIdx(productIdx, req);
// return Promise find req.params.parution index from `productIdx:number`
/**
 * [parutionIdx return index parution for index product]
 * @method parutionIdx
 * @param  {number}    productIdx [index product]
 * @param  {object}    req        [httprequest for inject0 req.params.parution]
 * @return {Promise}              [index parution]
 */
lib.parutionIdx = (productIdx, req) => {
  return new Promise((resolve, reject) => {
    const parutIdx = data[productIdx].parution.map((el) => el.parution).indexOf(req.params.parution);
    if (parutIdx < 0) {
      reject("lib.parutionIdx() => Parution index not found ");
    }
    resolve(parutIdx);
  });
};
//     folioIdx(productIdx,parutionIdx, req);
// return Promise find req.params.folio index from` `productIdx:number ` && `parutionIdx:number `
/**
 * [folioIdx description]
 * @method folioIdx
 * @param  {number} productIdx  [index product]
 * @param  {number} parutionIdx [index parution]
 * @param  {object} req         [httprequest req.params.folio ]
 * @return {Promise}            [index folio]
 */
lib.folioIdx = (productIdx, parutionIdx, req) => {
  return new Promise((resolve, reject) => {
    const folioIdx = data[productIdx].parution[parutionIdx].folio.map((el) => el.page).indexOf(req.params.folio);
    if (folioIdx < 0) {
      reject("lib.folioIdx() => folio index not found ");
    }
    resolve(folioIdx);
  });
};
// EXPORT LIB // DEBUG SUPPORT
// =============================================================================
module.exports = lib;
// if (require.resolve('mongoose')) reject('err : mongoose require ');
