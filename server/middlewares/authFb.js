var FB = require('fb'),
    fb = new FB.Facebook({
        version: 'v2.8'
    });

const fbAuth = (req, res, next) => {

        FB.setAccessToken(req.headers.accesstokenfb)
        next()


   

       
         
         

   
      
}

module.exports = {
    fbAuth
}
