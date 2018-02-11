var jwt = require('jsonwebtoken');

const authUser = (req,res,next)=>{
    console.log(req.headers.accesstokenjwt,'ss')
    let decoded = jwt.verify(req.headers.accesstokenjwt,process.env.dormanSECRET)
   
    req.headers.userId = decoded.id
    if(decoded){
        console.log('masuk sini ga?asass')
        next()
    }
    
}


module.exports = {
    authUser,
}   