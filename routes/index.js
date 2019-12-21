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
  measurementId: process.env.MEASUREMENT_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* GET home page. */
router.get("/", function(req, res) {
  res.render("pages/index", { action: "index" });
});

/* GET gallery page. */
router.get("/gallery", function(req, res) {
  res.render("pages/gallery", { action: "index" });
});

// SignUp get action
router.get("/signup", function(req, res) {
  res.render("pages/auth/signup", { error: "", action: "signup" });
});

// SignUp post action
router.post("/signup", function(req, res) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.render("pages/auth/signup", {
        error: error.message,
        action: "signup"
      });
    });
});

// SignIn get action
router.get("/signin", function(req, res) {
  res.render("pages/auth/signin", { error: "", action: "signin" });
});

// SignIn get action
router.post("/signin", function(req, res) {
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.userEmail, req.body.userPassword)
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.render("pages/auth/signin", {
        error: error.message,
        action: "signin"
      });
    });
});

// Password Recovery get action
router.get("/recovery", function(req, res) {
  res.render("pages/auth/recovery", { error: "", action: "recovery" });
});

// Password Recovery post action
router.post("/recovery", function(req, res) {
  firebase
    .auth()
    .sendPasswordResetEmail(req.body.userEmail)
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.render("pages/auth/recovery", {
        error: error.message,
        action: "recovery"
      });
    });
});

module.exports = router;
