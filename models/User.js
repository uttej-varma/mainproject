const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;
const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phone:{type:String,required:true,unique:true},
    state:{type:String,required:true},
    district:{type:String,required:true},
    address:{type:String,required:true},
    pincode:{type:String,required:true}
},{timestamps:true});

const userModel=mongoose.model("appUser",userSchema);
module.exports=userModel;