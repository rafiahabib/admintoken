const jwt=require('jsonwebtoken');
function authtoken(req,res,next){
   
    const authorization=req.headers.authorization;
    const token=authorization && authorization.split(' ')[1];
   if(token==null){
    return res.status(401).json({"message":"unauthorized"});
   }
   jwt.verify(token,"jsonweb12345",(err,data)=>{
    
    if(err)
        return res.status(401).json({message:"unauthorized"})
    req.user=data;
    console.log(data,"from jwt")
    next();
   })

   
}
module.exports=authtoken