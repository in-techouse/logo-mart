var express = require("express");
var firebase = require("firebase");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
  res.render("admins/index", { action: "index" });
});
router.get("/allLogos", function(req, res) {
  res.render("admins/allLogos", { action: "index" });
});
router.get("/newLogo", function(req, res) {
  res.render("admins/newLogos", { action: "index" });
});
router.post("/newLogo", function(req, res) {
  let id = firebase.database().ref().child('Logos').push().key;
  let logo = {
    id,
    designName: req.body.designName,
    designURL: req.body.designURL,
  };
  firebase.database().ref().child('Logos').child(logo.id).set(logo).then(r=>{
    res.json("1");
  }).catch(e=>{
    res.json("-1");
  });
});
router.get("/allMedicalCaps", function(req, res) {
  res.render("admins/allMedicalCaps", { action: "index" });
});
router.get("/newMedicalCap", function(req, res) {
  res.render("admins/newMedicalCaps", { action: "index" });
});
router.get("/allBusinessCards", function(req, res) {
  res.render("admins/allBusinessCard", { action: "index" });
});
router.get("/newBusinessCard", function(req, res) {
  res.render("admins/newBusinesscard", { action: "index" });
});
router.get("/allBrochuresAndPamphlets", function(req, res) {
  res.render("admins/allBrochures&Pamphets", { action: "index" });
});
router.get("/newBrochureAndPamphlet", function(req, res) {
  res.render("admins/newBrochures&Pamphlets", { action: "index" });
});
router.get("/allTShirts", function(req, res) {
  res.render("admins/allT_Shirts", { action: "index" });
});
router.get("/newTShirt", function(req, res) {
  res.render("admins/newT_Shirts", { action: "index" });
});

router.get("/Requests", function(req, res) {
  res.render("admins/Requests", { action: "index" });
});

module.exports = router;
