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
// route.use(bodyParser.json())
// route.use(bodyParser.urlencoded())
/* route.post('/register',async (req, res) =>{
    try{
        const {email,password,confirmpassword} = req.body;
        let exist = await Login.findOne({email})
        if(exist){
            return res.status(400).send('User Already Exist')
        }
        if(password !== confirmpassword){
            return res.status(400).send('Passwords are not matching');
        }
        let newUser =  await Login.create({
           
            email,
            password,
            confirmpassword
        })
        await newUser.save();
        res.status(200).send('Registered Successfully')
        

    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
})
 */
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

 /* route.post('/register',async (req,res)=>{
    try{
       console.log(req.body)
        
    let user = await login.findOne({email:req.body.email})
    console.log(user,1)
    if(user){
       return  res.status(409).json({
            status:'failure',
            message:'user already exists with the given email'
        })
    }
    console.log("ppppp")
    // bcrypt.hash(password,10,async function(err,hash){
    //     if(err){
    //         return res.status(500).json({
            
    //             status:'failed',
    //             message:err.message
    //         })
    //     }
    console.log("going")
    const use = await login.create({
        
        email:req.body.email,
        password:req.body.password
    });
    
    res.json({
        status:'sucesss',
        message:use})
    
    }
    catch(e){
        res.json({
            status:'failure',
            message:e.message
        })
    }

 })
 */