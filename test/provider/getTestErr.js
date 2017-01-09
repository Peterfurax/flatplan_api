"use strict";
let apiList = [];
const errTest = ["/err"];
const productArr = ["/sli"];
const parutionArr = ["/20160101"];
const folioArr = ["/01"];
// const productArr = ["/sli", "/ewe"];
// const parutionArr = ["/20160101", "/20160102"];
// const folioArr = ["/01", "/02"];
const oriPath = "/api";
const produitPath = "/produit";
const parutionPath = "/parution";
const folioPath = "/folio";
const statusPath = "/status";
const alphaPath = oriPath + produitPath;

function makeListing() {
  // '/api/produit/ERR'
  apiList.push(oriPath + produitPath + errTest);
  for (let a = 0; a < productArr.length; a++) {
    for (let b = 0; b < parutionArr.length; b++) {
      // PARUTION
      // -----
      // '/api/produit/ERR/parution'
      apiList.push(alphaPath + errTest + parutionPath);
      // '/api/produit/sli/parution/ERR'
      apiList.push(alphaPath + productArr[a] + parutionPath + errTest);
      for (let c = 0; c < folioArr.length; c++) {
        // FOLIOS
        // -----
        // '/api/produit/sli/parution/ERR/folio'
        apiList.push(alphaPath + productArr[a] + parutionPath + errTest + folioPath);
        // PAGES
        // -----
        // '/api/produit/sli/parution/20160101/folio/ERR'
        apiList.push(alphaPath + productArr[a] + parutionPath + parutionArr[b] + folioPath + errTest);
      }
    }
  }
}
makeListing();
console.log(apiList);
// return example
// ----
// `[ '/api/produit/err',
//   '/api/produit/err/parution',
//   '/api/produit/sli/parution/err',
//   '/api/produit/sli/parution/err/folio',
//   '/api/produit/sli/parution/20160101/folio/err',
//   '/api/produit/err/parution/err/folio/01/status' ]`
module.exports = apiList;
