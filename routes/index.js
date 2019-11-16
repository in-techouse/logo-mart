var express = require('express');
var firebase= require('firebase');
var router = express.Router();

var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
