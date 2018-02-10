const Todo = require('../models/Todos')

const createTodo = (req,res)=>{
    let objTodoAdd = {
        name : req.body.name,
        userId : req.headers.userid
    }
    Todo.create(objTodoAdd)
     .then(docCreated=>{
         res.status(200).send({message:'todo created ',data:docCreated})
     })
     .catch(err=>{res.status(500).send({
         message:'error create todo',
         err
     })})
}

const findMyTodo = (req,res)=>{
    Todo.find(
        {userId:req.headers.userid}
    ).populate('userId')
     .then(docs=>{
         res.status(200).send({message:'heres your todo list',data:docs})
     })
     .catch(err=>{res.status(500).send({message:'error find my todo',err})})
}

const editTodo = (req,res)=>{
    ß
}

module.exports = {
    createTodo,
    findMyTodo
}