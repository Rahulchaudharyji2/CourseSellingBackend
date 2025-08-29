const userJwtSecret=process.env.userJwtSecret;
const jwt=require("jsonwebtoken");
async function authUserMiddleware(req,res,next){
    const token = req.headers.token;
    const response= await jwt.verify(token,userJwtSecret)
    if(response){
        req.userId=token.userId
        next()
    }else{
        res.send("invalid Token")
    }
}
module.exports=authUserMiddleware