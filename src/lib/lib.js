"use strict";
// BASE SETUP
// =============================================================================
// - Call the packages we need
const dataFile = require('../provider/data');
const data = dataFile;
// INIT LIB
// =============================================================================
const lib = [];
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
lib.productIdx = product => {
  return new Promise((resolve, reject) => {
    const productIdx = data.map((el) => el.produit)
      .indexOf(product);
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
lib.parutionIdx = (productIdx, req) => {
  return new Promise((resolve, reject) => {
    const parutIdx = data[productIdx].parution.map((el) => el.parution)
      .indexOf(req.params.parution);
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
lib.folioIdx = (productIdx, parutionIdx, req) => {
  return new Promise((resolve, reject) => {
    const folioIdx = data[productIdx].parution[parutionIdx].folio.map((el) => el.page)
      .indexOf(req.params.folio);
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
lib.productParution = (req) => {
  return new Promise((resolve, reject) => {
    lib.productIdx(req.params.produit)
      .then(productIdx => {
        lib.parutionIdx(productIdx, req)
          .then(parutionIdx => {
            resolve({ 'productIdx': productIdx, 'parutionIdx': parutionIdx });
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
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
lib.productParutionFolio = (req) => {
  return new Promise((resolve, reject) => {
    lib.productIdx(req.params.produit)
      .then(productIdx => {
        lib.parutionIdx(productIdx, req)
          .then(parutionIdx => {
            lib.folioIdx(productIdx, parutionIdx, req)
              .then(folioIdx => {
                resolve({ 'productIdx': productIdx, 'parutionIdx': parutionIdx, 'folioIdx': folioIdx });
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
};
// EXPORT LIB // DEBUG SUPPORT
// =============================================================================
module.exports = lib;
// if (require.resolve('mongoose')) reject('err : mongoose require ');
