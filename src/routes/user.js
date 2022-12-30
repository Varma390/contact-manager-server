const express = require("express");
const { body } = require("express-validator");
const { User, Contact } = require("../modals/schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const signrouter = express.Router();

signrouter.get('/login',(req,res) => {
    res.send({
        status: "success"
    })
})

signrouter.post("/login",
  body("Email").isEmail(),
  body("Password").notEmpty(),
  async (req, res) => {
    console.log("From login route");
    try {
      console.log(req.body);
      const { Email, Password } = req.body;
      const userData = await User.findOne({ Email });
      console.log(userData);
      if (userData) {
        let result = await bcrypt.compare(Password, userData.Password);
        if (result) {
          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
              data: userData._id
            },
            // userData._id
            process.env.JWT_SECRET_KEY
          );
          res.status(200).json({
            status: "Success",
            message: "User Logged in successfully",
            Token: token,
          });
        } else {
          res.status(400).json({
            status: "Password not matched",
            message: "Wrong Password",
          });
        }
      } else {
        res.status(400).json({
          status: "Failed",
          message: "User is NOT Registered. Please signup before sign in",
        });
      }
    } catch (e) {
      res.status(400).json({
        status: "Failed",
        message: e.message,
      });
    }
  }
);

signrouter.post(
    "/signup",
    body("Email").isEmail(),
    body("Password").isLength({ min: 8 }),
    async (req, res) => {
      console.log("From signup route");
      try {
        console.log(req.body);
        const { Email, Password, confirmPassword } = req.body;
        let userData = await User.findOne({ Email });
        if (userData) {
          return res.status(409).json({
            status: "Existed Email",
            message:
              "User already exists with the given email. Please proceed to sign in",
          });
        }
        console.log(Password);
        // console.log(Password, confirmPassword);
        if (Password !== confirmPassword) {
          return res
            .status(400)
            .send("Password and confirm password are not matching");
        }
  
        bcrypt.hash(Password, 10, async function (err, hash) {
          // Store hash in your Password DB.
          if (err) {
            return res.status(500).json({
              status: "Failed",
              message: err.message,
            });
          }
          userData = await User.create({
            Email: Email,
            Password: hash,
            // name: Email.split("@")[0],
          });
          res.json({
            status: "Success",
            message: "User successfully created",
            userData,
          });
        });
      } catch (e) {
        res.json({
          status: "Failed",
          message: e.message,
        });
      }
    }
  );
  

  module.exports = signrouter;