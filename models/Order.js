const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;
const orderSchema=new Schema({
    user:{type:ObjectId,ref:"User"},
    location:{type:String,default:''},
        city:{type:String,default:''},
        totalItems:{type:Number,default:0},
        totalPrice:{type:Number,default:0},
        summary:{
            address:{type:String,default:'jakeNagar,bangalore'},
            body:{type:Object,default:{}},
            userName:{type:String,default:'you'},
        }
},{timestamps:Date});

const orderModel=mongoose.model("Order",orderSchema);
module.exports=orderModel;