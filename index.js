const express=require('express');
require('dotenv').config();
const mongoose=require('mongoose');
const app=express();
const BookRouter=require('./router/books')
const UserRouter=require('./router/user')
mongoose.connect('mongodb://localhost:27017/library')
.then(()=> console.log('mongodb connected'))
.catch((err)=> console.error(err))

app.use(express.json());
app.use('/book',BookRouter);
app.use('/user',UserRouter)
app.listen(3000,()=>{
    console.log("server starting port 3000")
})