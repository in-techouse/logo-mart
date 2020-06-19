var express = require("express");
var firebase = require("firebase");
var router = express.Router();

// Logo-Maker
router.get("/", function (req, res) {
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

// Get Style
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
      res.redirect("/automated/selectDesign");
    })
    .catch((e) => {
      res.redirect("/");
    });
});

// Get Name
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
module.exports = router;
