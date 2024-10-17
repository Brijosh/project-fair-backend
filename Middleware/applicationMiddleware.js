const applicationMiddleware=(req,res,next)=>{
    console.log("inside the application middleware");
    next()
}
module.exports=applicationMiddleware;