const express=require("express");
const app=express();
app.use(express.json());

const jwt=require("jsonwebtoken");

const PORT=8001;
const SECRET_KEY="sreya094";

const user={username:"admin",password:"password123"}

app.post("/login",(req,res)=>{
    try{
        const{username,password}=req.body;
        if(!username || !password){
            return res.status(401).json({message:"All credentials required"});
        }
        payload={username}
        const token=jwt.sign(payload,SECRET_KEY,{expiresIn:"10m"});

        return res.status(200).send(token);

    }
    catch{
        return res.status(500).json({message:"Internal server Error"});
    }
})

app.use(("/dashboard",(req,res,next)=>{
    try{
       const auth=req.headers.authorization;
    if(!auth || !auth.startsWith("Bearer")){
        return res.status(401).json({message:"Unauthorized"});
    }
    return res.status(200).json({message:"Welcome to your dashboard!"}) 
    }
    catch (err){
        return res.status(500).json({message:"Internal server Error"});
    }
    

}))


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})