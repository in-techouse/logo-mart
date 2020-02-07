var express = require("express");
var firebase = require("firebase");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
  if (req.session.role && req.session.role === 1) {
    res.render("admins/index", { action: "index", user: req.session });
  } else {
    res.redirect("/");
  }
});
router.get("/allLogos", function(req, res) {
  if (req.session.role && req.session.role === 1) {
    firebase
      .database()
      .ref()
      .child("Logos")
      .orderByKey()
      .once("value")
      .then(d => {
        res.render("admins/allLogos", {
          action: "allLogos",
          data: d,
          user: req.session
        });
      })
      .catch(e => {
        res.render("admins/allLogos", {
          action: "allLogos",
          data: [],
          user: req.session
        });
      });
  } else {
    res.redirect("/");
  }
});
router.get("/newLogo", function(req, res) {
  if (req.session.role && req.session.role === 1) {
    res.render("admins/newLogos", { action: "newLogos", user: req.session });
  } else {
    res.redirect("/");
  }
});
router.post("/newLogo", function(req, res) {
  if (req.session.role && req.session.role === 1) {
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
        res.render("admins/newLogos", {
          action: "newLogos",
          user: req.session
        });
      });
  } else {
    res.redirect("/");
  }
});
router.get("/allMedicalCaps", function(req, res) {
  if (req.session.role && req.session.role === 1) {
    firebase
      .database()
      .ref()
      .child("MedicalCaps")
      .orderByKey()
      .once("value")
      .then(d => {
        res.render("admins/allMedicalCaps", {
          action: "allMedicalCaps",
          data: d,
          user: req.session
        });
      })
      .catch(e => {
        res.render("admins/allMedicalCaps", {
          action: "allMedicalCaps",
          data: [],
          user: req.session
        });
      });
  } else {
    res.redirect("/");
  }
});

router.get("/newMedicalCap", function(req, res) {
  if (req.session.role && req.session.role === 1) {
    res.render("admins/newMedicalCaps", {
      action: "newMedicalCaps",
      user: req.session
    });
  } else {
    res.redirect("/");
  }
});
router.post("/newMedicalCaps", function(req, res) {
  if (req.session.role && req.session.role === 1) {
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
        res.render("admins/newMedicalCaps", {
          action: "newMedicalCaps",
          user: req.session
        });
      });
  } else {
    res.redirect("/");
  }
});
router.get("/allBusinessCards", function(req, res) {
  if (req.session.role && req.session.role === 1) {
    firebase
      .database()
      .ref()
      .child("BusinessCards")
      .orderByKey()
      .once("value")
      .then(d => {
        res.render("admins/allBusinessCard", {
          action: "allBusinessCards",
          data: d,
          user: req.session
        });
      })
      .catch(e => {
        res.render("admins/allBusinessCard", {
          action: "allBusinessCards",
          data: [],
          user: req.session
        });
      });
  } else {
    res.redirect("/");
  }
});

router.get("/newBusinessCard", function(req, res) {
  if (req.session.role && req.session.role === 1) {
    res.render("admins/newBusinesscard", {
      action: "newBusinessCard",
      user: req.session
    });
  } else {
    res.redirect("/");
  }
});
router.post("/newBusinessCard", function(req, res) {
  if (req.session.role && req.session.role === 1) {
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
        res.render("admins/newBusinessCard", {
          action: "newBusinessCard",
          user: req.session
        });
      });
  } else {
    res.redirect("/");
  }
});
router.get("/allBrochuresAndPamphlets", function(req, res) {
  if (req.session.role && req.session.role === 1) {
    firebase
      .database()
      .ref()
      .child("BrochuresAndPamphlets")
      .orderByKey()
      .once("value")
      .then(d => {
        res.render("admins/allBrochures&Pamphets", {
          action: "allBrochuresAndPamphlets",
          data: d,
          user: req.session
        });
      })
      .catch(e => {
        res.render("admins/allBrochures&Pamphets", {
          action: "allBrochuresAndPamphlets",
          data: [],
          user: req.session
        });
      });
  } else {
    res.redirect("/");
  }
});
router.get("/newBrochureAndPamphlet", function(req, res) {
  if (req.session.role && req.session.role === 1) {
    res.render("admins/newBrochures&Pamphlets", {
      action: "newBrochureAndPamphlet",
      user: req.session
    });
  } else {
    res.redirect("/");
  }
});
router.post("/newBrochureAndPamphlet", function(req, res) {
  if (req.session.role && req.session.role === 1) {
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
          action: "newBrochureAndPamphlet",
          user: req.session
        });
      });
  } else {
    res.redirect("/");
  }
});
router.get("/allTShirts", function(req, res) {
  if (req.session.role && req.session.role === 1) {
    firebase
      .database()
      .ref()
      .child("TShirts")
      .orderByKey()
      .once("value")
      .then(d => {
        res.render("admins/allT_Shirts", {
          action: "allTShirts",
          data: d,
          user: req.session
        });
      })
      .catch(e => {
        res.render("admins/allT_Shirts", {
          action: "allTShirts",
          data: [],
          user: req.session
        });
      });
  } else {
    res.redirect("/");
  }
});
router.get("/newTShirt", function(req, res) {
  if (req.session.role && req.session.role === 1) {
    res.render("admins/newT_Shirts", {
      action: "newTShirt",
      user: req.session
    });
  } else {
    res.redirect("/");
  }
});

router.post("/newTShirts", function(req, res) {
  if (req.session.role && req.session.role === 1) {
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
        res.render("admins/newT_Shirts", {
          action: "newTShirt",
          user: req.session
        });
      });
  } else {
    res.redirect("/");
  }
});

router.get("/requests", function(req, res) {
  if (req.session.role && req.session.role === 1) {
    //res.render("admins/Requests", { action: "requests", user: req.session });
      firebase
        .database()
        .ref()
        .child("Requests")
        .orderByKey()
        .once("value")
        .then(d => {
          res.render("admins/Requests", {
            action: "requests",
            data: d,
            user: req.session
          });
        })
        .catch(e => {
          res.render("admins/Requests", {
            action: "requests",
            data: [],
            user: req.session
          });
        });
    } 
  else {
    res.redirect("/");
  }
});

module.exports = router;
