const express=require("express");
const app=express();
const conn=require("./databaseConnection/connect");
conn();
const reglog=require("./routes/registerlogin");
app.use("/api/v1/user",reglog)






app.listen(3400,()=>{console.log("server is up at 3400")});