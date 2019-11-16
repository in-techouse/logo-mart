var express = require('express');
var firebase= require('firebase');
var router = express.Router();

var firebaseConfig = {
  apiKey: "AIzaSyB-oh_jVJatT5kMBk2NYb7wZ15CRLQ7BDo",
  authDomain: "logo-mart.firebaseapp.com",
  databaseURL: "https://logo-mart.firebaseio.com",
  projectId: "logo-mart",
  storageBucket: "logo-mart.appspot.com",
  messagingSenderId: "654640285591",
  appId: "1:654640285591:web:9dceebf9d27f8ec999a6d2",
  measurementId: "G-VPBLGZ4WQC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
