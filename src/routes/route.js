// const mongoose = require('mongoose');
const { User, Contact } = require("../modals/schema");
const { usersModal} = require('../modals/schema')
const { contactsModal} = require('../modals/schema')
let bodyParser = require('body-parser')

const allRoutes = require('express').Router()

const cors = require("cors");
allRoutes.use(cors());
allRoutes.use(bodyParser.json())
allRoutes.get('/',(req,res) => {
    res.status(200).send({
        status : "success"
    })
})


allRoutes.post('/createuser',async (req,res) => {
    // let cvdata = req.body; //array of objects
    console.log(req.body)
    try {
    //     const ob = {
    //         "email": req.body.email,
    //         "password": req.body.password
    //     }
    // console.log(ob)
        await User.create(req.body)
        // await contactsModal.create(ob)
        .then(async (e) => {
            await Contact.create({user:e._id})
            res.send({
                status: "success",
                mess : e
            })
        })
    } catch(err) {
        res.send({
            status: "failure",
                mess : err.message
        })
    }
})


// const middlewares = {
//     getuserid : function (req,res,next) {
//         JWT.verify(req.headers['token'], 'YOUR_SECRET', function(err, decodedToken) {
//             if(err) { /* handle token err */ }
//             else {
//              req.userId = decodedToken.id;   // Add to req object
//              next();
//             }
//           })
//     }
// }
allRoutes.post('/usercontacts',async (req,res) => {
    let cvdata = req.body; //array of objects
    try {
        console.log(req.body);
        // if req.body is array
        req.body.forEach(async e => {
            await Contact.findOneAndUpdate({user:"63ad8363e53df7a381cb9694"},e)

            .then(e => {
                res.send({
                    status: "success",
                    mess :e
                })
            })
        })
        // if req.body is a single object
        await Contact.findOneAndUpdate({user:"63ad8363e53df7a381cb9694"},req.body)
        .then(e => {
            res.send({
                status: "success",
                mess :e
            })
        })
    } catch(err) {
        res.send({
            status: "failure",
                mess : err.message
        })
    }
})

module.exports = allRoutes