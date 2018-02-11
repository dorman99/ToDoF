var jwt = require('jsonwebtoken');

const authUser = (req,res,next)=>{

    let decoded = jwt.verify(req.headers.accesstokenjwt,process.env.dormanSECRET)
    console.log(decoded,'masuk')
    req.headers.userId = decoded.id
    if(decoded){
        next()
    }
    
}


module.exports = {
    authUser,
}   