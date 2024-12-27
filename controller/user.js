const User=require('../model/user')
const bcrypt=require('bcrypt')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const register = async(req,res)=>{

   try{ 
    const user = new User(req.body);
   
    const salt=await bcrypt.genSalt(10);
    const hashpass =await bcrypt.hash( req.body.password,salt);
    user.password=hashpass;
    await user.save();
    res.json({"message":"user added",user})
    }catch(err){
        console.error(err)
        res.status(500).json({"message":"internal server error"})
    }
}

const getallusers=async (req,res)=>{
  try{
    console.log(req.user,"useer from tolek")
    const user=await User.findById(req.user.id);
    if(user.role!=='admin'){
      return res.status(403).json({"message":"access only for admin"});

    }
    const users=await User.find();
    res.status(200).json({"message":"successfully displayed all users",users:users});

  }
  catch(err){
    console.error(err)
    res.status(500).json({"message":"internal server error"})
}
}

const getSingleuser = async(req,res)=>{
    try{
    const id = req.params.id;
    const user = await User.findById(id)
    res.json({"message":"user get successfully",user})}
    catch(err){
        console.error(err)
        res.status(500).json({"message":"internal server error"})
    }
    }

const updateuser=async(req,res)=>{
    try{
    const id=req.params.id
    const object=req.body
    const user= await User.findByIdAndUpdate(id, object,{new:true});
    res.json({"message":"update succesfully",user})}
    catch(err){
        console.error(err)
        res.status(500).json({"message":"internal server error"})
    }
}
const deleteuser=async(req,res)=>{  
  try{
    const id=req.params.id
    const user= await User.findByIdAndDelete(id)
    
    console.log("deleted")
    res.json({"message":"delete successfully",user})}
    catch(err){
        console.error(err)
        res.status(500).json({"message":"internal server error"})
    }
}

const login = async (req, res) => {
    try {
    
      const user = await User.findOne({ email: req.body.email });
   console.log(user)
      if (user) {
      const validate = await bcrypt.compare(req.body.password, user.password);
     
      if (validate) {
        //jwt.verify
        const token=await jwt.sign({userId:user._id,email:user.email},process.env.JWT_KEY)
       
        res.json({ message: "Login successfully",token:token });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }}
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  





module.exports={
    login,
    register,
    getallusers,
    getSingleuser,
    updateuser,
    deleteuser
}
