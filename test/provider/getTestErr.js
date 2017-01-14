// INIT FILE SETUP
// =============================================================================
// - use strict option
"use strict";
// init return array
let getTestErr = [];
// CONST DECLARATION
// =============================================================================
// Err path
const errTest = ["/err"];
// Define product array you want to test ["/sli", "/ewe",...]
const productArr = ["/sli"];
// Define parution array you want to test ["/20160101", "/20160102",...]
const parutionArr = ["/20160101"];
// Define folio array you want to test ["/01", "/02",...]
const folioArr = ["/01"];
// - Origin path
const oriPath = "/api";
// - Product path
const produitPath = "/produit";
// - Parution path
const parutionPath = "/parution";
// - Folio path
const folioPath = "/folio";
// - Status path
const statusPath = "/status";
// - Alpha path
const alphaPath = oriPath + produitPath;
// FUNCTION
// =============================================================================
/**
 * [return a array off 'path' to test]
 * @method makeListing
 * @return {Object}    ['stringPath',...]
 */
function makeListing() {
  // PRODUIT
  // -----
  // '/api/produit/ERR'
  getTestErr.push(oriPath + produitPath + errTest);
  for (let a = 0; a < productArr.length; a++) {
    // PARUTION
    // -----
    for (let b = 0; b < parutionArr.length; b++) {
      // '/api/produit/ERR/parution'
      getTestErr.push(alphaPath + errTest + parutionPath);
      // '/api/produit/sli/parution/ERR'
      getTestErr.push(alphaPath + productArr[a] + parutionPath + errTest);
      // FOLIOS
      // -----
      // '/api/produit/sli/parution/ERR/folio'
      for (let c = 0; c < folioArr.length; c++) {
        getTestErr.push(alphaPath + productArr[a] + parutionPath + errTest + folioPath);
        // PAGES
        // -----
        // '/api/produit/sli/parution/20160101/folio/ERR'
        getTestErr.push(alphaPath + productArr[a] + parutionPath + parutionArr[b] + folioPath + errTest);
      }
    }
  }
}
// RETURN
// =============================================================================
makeListing();
module.exports = getTestErr;
