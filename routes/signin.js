var express = require('express');
var router = express.Router();
var userController = require('../controllers/user')
/* GET home page. */
router.post('/',userController.signinUser)

module.exports = router;
