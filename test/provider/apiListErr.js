"use strict";
let apiList = [];
const errTest = ["/err"];
const productArr = ["/sli", "/ewe"];
const parutionArr = ["/20160101", "/20160102"];
const folioArr = ["/01", "/02"];
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
      //PARUTION
      // '/api/produit/ERR/parution'
      apiList.push(alphaPath + errTest + parutionPath);
      // '/api/produit/sli/parution/ERR'
      apiList.push(alphaPath + productArr[a] + parutionPath + errTest);
      // '/api/produit/ERR/parution/20160101'
      apiList.push(alphaPath + errTest + parutionPath + parutionArr[b]);
      // '/api/produit/ERR/parution/ERR'
      apiList.push(alphaPath + errTest + parutionPath + errTest);
      for (let c = 0; c < folioArr.length; c++) {
        //FOLIOS
        // '/api/produit/sli/parution/ERR/folio'
        apiList.push(alphaPath + productArr[a] + parutionPath + errTest + folioPath);
        // '/api/produit/ERR/parution/20160101/folio'
        apiList.push(alphaPath + errTest + parutionPath + parutionArr[b] + folioPath);
        // '/api/produit/ERR/parution/ERR/folio'
        apiList.push(alphaPath + errTest + parutionPath + errTest + folioPath);
        // PAGES
        // '/api/produit/sli/parution/20160101/folio/ERR'
        apiList.push(alphaPath + productArr[a] + parutionPath + parutionArr[b] + folioPath + errTest);
        // '/api/produit/ERR/parution/20160101/folio/ERR'
        apiList.push(alphaPath + errTest + parutionPath + parutionArr[b] + folioPath + errTest);
        // '/api/produit/ERR/parution/20160101/folio/01'
        apiList.push(alphaPath + errTest + parutionPath + parutionArr[b] + folioPath + folioArr[c]);
        // '/api/produit/sli/parution/ERR/folio/ERR'
        apiList.push(alphaPath + productArr[a] + parutionPath + errTest + folioPath + errTest);
        // '/api/produit/ERR/parution/ERR/folio/ERR'
        apiList.push(alphaPath + errTest + parutionPath + errTest + folioPath + errTest);
        // '/api/produit/sli/parution/ERR/folio/01'
        apiList.push(alphaPath + productArr[a] + parutionPath + errTest + folioPath + folioArr[c]);
        // '/api/produit/ERR/parution/ERR/folio/01'
        apiList.push(alphaPath + errTest + parutionPath + errTest + folioPath + folioArr[c]);
      }
    }
  }
}
makeListing();
module.exports = apiList;
