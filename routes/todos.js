var express = require('express');
var router = express.Router();
var todoRouter =  require('../controllers/todo')

router.post('/',todoRouter.createTodo)
router.get('/user',todoRouter.findMyTodo)
module.exports = router