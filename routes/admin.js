var express = require("express");
var firebase = require("firebase");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
  res.render("admins/index", { action: "index" });
});
router.get("/allLogos", function(req, res) {
  firebase
    .database()
    .ref()
    .child("Logos")
    .orderByKey()
    .once("value")
    .then(d => {
      res.render("admins/allLogos", { action: "allLogos", data: d });
    })
    .catch(e => {
      res.render("admins/allLogos", { action: "allLogos", data: [] });
    });
});
router.get("/newLogo", function(req, res) {
  res.render("admins/newLogos", { action: "newLogos" });
});
router.post("/newLogo", function(req, res) {
  let id = firebase
    .database()
    .ref()
    .child("Logos")
    .push().key;
  let logo = {
    id: id,
    designName: req.body.designName,
    designURL: req.body.designURL
  };
  firebase
    .database()
    .ref()
    .child("Logos")
    .child(logo.id)
    .set(logo)
    .then(r => {
      res.redirect("/admins/allLogos");
    })
    .catch(e => {
      res.render("admins/newLogos", { action: "newLogos" });
    });
});
router.get("/allMedicalCaps", function(req, res) {
  firebase
    .database()
    .ref()
    .child("MedicalCaps")
    .orderByKey()
    .once("value")
    .then(d => {
      res.render("admins/allMedicalCaps", {
        action: "allMedicalCaps",
        data: d
      });
    })
    .catch(e => {
      res.render("admins/allMedicalCaps", {
        action: "allMedicalCaps",
        data: []
      });
    });
});

router.get("/newMedicalCap", function(req, res) {
  res.render("admins/newMedicalCaps", { action: "newMedicalCaps" });
});
router.post("/newMedicalCaps", function(req, res) {
  let id = firebase
    .database()
    .ref()
    .child("MedicalCaps")
    .push().key;
  let medicalcap = {
    id: id,
    designName: req.body.designName,
    designURL: req.body.designURL
  };
  firebase
    .database()
    .ref()
    .child("MedicalCaps")
    .child(medicalcap.id)
    .set(medicalcap)
    .then(r => {
      res.redirect("/admins/allMedicalCaps");
    })
    .catch(e => {
      res.render("admins/newMedicalCaps", { action: "newMedicalCaps" });
    });
});
router.get("/allBusinessCards", function(req, res) {
  firebase
    .database()
    .ref()
    .child("BusinessCards")
    .orderByKey()
    .once("value")
    .then(d => {
      res.render("admins/allBusinessCard", {
        action: "allBusinessCards",
        data: d
      });
    })
    .catch(e => {
      res.render("admins/allBusinessCard", {
        action: "allBusinessCards",
        data: []
      });
    });
});

router.get("/newBusinessCard", function(req, res) {
  res.render("admins/newBusinesscard", { action: "newBusinessCard" });
});
router.post("/newBusinessCard", function(req, res) {
  let id = firebase
    .database()
    .ref()
    .child("BusinessCards")
    .push().key;
  let businesscard = {
    id: id,
    designName: req.body.designName,
    designURL: req.body.designURL
  };
  firebase
    .database()
    .ref()
    .child("BusinessCards")
    .child(businesscard.id)
    .set(businesscard)
    .then(r => {
      res.redirect("/admins/allBusinessCards");
    })
    .catch(e => {
      res.render("admins/newBusinessCard", { action: "newBusinessCard" });
    });
});
router.get("/allBrochuresAndPamphlets", function(req, res) {
  firebase
    .database()
    .ref()
    .child("PamphletsAndBrochures")
    .orderByKey()
    .once("value")
    .then(d => {
      res.render("admins/allBrochures&Pamphets", {
        action: "allBrochuresAndPamphlets",
        data: d
      });
    })
    .catch(e => {
      res.render("admins/allBrochures&Pamphets", {
        action: "allBrochuresAndPamphlets",
        data: []
      });
    });
});
router.get("/newBrochureAndPamphlet", function(req, res) {
  res.render("admins/newBrochures&Pamphlets", {
    action: "newBrochureAndPamphlet"
  });
});
router.post("/newBrochureAndPamphlet", function(req, res) {
  let id = firebase
    .database()
    .ref()
    .child("PamphletsAndBrochures")
    .push().key;
  let pamphlet = {
    id: id,
    designName: req.body.designName,
    designURL: req.body.designURL
  };
  firebase
    .database()
    .ref()
    .child("PamphletsAndBrochures")
    .child(pamphlet.id)
    .set(pamphlet)
    .then(r => {
      res.redirect("/admins/allBrochuresAndPamphlets");
    })
    .catch(e => {
      res.render("admins/newBrochures&Pamphlets", {
        action: "newBrochureAndPamphlet"
      });
    });
});
router.get("/allTShirts", function(req, res) {
  firebase
    .database()
    .ref()
    .child("TShirts")
    .orderByKey()
    .once("value")
    .then(d => {
      res.render("admins/allT_Shirts", { action: "allTShirts", data: d });
    })
    .catch(e => {
      res.render("admins/allT_Shirts", { action: "allTShirts", data: [] });
    });
});
router.get("/newTShirt", function(req, res) {
  res.render("admins/newT_Shirts", { action: "newTShirt" });
});

router.post("/newTShirts", function(req, res) {
  let id = firebase
    .database()
    .ref()
    .child("TShirts")
    .push().key;
  let T_Shirt = {
    id: id,
    designName: req.body.designName,
    designURL: req.body.designURL
  };
  firebase
    .database()
    .ref()
    .child("TShirts")
    .child(T_Shirt.id)
    .set(T_Shirt)
    .then(r => {
      res.redirect("/admins/allTShirts");
    })
    .catch(e => {
      res.render("admins/newT_Shirts", { action: "newTShirt" });
    });
});

router.get("/requests", function(req, res) {
  res.render("admins/Requests", { action: "requests" });
});

module.exports = router;
