const jwt=require("jsonwebtoken")

const jwtMiddleware=(req,res,next)=>{
    console.log("inside jwtMiddleware");
    // get the tokeb=n from the reqest
    let token=req.headers['authorization'].slice(7)
    console.log(token);
    // verify
    const jwtResponse=jwt.verify(token,process.env.JWT_Key)
    console.log(jwtResponse);
    req.payload=jwtResponse.userId
    next()
}

module.exports=jwtMiddleware