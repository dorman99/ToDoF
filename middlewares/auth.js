var jwt = require('jsonwebtoken');

const authUser = (req,res,next)=>{

    let decoded = jwt.verify(req.headers.token,process.env.dormanSECRET)

    if(decoded){
        next()
    }
    
}


module.exports = {
    authUser,
}   