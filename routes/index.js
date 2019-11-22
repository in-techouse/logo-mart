var express = require('express');
var firebase= require('firebase');
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
router.get('/', function(req, res) {
  res.render('index');
});

// SignUp get action
router.get('/signup', function(req, res) {
  res.render('signup' , {error: ""});
});

// SignUp post action
router.post('/signup', function(req, res) {
  res.json(req.body);
});

// SignIn get action
router.get('/signin', function(req, res) {
  res.render('signin', {error: ""});
});

// SignIn get action
router.post('/signin', function(req, res) {
  res.json(req.body);
});

// Password Recovery get action
router.get('/recovery', function(req, res) {
  res.render('recovery');
});

// Password Recovery get action
router.get('/recovery', function(req, res) {
  res.render('recovery');
});

module.exports = router;
