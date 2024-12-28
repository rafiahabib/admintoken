const express=require('express')
const router=express.Router();
const controller=require('../controller/user')
const{ authorization,authtoken}=require('../middleware/auth');
router.post('/create',controller.register)
router.get('get/:id',authtoken,authorization("admin"),controller.getallusers);
router.get('/:id',authtoken,controller.getSingleuser);
router.put('/update/:id',authtoken,controller.updateuser);
router.delete('/delete/:id',authtoken,authorization("admin"),controller.deleteuser)
router.post('/login',controller.login)
module.exports=router