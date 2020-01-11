var express = require("express");
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

module.exports = router;
