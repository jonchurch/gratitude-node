var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res) {
    res.render('loginpage');
});


router.get('/profile', function(req, res) {
  res.render('profile');
});

router.get('/info', function(req, res) {
  res.render('info');
});

router.get('/sendRestForm', function(req, res) {
  res.render('resetemail');
});

router.get('/resetForm', function(req, res) {
  res.render('resetpassword');
});

router.get('/resetProfileForm', function(req, res) {
  res.render('profileresetpassword');
});
router.get('/resetAvatarForm', function(req, res) {
  res.render('profileresetavatar');
});

router.get('/account', function(req, res) {
    res.render('account');
});

router.get('/journal', function(req, res) {
    res.render('journal');
});

router.get('/support', function(req, res) {
    res.render('support');
});
router.get('/activate', function(req, res) {
    res.render('activate');
});
router.get('/activateAccount', function(req, res) {
    res.render('activated');
});
router.get('/register', function(req, res) {
    res.render('register');
});

router.get('/ajaxtest', function(req, res) {
  res.render('ajaxtest');
});



module.exports = router;
