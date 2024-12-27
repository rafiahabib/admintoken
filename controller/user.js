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
const deleteuser = async (req, res) => {
  try {
     
      if (!req.user || req.user.role !== 'admin') {
          return res.status(403).json({ message: "access only for admin" });
      }
      const id = req.params.id;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
          return res.status(404).json({ message: "User not found." });
      }
      console.log("User deleted:", user);
      res.json({ message: "User deleted successfully.", user });
  } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ message: "Internal server error." });
  }
};


const login = async (req, res) => {
  try {
     
      const user = await User.findOne({ email: req.body.email });
      console.log(user);

      if (user) {
        
          const validate = await bcrypt.compare(req.body.password, user.password);

          if (validate) {
             
              const token = await jwt.sign(
                  { userId: user._id, email: user.email, role: user.role },
                  process.env.JWT_KEY,
                  { expiresIn: "1h" } 
              );
              res.json({  "message": "Login successfully", token: token, role: user.role });
          } else {
             
              res.status(401).json({ "message": "Invalid password" });
          }
      } else {
      
          res.status(404).json({ message: "User not found" });
      }
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
