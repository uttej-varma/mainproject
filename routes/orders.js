const express=require("express");
const router=express.Router();
const bodyParser=require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const Order=require("../models/Order");

router.post("/",async(req,res)=>{
    try{
        const data=await Order.create({
        location:req.body.location,
        city:req.body.city,
        totalItems:req.body.totalItems,
        totalPrice:req.body.totalPrice,
        summary:req.body.summary,
        user:req.user
        });
        res.status(201).json({
            message:"order placed successfully",
            data
        })
    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }
    
})

//getting the orders of the user using querparameters that are send from frontend through axios
router.get("/",async(req,res)=>{
    try{
        const userId=req.query.userId;
    const userOrders=await Order.find({user:userId});
    res.status(200).json({
        message:"user orders are fetched successfully",
        userOrders
    })
    }
    catch(err){
      res.status(400).json({
        message:err.message
      })
    }

})
//deleting a particular order based on orderId which was sent as queryparameter from front end through axios

router.delete("/",async(req,res)=>{
    try{
        const orderId=req.query.orderId;
        await Order.deleteOne({_id:orderId});
        res.status(201).json({
            message:"order deleted successfully"
        })
    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }
})


module.exports=router;