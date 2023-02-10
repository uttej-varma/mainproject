const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;
const orderSchema=new Schema({
    user:{type:ObjectId,ref:"User"},
    shirts: {
        quantity: { type: Number,default:0  },
        price:{type:Number,default:0},
        washing: { type: Boolean,default:false },
        ironing: { type: Boolean,default:false },
        drycleaning: { type: Boolean,default:false },
        chemicalcleaning: { type: Boolean,default:false },
      },
      tshirts: {
        quantity: { type: Number,default:0   },
        price:{type:Number,default:0},
        washing: { type: Boolean,default:false },
        ironing: { type: Boolean,default:false },
        drying: { type: Boolean,default:false },
        chemicalcleaning: { type: Boolean,default:false },
      },
      trousers: {
        quantity: { type: Number,default:0   },
        price:{type:Number,default:0},
        washing: { type: Boolean,default:false },
        ironing: { type: Boolean,default:false },
        drycleaning: { type: Boolean,default:false },
        chemicalcleaning: { type: Boolean,default:false },
      },
      jeans: {
        quantity: { type: Number,default:0   },
        price:{type:Number,default:0},
        washing: { type: Boolean,default:false },
        ironing: { type: Boolean,default:false },
        drycleaning: { type: Boolean,default:false },
        chemicalcleaning: { type: Boolean,default:false },
      },
      boxers: {
        quantity: { type: Number,default:0   },
        price:{type:Number,default:0},
        washing: { type: Boolean,default:false },
        ironing: { type: Boolean,default:false },
        drying: { type: Boolean,default:false },
        chemicalcleaning: { type: Boolean,default:false },
      },
      joggers: {
        quantity: { type: Number,default:0   },
        price:{type:Number,default:0},
        washing: { type: Boolean,default:false },
        ironing: { type: Boolean,default:false },
        drywashing: { type: Boolean,default:false },
        chemicalcleaning: { type: Boolean,default:false },
      },
      others: {
        quantity: { type: Number,default:0   },
        price:{type:Number,default:0},
        washing: { type: Boolean,default:false },
        ironing: { type: Boolean, default:false},
        drycleaning: { type: Boolean,default:false },
        chemicalcleaning: { type: Boolean,default:false },
      }
  
},{timestamps:Date});

const orderModel=mongoose.model("Order",orderSchema);
module.exports=orderModel;