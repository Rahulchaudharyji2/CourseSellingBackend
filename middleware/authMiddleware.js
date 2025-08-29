const jwtSecret= process.env.jwtSecret;
const jwt = require("jsonwebtoken")
 async function authMiddleware(req,res,next){
    const token = req.headers.token;
    const response=  await jwt.verify(token,jwtSecret)
    if(response){
        req.userId=token.userId
        next()
    }else{
        res.send("invalid Token")
    }
}
module.exports=authMiddleware