// const mongoose = require('mongoose');
const { Contact } = require("../modals/schema");
const jwt = require("jsonwebtoken");

let bodyParser = require('body-parser')
require("dotenv").config()
const allRoutes = require('express').Router()

const cors = require("cors");
allRoutes.use(cors());
allRoutes.use(bodyParser.json())

// middleware for jwt verification
allRoutes.use("/", (req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      console.log(`token = ${token}`)
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
          if (err) {
            return res.status(401).json(err);
          }
          req.user = decoded.data;
          next();
        });
      } else {
        return res.status(401).json({
          status: "Failed",
          message: "Token is missing",
        });
      }
    } else {
      return res.status(403).json({
        status: "Failed",
        message: "Not authenticated user",
      });
    }
  });


// get all contacts
allRoutes.get('/contacts',async (req,res) => {
    try {
        await Contact.find({user:req.user}).sort({ email : -1})
        .then(data => {
            res.send({
                status: "success",
                mess : data
            })
        .catch(err => {
            res.send({
                status: "failed",
                mess : err.message
            })
        })
    })
    } catch(err) {
        res.send({
            status: "failure",
            mess : err.message
        })
    }
})

// add contacts
allRoutes.post('/add',async (req,res) => {
    try {
        console.log(req.body);
        req.body.forEach(async e => {
            await Contact.create({...e, user:req.user})
        })
        res.send({
            status: "success",
            mess : "added all contacts"
        })
    } catch(err) {
        res.send({
            status: "failure",
                mess : err.message
        })
    }
})

//search a contact using email
allRoutes.get("/:email", async (req, res) => {
    console.log(req.params.email);
    try {
      await Contact.find({ Email: req.params.email })
      .then(user => {
        res.status(200).json({
            status: "success",
            mess : user
          })
      }) 
      .catch(err => {
        res.status(404).json({
            status: "Failed",
            message: "User does not exists",
          })
      })
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message,
      });
    }
  });

// deleting the selected contacts
allRoutes.delete("/delete", async (req, res) => {
    // console.log(res.body) // ["63aeb62d50bc537f77529980","63aeb62e50bc537f77529982","63aeb62e50bc537f77529981"]
try {
    req.body.forEach(async e => {
        await Contact.deleteMany({ _id: e })
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err.message)
        })
    })
    res.status(200).json({
        status: "success",
        message: 'selected contacts deleted'
        })
} catch (err) {
    res.status(400).json({
    status: "Failed",
    message: 'no contacts deleted'
    });
}
});


module.exports = allRoutes