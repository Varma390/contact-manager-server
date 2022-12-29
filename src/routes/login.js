const express=require("express")
const Login =require("../models/schema.js")
const bcrypt = require('bcrypt');
route=express.Router();
route.use(express.json())
const cors = require("cors")
route.use(cors({
    origin: "*",
}))


const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');


 route.get("/",(req,res)=>{
    res.send("ok")
 })
 route.post("/login", async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    const userData = await Login.findOne({email:email});
    
    console.log(userData)
    if (userData) {

        let result = await bcrypt.compare(password, userData.password);
        if (result) {
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                data: userData.email,
            },
                process.env.SECRET
            );
            res.status(200).json({
                Status: "ok",
                token: token,
            });
        } else {
            res.status(400).json({
                status: "failed",
                message: "Wrong Password",
            });
        }
    }
    else {
        res.status(400).json({
            status: "failed",
            message: "No user Found pls register ",
        });
    }
});




module.exports = route;
