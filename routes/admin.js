var express = require("express");
var firebase = require("firebase");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
  res.render("admins/index", { action: "index" });
});
router.get("/allLogos", function(req, res) {
  res.render("admins/allLogos", { action: "allLogos" });
});
router.get("/newLogo", function(req, res) {
  res.render("admins/newLogos", { action: "newLogos" });
});
router.post("/newLogo", function(req, res) {
  let id = firebase.database().ref().child('Logos').push().key;
  let logo = {
    id: id,
    designName: req.body.designName,
    designURL: req.body.designURL,
  };
  firebase.database().ref().child('Logos').child(logo.id).set(logo).then(r=>{
    res.redirect("/admins/allLogos");
  }).catch(e=>{
    res.render("admins/newLogos", { action: "newLogos" });
  });
});
router.get("/allMedicalCaps", function(req, res) {
  res.render("admins/allMedicalCaps", { action: "allMedicalCaps" });
});

router.get("/newMedicalCap", function(req, res) {
  res.render("admins/newMedicalCaps", { action: "newMedicalCaps" });
});
router.post("/newMedicalCaps", function(req, res) {
  let id = firebase.database().ref().child('MedicalCaps').push().key;
  let medicalcap = {
    id: id,
    designName: req.body.designName,
    designURL: req.body.designURL,
  };
  firebase.database().ref().child('MedicalCaps').child(medicalcap.id).set(medicalcap).then(r=>{
    res.redirect("/admins/allMedicalCaps");
  }).catch(e=>{
    res.render("admins/newMedicalCaps", { action: "newMedicalCaps" });
  });
});
router.get("/allBusinessCards", function(req, res) {
  res.render("admins/allBusinessCard", { action: "allBusinessCards" });
});
router.get("/newBusinessCard", function(req, res) {
  res.render("admins/newBusinesscard", { action: "newBusinessCard" });
});
router.get("/allBrochuresAndPamphlets", function(req, res) {
  res.render("admins/allBrochures&Pamphets", { action: "allBrochuresAndPamphlets" });
});
router.get("/newBrochureAndPamphlet", function(req, res) {
  res.render("admins/newBrochures&Pamphlets", { action: "newBrochureAndPamphlet" });
});
router.get("/allTShirts", function(req, res) {
  res.render("admins/allT_Shirts", { action: "allTShirts" });
});
router.get("/newTShirt", function(req, res) {
  res.render("admins/newT_Shirts", { action: "newTShirt" });
});

router.get("/requests", function(req, res) {
  res.render("admins/Requests", { action: "requests" });
});

module.exports = router;
