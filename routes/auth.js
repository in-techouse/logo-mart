var express = require("express");
var firebase = require("firebase");
var router = express.Router();

// SignIn get action
router.get("/signin", function (req, res) {
  res.render("pages/auth/signin", {
    error: "",
    action: "signin",
    user: req.session,
  });
});

// SignIn post action
router.post("/signin", function (req, res) {
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.userEmail, req.body.userPassword)
    .then((user) => {
      var id = req.body.userEmail.replace("@", "-");
      id = id.replace(/\./g, "_");
      firebase
        .database()
        .ref()
        .child("Users")
        .child(id)
        .once("value")
        .then((data) => {
          if (
            data === null ||
            data === undefined ||
            data.val() === null ||
            data.val() === undefined
          ) {
            res.render("pages/auth/signin", {
              error: "Something went wrong",
              action: "signin",
              user: req.session,
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
    })
    .catch((error) => {
      res.render("pages/auth/signin", {
        error: error.message,
        action: "signin",
        user: req.session,
      });
    });
});

// SignUp get action
router.get("/signup", function (req, res) {
  res.render("pages/auth/signup", {
    error: "",
    action: "signup",
    user: req.session,
  });
});

// SignUp post action
router.post("/signup", function (req, res) {
  if (req.body.password !== req.body.passwordConfirmation) {
    res.render("pages/auth/signup", {
      error: "Password doesn't match",
      action: "signup",
      user: req.session,
    });
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(req.body.email, req.body.password)
      .then((u) => {
        var id = req.body.email.replace("@", "-");
        id = id.replace(/\./g, "_");
        let user = {
          id: id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          role: 0,
        };
        firebase
          .database()
          .ref()
          .child("Users")
          .child(id)
          .set(user)
          .then((d) => {
            req.session.userId = user.id;
            req.session.firstName = user.firstName;
            req.session.lastName = user.lastName;
            req.session.email = user.email;
            req.session.role = user.role;
            res.redirect("/");
          });
      })
      .catch((error) => {
        res.render("pages/auth/signup", {
          error: error.message,
          action: "signup",
          user: req.session,
        });
      });
  }
});

// Password Recovery get action
router.get("/recovery", function (req, res) {
  res.render("pages/auth/recovery", {
    error: "",
    action: "recovery",
    user: req.session,
  });
});

// Password Recovery post action
router.post("/recovery", function (req, res) {
  firebase
    .auth()
    .sendPasswordResetEmail(req.body.userEmail)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.render("pages/auth/recovery", {
        error: error.message,
        action: "recovery",
        user: req.session,
      });
    });
});

module.exports = router;
