const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const bodyParser=require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const User=require("../models/User");
const { body, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken");
const env=require("dotenv");
env.config();



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
router.post("/login", async (req,res)=>{
    try{
       
        const {email,password}=req.body;
    const user= await User.findOne({email});
    //if user is not present in database...
    if(!user)
    {
        return res.status(200).json({
            status:"failed",
            message:"user should register"
        }) 
    }
   //if user is present we are checking weather the credentials are matching and generating web token accordingly...
        bcrypt.compare(password, user.password, function(err, result) {
            if(err){
                return res.status(500).json({
                    status:"failed",
                    message:err.message
                })
            }
            if(result){
                const token=jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),// 1 hour
                    data: user._id
                  }, process.env.SECRET);
                return res.status(200).json({
                    status:"success",
                    message:"user logged in",
                    id:user._id,
                    token,
                    address:user.address,
                    location:user.district,
                    userName:user.name
                })
            }
            else{
                res.status(400).json({
                    status:"failed",
                    message:"invalid credentials"
                })
            }
        });
    
    }
    catch(e){
         res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
})



module.exports=router;