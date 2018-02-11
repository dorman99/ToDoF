var express = require('express');
var router = express.Router();
var userController = require('../controllers/user')
var authFacebook   = require('../middlewares/authFb')
/* GET home page. */
router.post('/',authFacebook.fbAuth,userController.signinUser)

module.exports = router;
