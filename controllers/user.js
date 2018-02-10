var User  = require('../models/User')
const getUsers = (req,res)=>{

    User.find()
     .then(docs=>{res.status(200).send({message:'users doc: ',docs})})
     .catch(err=>{res.status(500).send('error get user')})
}

const createUser= (req,res)=>{
    
    let objAdd = {
        name: req.body.name,
        email : req.body.email,
        gender : req.body.genderß
    }
    
    User.find({email:objAdd.email})
     .then(doc=>{
         if(doc.length !== 0)res.status(200).send({message:'user already registered ',doc})
         else {
            User.create(objAdd)
            .then(docCreated=>{res.status(200).json({message:'user created : ',docCreated})})
            .catch(err=>{res.status(500).send('error created')})      
         }
     })
     .catch(err=>{res.status(500).send({message:'error from create user',err})})
}

const findOneUser = (req,res)=>{
    
    User.findById(req.params.id)
     .then(doc=>{res.send(doc)})
     .catch(err=>{res.send('error dari find')})
}

module.exports = {
    getUsers,
    createUser,
    findOneUser
}