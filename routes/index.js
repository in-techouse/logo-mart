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
  if (req.body.password !== req.body.passwordConfirmation) {
    res.render("pages/auth/signup", {
      error: "Password doesn't match",
      action: "signup"
    });
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(req.body.email, req.body.password)
      .then(u => {
        var id = req.body.email.replace("@", "-");
        id = id.replace(/\./g, "_");
        let user = {
          id: id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          role: 0
        };
        firebase
          .database()
          .ref()
          .child("Users")
          .child(id)
          .set(user)
          .then(d => {
            req.session.userId = user.id;
            req.session.firstName = user.firstName;
            req.session.lastName = user.lastName;
            req.session.email = user.email;
            req.session.role = user.role;
            res.redirect("/");
          });
      })
      .catch(error => {
        res.render("pages/auth/signup", {
          error: error.message,
          action: "signup"
        });
      });
  }
});

// SignIn get action
router.get("/signin", function(req, res) {
  res.render("pages/auth/signin", { error: "", action: "signin" });
});

// SignIn post action
router.post("/signin", function(req, res) {
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.userEmail, req.body.userPassword)
    .then(user => {
      var id = req.body.userEmail.replace("@", "-");
      id = id.replace(/\./g, "_");
      firebase
        .database()
        .ref()
        .child("Users")
        .child(id)
        .once("value")
        .then(data => {
          if (
            data === null ||
            data === undefined ||
            data.val() === null ||
            data.val() === undefined
          ) {
            res.render("pages/auth/signin", {
              error: "Something went wrong",
              action: "signin"
            });
          } else {
            req.session.userId = data.val().id;
            req.session.firstName = data.val().firstName;
            req.session.lastName = data.val().lastName;
            req.session.email = data.val().email;
            req.session.role = data.val().role;
            if (req.session.role === 0) {
              res.redirect("/");
            } else {
              res.redirect("/admins");
            }
          }
        });
      // res.json(user);
    })
    .catch(error => {
      res.render("pages/auth/signin", {
        error: error.message,
        action: "signin"
      });
    });
});
//Make your Own logo
//post action
router.post("/start", function(req, res) {
  res.json("1");
});
//Get Started
//get action
router.get("/get-started", function(req, res) {
  res.render("pages/get-started", { error: "", action: "getstarted" });
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
router.get("/facebookLogin", function(req, res) {
  let provider = new firebase.auth.FacebookAuthProvider();
  // provider.addScope("profile");
  // provider.addScope("https://www.googleapis.com/auth/drive");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});

router.get("/googleLogin", function(req, res) {
  // res.json("!");
  let provider = new firebase.auth.GoogleAuthProvider();
  // provider.addScope("profile");
  // provider.addScope("https://www.googleapis.com/auth/drive");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
  // var provider = new firebase.auth.GoogleAuthProvider();
  // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  // firebase.auth().signInWithRedirect(provider);
  // firebase
  //   .auth()
  //   .getRedirectResult()
  //   .then(result => {
  //     res.json(result);

  //     // if (result.credential) {
  //     //   // This gives you a Google Access Token. You can use it to access the Google API.
  //     //   var token = result.credential.accessToken;
  //     //   // ...
  //     // }
  //     // // The signed-in user info.
  //     // var user = result.user;
  //   })
  //   .catch(error => {
  //     res.json(error);

  //     // // Handle Errors here.
  //     // var errorCode = error.code;
  //     // var errorMessage = error.message;
  //     // // The email of the user's account used.
  //     // var email = error.email;
  //     // // The firebase.auth.AuthCredential type that was used.
  //     // var credential = error.credential;
  //     // // ...
  //   });
  // // firebase
  // //   .auth()
  // //   .signInWithRedirect(provider)
  // //   .then(result => {
  // //     res.json(result);
  // //   })
  // //   .catch(error => {
  // //     res.json(error);
  // //   });
});

// Email us post action
router.post("/emailUs", function(req, res) {
  res.json("1");
});

//Medical caps page
//get action
router.get("/caps", function(req, res) {
  // res.render("pages/caps", { error: "", action: "medicalcaps" });
  firebase
    .database()
    .ref()
    .child("MedicalCaps")
    .orderByKey()
    .once("value")
    .then(d => {
      res.render("pages/caps", { action: "caps", data: d });
    })
    .catch(e => {
      res.render("pages/caps", { action: "caps", data: [] });
    });
});

//businesscard page
//get action
router.get("/businesscard", function(req, res) {
  // res.render("pages/businesscard", { error: "", action: "businesscard" });
  firebase
    .database()
    .ref()
    .child("BusinessCards")
    .orderByKey()
    .once("value")
    .then(d => {
      res.render("pages/businesscard", { action: "businesscard", data: d });
    })
    .catch(e => {
      res.render("pages/businesscard", { action: "businesscard", data: [] });
    });
});

//brochures page
//get action
router.get("/brochures", function(req, res) {
  //res.render("pages/brochures", { error: "", action: "brochures" });
  firebase
    .database()
    .ref()
    .child("BrochuresAndPamphlets")
    .orderByKey()
    .once("value")
    .then(d => {
      res.render("pages/brochures", { action: "brochures", data: d });
    })
    .catch(e => {
      res.render("pages/brochures", { action: "brochures", data: [] });
    });
});

//t-shirt page
//get action
router.get("/t-shirt", function(req, res) {
  // res.render("pages/t-shirt", { error: "", action: "t-shirt" });
  firebase
    .database()
    .ref()
    .child("TShirts")
    .orderByKey()
    .once("value")
    .then(d => {
      res.render("pages/t-shirt", { action: "t-shirt", data: d });
    })
    .catch(e => {
      res.render("pages/t-shirt", { action: "t-shirt", data: [] });
    });
});

//logo page
//get action
router.get("/logo", function(req, res) {
  // res.render("pages/logo", { error: "", action: "logo" });
  // res.render("admins/index", { action: "index" });
  firebase
    .database()
    .ref()
    .child("Logos")
    .orderByKey()
    .once("value")
    .then(d => {
      res.render("pages/logo", { error: "", action: "logo", data: d });
    })
    .catch(e => {
      res.render("pages/logo", { error: "", action: "logo", data: [] });
    });
});

module.exports = router;
