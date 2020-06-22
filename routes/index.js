var express = require("express");
var firebase = require("firebase");
var router = express.Router();

var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* GET home page. */
router.get("/", function (req, res) {
  res.render("pages/index", { action: "index", user: req.session });
});

// Get Started
router.get("/get-started", function (req, res) {
  res.render("pages/get-started", {
    error: "",
    action: "getstarted",
    user: req.session,
  });
});

// Make your Own logo
router.post("/start", function (req, res) {
  let userDesign = {
    id: "",
    userId: "",
    tagline: req.body.tagline,
    companyName: req.body.companyName,
    designType: "",
    designId: "",
    designUrl: "",
  };
  if (req.session.userId) {
    userDesign.userId = req.session.userId;
  }
  userDesign.id = firebase.database().ref().child("UserDesign").push().key;
  firebase
    .database()
    .ref()
    .child("UserDesign")
    .child(userDesign.id)
    .set(userDesign)
    .then((d) => {
      req.session.userDesignId = userDesign.id;
      res.redirect("/get-started");
    })
    .catch((e) => {
      res.render("pages/index", { action: "index", user: req.session });
    });
});

//Medical caps page
//get action
router.get("/caps", function (req, res) {
  firebase
    .database()
    .ref()
    .child("MedicalCaps")
    .orderByKey()
    .once("value")
    .then((d) => {
      res.render("pages/caps", { action: "caps", user: req.session, data: d });
    })
    .catch((e) => {
      res.render("pages/caps", { action: "caps", user: req.session, data: [] });
    });
});

//businesscard page
//get action
router.get("/businesscard", function (req, res) {
  firebase
    .database()
    .ref()
    .child("BusinessCards")
    .orderByKey()
    .once("value")
    .then((d) => {
      res.render("pages/businesscard", {
        action: "businesscard",
        user: req.session,
        data: d,
      });
    })
    .catch((e) => {
      res.render("pages/businesscard", {
        action: "businesscard",
        user: req.session,
        data: [],
      });
    });
});

//brochures page
//get action
router.get("/brochures", function (req, res) {
  firebase
    .database()
    .ref()
    .child("PamphletsAndBrochures")
    .orderByKey()
    .once("value")
    .then((d) => {
      res.render("pages/brochures", {
        action: "brochures",
        user: req.session,
        data: d,
      });
    })
    .catch((e) => {
      res.render("pages/brochures", {
        action: "brochures",
        user: req.session,
        data: [],
      });
    });
});

//t-shirt page
//get action
router.get("/t-shirt", function (req, res) {
  firebase
    .database()
    .ref()
    .child("TShirts")
    .orderByKey()
    .once("value")
    .then((d) => {
      res.render("pages/t-shirt", {
        action: "t-shirt",
        user: req.session,
        data: d,
      });
    })
    .catch((e) => {
      res.render("pages/t-shirt", {
        action: "t-shirt",
        user: req.session,
        data: [],
      });
    });
});

//logo page
//get action
router.get("/logo", function (req, res) {
  firebase
    .database()
    .ref()
    .child("Logos")
    .orderByKey()
    .once("value")
    .then((d) => {
      res.render("pages/logo", {
        error: "",
        action: "logo",
        user: req.session,
        data: d,
      });
    })
    .catch((e) => {
      res.render("pages/logo", {
        error: "",
        action: "logo",
        user: req.session,
        data: [],
      });
    });
});

router.get("/design", function (req, res) {
  firebase
    .database()
    .ref()
    .child(req.query.type)
    .child(req.query.id)
    .once("value")
    .then((data) => {
      if (req.session.userDesignId) {
        firebase
          .database()
          .ref()
          .child("UserDesign")
          .child(req.session.userDesignId)
          .once("value")
          .then((userDesign) => {
            let ud = {
              id: userDesign.val().id,
              designId: req.query.id,
              designType: req.query.type,
              userId: userDesign.val().userId,
              tagline: userDesign.val().tagline,
              companyName: userDesign.val().companyName,
              designUrl: userDesign.val().designUrl,
            };
            firebase
              .database()
              .ref()
              .child("UserDesign")
              .child(ud.id)
              .set(ud)
              .then((d) => {
                res.render("pages/design/finalDesign", {
                  design: data,
                  userDesign: ud,
                  user: req.session,
                });
              });
          });
      } else {
        let userDesign = {
          id: "",
          userId: "",
          tagline: "",
          companyName: "",
          designType: req.query.type,
          designId: req.query.id,
          designUrl: "",
        };
        if (req.session.userId) {
          userDesign.userId = req.session.userId;
        }
        userDesign.id = firebase
          .database()
          .ref()
          .child("UserDesign")
          .push().key;
        firebase
          .database()
          .ref()
          .child("UserDesign")
          .child(userDesign.id)
          .set(userDesign)
          .then((d) => {
            res.render("pages/design/finalDesign", {
              design: data,
              userDesign: userDesign,
              user: req.session,
            });
          });
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

// Gallery
router.get("/gallery", function (req, res) {
  res.render("pages/gallery", { action: "gallery", user: req.session });
});

// Email us post action
router.post("/emailUs", function (req, res) {
  let id = firebase.database().ref().child("Requests").push().key;
  let request = {
    id: id,
    name: req.body.name,
    email: req.body.email,
    text: req.body.text,
  };
  firebase
    .database()
    .ref()
    .child("Requests")
    .child(request.id)
    .set(request)
    .then((r) => {
      res.json(request.id);
    })
    .catch((e) => {
      res.json("-1");
    });
});

router.get("/logout", function (req, res) {
  firebase.auth().signOut();
  req.session.destroy(function (err) {
    if (err) {
      res.negotiate(err);
    }
    res.redirect("/");
  });
});

router.get("/chat", function (req, res) {
  res.render("pages/chat");
});

module.exports = router;
