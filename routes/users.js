var express = require('express');
var router = express.Router();
var userController = require('../controllers/user')

router.get('/',userController.getUsers)
router.post('/',userController.createUser)
router.get('/:id',userController.findOneUser)


module.exports = router;
