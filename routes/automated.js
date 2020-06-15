var express = require("express");
var firebase = require("firebase");
var router = express.Router();

// Logo-Maker
router.get("/logo-maker", function (req, res) {
  res.render("pages/automated/logo-maker", {
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
router.post("/getStyle", function (req, res) {
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
      res.json("1");
    })
    .catch((e) => {
      res.redirect("/");
    });
});

module.exports = router;
