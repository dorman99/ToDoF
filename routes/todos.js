var express = require('express');
var router = express.Router();
var todoRouter =  require('../controllers/todo')

router.post('/',todoRouter.createTodo)
router.get('/user',todoRouter.findMyTodo)
router.delete('/:id',todoRouter.deleteTodo)
router.put('/:id',todoRouter.editTodo)
router.put('/:id/completed',todoRouter.completedTodo)
router.put('/:id/uncompleted',todoRouter.uncompletedTodo)
module.exports = router