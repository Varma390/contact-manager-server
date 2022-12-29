const express=require("express")

let bodyParser = require('body-parser')
const Login =require("../models/login.js")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
route=express.Router();
const cors = require("cors")
route.use(cors({
    origin: "*",
}))

route.use(express.json())

route.post('/register', async (req, res) => {
    try {
        
    
        const { email, password, confirmpassword } = req.body;
        
        let userData = await sample.findOne({ email :email });
        if (userData) {
            return res.status(409).json({
                status: "Failed",
                message: "User already exists with the given email"
            })
        }
        console.log(password,confirmpassword)
        if (password !== confirmpassword) {
            return res.status(400).send('Passwords are not matching');
        }

        bcrypt.hash(password, 10,  function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                return res.status(500).json({
                    status: "Failed",
                    message: err.message
                })
            }
            userData =  sample.create({
                email: email,
                password: hash
            });
            res.json({
                status: "ok",
               
                
            })
        })
    }
    catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })
    }
});
module.exports= route;

 
