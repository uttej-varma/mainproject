const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const bodyParser=require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const User=require("../models/User");
const { body, validationResult } = require('express-validator');



//REGISTER
router.post("/register",body("name").isLength({min:5,max:10}),body("email").isEmail(),body("password").isLength({min:5,max:12}),
   body("phone").isLength({min:10,max:10}),body("pincode").isLength({min:6,max:6}),async (req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        
            return res.status(400).json({ errors: errors.array() });
          }
       const data=await User.findOne({email:req.body.email});
       if(data)
       {
        return  res.status(400).json({
            message:"user already exist"
        })
       }
       const number=await User.findOne({phone:req.body.phone});
       if(number)
       {
        return  res.status(400).json({
            message:"mobile number already registered"
        })
       }

       const {name,email,password,phone,state,district,address,pincode}=req.body;
       bcrypt.hash(password, 10,async function(err, hash) {
        if(err)
        {
           return res.status(500).json({
                status:"failed",
                message:err.message
            })
        }
        const dataafterhash=await User.create({
            name,
            email,
            password:hash,
            phone,
            state,
            district,
            address,
            pincode
        })
        res.status(201).json({
            message:"registered successfully",
            dataafterhash
        })
    });
    }
    catch(err){
        res.status(400).json({
            status:"failed",
            message:err.message
        })
    }
})

//LOGIN

module.exports=router;