"use strict";
let getTest = [];
const productArr = ["/sli", "/ewe"];
const parutionArr = ["/20160101", "/20160102"];
const folioArr = ["/01", "/02"]
const oriPath = "/api";
const produitPath = "/produit";
const parutionPath = "/parution";
const folioPath = "/folio";
const statusPath = "/status";

function makeListing() {
  getTest.push(oriPath + produitPath);
  for (let a = 0; a < productArr.length; a++) {
    getTest.push(oriPath + produitPath + productArr[a]);
    for (let b = 0; b < parutionArr.length; b++) {
      getTest.push(oriPath + produitPath + productArr[a] + parutionPath);
      getTest.push(oriPath + produitPath + productArr[a] + parutionPath + parutionArr[b]);
      for (let c = 0; c < folioArr.length; c++) {
        getTest.push(oriPath + produitPath + productArr[a] + parutionPath + parutionArr[b] + folioPath);
        getTest.push(oriPath + produitPath + productArr[a] + parutionPath + parutionArr[b] + folioPath + folioArr[c]);
        getTest.push(oriPath + produitPath + productArr[a] + parutionPath + parutionArr[b] + folioPath + folioArr[c] + statusPath);
      }
    }
  }
}
makeListing();
// console.log(getTest);
// [ '/api/produit',
//   '/api/produit/sli',
//   '/api/produit/sli/parution',
//   '/api/produit/sli/parution/20160101',
//   '/api/produit/sli/parution/20160101/folio/01',
//   '/api/produit/sli/parution/20160101/folio/01/status',
//   '/api/produit/sli/parution/20160101/folio/02',
//   '/api/produit/sli/parution/20160101/folio/02/status',
//   '/api/produit/sli/parution',
//   '/api/produit/sli/parution/20160102',
//   '/api/produit/sli/parution/20160102/folio/01',
//   '/api/produit/sli/parution/20160102/folio/01/status',
//   '/api/produit/sli/parution/20160102/folio/02',
//   '/api/produit/sli/parution/20160102/folio/02/status',
//   '/api/produit/ewe',
//   '/api/produit/ewe/parution',
//   '/api/produit/ewe/parution/20160101',
//   '/api/produit/ewe/parution/20160101/folio/01',
//   '/api/produit/ewe/parution/20160101/folio/01/status',
//   '/api/produit/ewe/parution/20160101/folio/02',
//   '/api/produit/ewe/parution/20160101/folio/02/status',
//   '/api/produit/ewe/parution',
//   '/api/produit/ewe/parution/20160102',
//   '/api/produit/ewe/parution/20160102/folio/01',
//   '/api/produit/ewe/parution/20160102/folio/01/status',
//   '/api/produit/ewe/parution/20160102/folio/02',
//   '/api/produit/ewe/parution/20160102/folio/02/status' ]
module.exports = getTest;
