var express = require("express");
var firebase = require("firebase");
var router = express.Router();

// Automated Index
router.get("/", function (req, res) {
  req.session.userDesignId = null;
  res.render("pages/automated/automatedDesign", {
    error: "",
    action: "logo-maker",
    user: req.session,
  });
});

// Get Name
router.get("/getName", function (req, res) {
  res.render("pages/automated/getName", {
    type: req.query.type,
    action: "getName",
    user: req.session,
  });
});

// Post get name
router.post("/getName", function (req, res) {
  let userId = req.session.userId ? req.session.userId : "";
  let ud = {
    id: "",
    designId: "",
    designType: req.body.type,
    userId: userId,
    tagline: req.body.tagline,
    companyName: req.body.companyName,
    designUrl: "",
  };
  ud.id = firebase.database().ref().child("UserDesign").push().key;
  firebase
    .database()
    .ref()
    .child("UserDesign")
    .child(ud.id)
    .set(ud)
    .then((d) => {
      req.session.userDesign = ud;
      req.session.userDesignId = ud.id;
      res.redirect("/automated/selectDesign");
    })
    .catch((e) => {
      res.redirect("/");
    });
});

// Get Select Design
router.get("/selectDesign", function (req, res) {
  firebase
    .database()
    .ref()
    .child(req.session.userDesign.designType)
    .orderByKey()
    .once("value")
    .then((d) => {
      res.render("pages/automated/selectDesign", {
        action: "selectDesign",
        user: req.session,
        designs: d,
      });
    })
    .catch((e) => {
      res.render("pages/automated/selectDesign", {
        action: "selectDesign",
        user: req.session,
        designs: [],
      });
    });
});

// Get Select Colors
router.get("/selectColors", function (req, res) {
  res.render("pages/automated/selectColors", {
    action: "selectColors",
    user: req.session,
  });
});

// Get Select Colors
router.get("/selectTextStyle", function (req, res) {
  res.render("pages/automated/selectTextStyle", {
    action: "selectTextStyle",
    user: req.session,
  });
});

// Get Select Colors
router.get("/makeDesign", function (req, res) {
  res.redirect("/design");
});

module.exports = router;
