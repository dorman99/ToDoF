var express = require('express');
var router = express.Router();
var todoRouter =  require('../controllers/todo')
var auth   = require('../middlewares/auth')

router.post('/',auth.authUser,todoRouter.createTodo)
router.get('/user',auth.authUser,todoRouter.findMyTodo)
router.delete('/:id',auth.authUser,todoRouter.deleteTodo)
router.put('/:id',auth.authUser,todoRouter.editTodo)
router.put('/:id/completenation',auth.authUser,todoRouter.completenationTodo)
module.exports = router