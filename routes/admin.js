var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
    res.render("admins/index", { action: "index" });
  });
  router.get("/allLogos", function(req, res) {
    res.render("admins/allLogos", { action: "index" });
  });
  router.get("/newLogos", function(req, res) {
    res.render("admins/newLogos", { action: "index" });
  });
  router.get("/allMedicalCaps", function(req, res) {
    res.render("admins/allMecalCaps", { action: "index" });
  });
  router.get("/newMedicalCaps", function(req, res) {
    res.render("admins/newMedicalCaps", { action: "index" });
  });
  router.get("/allBusinessCard", function(req, res) {
    res.render("admins/allBusinessCard", { action: "index" });
  });
  router.get("/newBusinessCard", function(req, res) {
    res.render("admins/newBusinesscard", { action: "index" });
  });
  router.get("/allBrochures&Pamphlets", function(req, res) {
    res.render("admins/newBrochures&Pamphlets", { action: "index" });
  });
  router.get("/allT_Shirts", function(req, res) {
    res.render("admins/newT_Shirts", { action: "index" });
  });

  module.exports = router;