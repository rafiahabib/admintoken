const express=require('express')
const router=express.Router();
const controller=require('../controller/books')
router.post('/add',controller.addBook);
router.get('/:id',controller.getSingleBook)
router.put('/update/:id',controller.updateBook)
router.delete('/delete/:id',controller.deleteBook)
module.exports=router;