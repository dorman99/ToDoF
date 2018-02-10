var User  = require('../models/User')
var jwt = require('jsonwebtoken');

const signinUser = (req,res)=>{
   /**
    * fb api disini
    * dapet data json dari fb
    * cek email di database ada atau tidak
    * jika ada ... sign dengan jwt , lalu token dari jwt di send ke frontend
    * jika tidak ... create database mongoose
    *     - data hasil create , dimasukan jwt
    *     - baru send ke frontend
    */
    User.findOne({"email":req.body.email})
     .then(doc=>{
         if(doc){
             let payload = {
                 email: doc.email,
                 name: doc.name,
             }

             let token = jwt.sign(payload,process.env.dormanSECRET)
             res.status(200).send({message:"ini token kamu(user ada) ",data:token})  //ini data yang dikirim ke front end berupa token dari jwt
         }else{
             User.create({
                 name:req.body.name,
                 email:req.body.email
             }).then(userCreated=>{
                
                let docCreate = {
                    email: userCreated.email,
                    name: userCreated.name,
                }
                
                 let token = jwt.sign(docCreate,process.env.dormanSECRET)
                 res.status(200).send({message:"ini token kamu(user tidak ada) ",data:token}) //ini data yang dikirim ke front end berupa token dari jwt
             })
             .catch(err=>{
                 
                 res.status(500).send({message:'error sign in user tidak ada',err})
             })
         }
     })
     .catch(err=>{res.status(500).send({message:"error sign in find one",err})})
    
}



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
    findOneUser,
    signinUser
}