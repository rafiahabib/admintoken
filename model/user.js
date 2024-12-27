const mongoose=require('mongoose')
const {Schema}=require('mongoose')
const UserSchema=new Schema({
    bookid:{type:mongoose.Schema.Types.ObjectId, 
    ref:'Book',
    require:false
    },
    id:Number,
    email:{type:String,require:true},
    name:String,
    password: {type:String,require:true},
    age: Number,
    role: {type:String,require:true},
   gender:Boolean
})
const User = mongoose.model('User',UserSchema)
module.exports = User;