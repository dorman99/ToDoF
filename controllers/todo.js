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

const deleteTodo = (req,res)=>{
    Todo.remove({"_id":req.params.id})
     .then(doc=>{res.status(200).send({message:'todo has been deleted ',doc})})
     .catch(err=>{res.status(500).send({message:'error delete todo',err})})
}


const editTodo = (req,res)=>{
    Todo.findById(req.params.id)
     .then(doc=>{
         doc.name = req.body.name;
         doc.save()
          .then(result=>{
              res.status(200).send({message:'data updated',data:result})
          })
          .catch(err=>{res.status(500).send({message:'error save edit',err})})
     })
     .catch(err=>{res.status(500).send({message:'error findbyid edit todo',err})})
}

const completenationTodo = (req,res)=>{
  
    Todo.findById(req.params.id)
     .then(doc=>{
         doc.status = !doc.status;
         doc.save()
          .then(result=>{
              res.status(200).send({message:'todo completed',data:result})
          })
          .catch(err=>{res.status(500).send({message:'error save completed todo',err})})
     })
     .catch(err=>{res.status(500).send({message:'error findbyid completed todo',err})})
}

module.exports = {
    createTodo,
    findMyTodo,
    deleteTodo,
    editTodo,
    completenationTodo
}