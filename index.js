const express=require("express");
const app=express();
const conn=require("./databaseConnection/connect");
conn();
const reglog=require("./routes/registerlogin");

const env=require("dotenv");
env.config();
const laundOrder=require("./routes/orders");
const tokenVerification=require("./verifytokenfunction/verify")


//middle wear for verifying token before uploading orders to database 
app.post("/api/v1/user/order",(req,res,next)=>{
    tokenVerification(req,res,next);
});
app.get("/api/v1/user/order",(req,res,next)=>{
    tokenVerification(req,res,next);
});
app.delete("/api/v1/user/order",(req,res,next)=>{
    tokenVerification(req,res,next);
})

app.use("/api/v1/user",reglog);
app.use("/api/v1/user/order",laundOrder);






app.listen(3400,()=>{console.log("server is up at 3400")});