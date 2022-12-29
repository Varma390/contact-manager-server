const express = require("express");
const bodyparser = require("body-parser");
const { body } = require("express-validator");
const { User, Contact } = require("../models/schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;
const router = express.Router();

router.post(
  "/login",
  body("email").isEmail(),
  body("password").notEmpty(),
  async (req, res) => {
    console.log("from login route");
    try {
      console.log(req.body);
      const { email, password } = req.body;
      const userData = await User.findOne({ email });
      if (userData) {
        let result = await bcrypt.compare(password, userData.password);
        if (result) {
          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
              data: userData._id,
            },
            SECRET
          );
          res.status(200).json({
            status: "Success",
            message: "User logged in successfully",
            token: token,
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
          message: "User is not registered. Pls signup before sign in",
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

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  async (req, res) => {
    try {
      console.log(req.body);
      const { email, password, confirmPassword } = req.body;
      let userData = await User.findOne({ email });
      if (userData) {
        return res.status(409).json({
          status: "Existed Email",
          message:
            "User already exists with the given email. Pls proceed to sign in",
        });
      }
      console.log(password, confirmPassword);
      if (password !== confirmPassword) {
        return res
          .status(400)
          .send("Password and confirm password are not matching");
      }

      bcrypt.hash(password, 10, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          return res.status(500).json({
            status: "Failed",
            message: err.message,
          });
        }
        userData = await User.create({
          email: email,
          password: hash,
          name: email.split("@")[0],
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

router.get("/get", async (req, res) => {
  try {
    const userData = await User.find();
    res.json({
      status: "Success",
      message: "User successfully created",
      userData,
    });
  } catch (e) {
    res.json({
      status: "Failed",
      message: e.message,
    });
  }
});

module.exports = router;
