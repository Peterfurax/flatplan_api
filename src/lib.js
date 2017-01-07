"use strict";
// JSLINT OPTION
// =============================================================================
/*jslint node: true */
/*jshint esversion: 6 */
// BASE SETUP
// =============================================================================
// - Call the packages we need
//  - DataJson
const dataFile = require('../src/data');
const data = dataFile;
// INIT LIB
// =============================================================================
let lib = [];
// FUNCTION
// =============================================================================
// - productIdx(product);
//  - return index of product
/**
 * [productIdx return index of product]
 * @method productIdx
 * @param  {[string]}   product [name product]
 * @return {[Promise]}          [index product]
 */
lib.productIdx = product => {
  return new Promise((resolve, reject) => {
    let productIdx = data.map((el) => el.produit).indexOf(product);
    if (productIdx < 0) reject("lib.productIdx() => Product index not found ");
    resolve(productIdx);
  });
};
// - parutionIdx(productIdx, req);
//  - return index parution for index product
/**
 * [parutionIdx return index parution for index product]
 * @method parutionIdx
 * @param  {[string]}    productIdx [index product]
 * @param  {[object]}    req        [httprequest]
 * @return {[Promise]}              [index parution]
 */
lib.parutionIdx = (productIdx, req) => {
  return new Promise((resolve, reject) => {
    let parutIdx = data[productIdx].parution.map((el) => el.parution).indexOf(req.params.parution);
    if (parutIdx < 0) reject("lib.parutionIdx() => Parution index not found ");
    resolve(parutIdx);
  });
};
// EXPORT LIB // DEBUG SUPPORT
// =============================================================================
module.exports = lib;
// if (require.resolve('mongoose')) reject('err : mongoose require ');
