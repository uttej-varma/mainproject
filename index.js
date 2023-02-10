const express=require("express");
const app=express();
const conn=require("./databaseConnection/connect");
conn();
const reglog=require("./routes/registerlogin");
const jwt=require("jsonwebtoken");
const env=require("dotenv");
env.config();
const laundOrder=require("./routes/orders");


//middle wear for verifying token before uploading orders to database 
app.post("/api/v1/user/order",(req,res,next)=>{
    const token=req.headers.jwttoken;
    if(token)
    {
        jwt.verify(token,process.env.SECRET, function(err, decoded) {
            //if token is expired....
           if(err){
            return res.status(400).json({
                message:"please login again"
            })
           }
           req.user=decoded.data;
         
           next();
          });
    }
    else{
        //if no token is present in headers;
        res.status(400).json({
            message:"user not authenticated"
        })
    }
})
app.use("/api/v1/user",reglog);
app.use("/api/v1/user/order",laundOrder);






app.listen(3400,()=>{console.log("server is up at 3400")});