const express=require('express')
const router=express.Router();
const controller=require('../controller/user')
const authorization=require('../middleware/auth');
router.post('/create',controller.register)
router.get('get/:id',authorization,controller.getallusers);
router.get('/:id',authorization,controller.getSingleuser);
router.put('/update/:id',authorization,controller.updateuser);
router.delete('/delete/:id',authorization,controller.deleteuser)
router.post('/login',controller.login)
module.exports=router