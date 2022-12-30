const express = require("express");
const app = express();
const contactRouter = require("../src/routes/Contact");
const UserRoute = require("../src/routes/User");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;
const cors = require("cors");
app.use(express.json());
app.use(cors());



app.use("/contacts", (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    console.log(token)

    if (token) {
      jwt.verify(token, secret, function (err, decoded) {
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

app.use("/hello",(req,res)=>{
  res.status(200).json({
    status:"Success",
    message: "Welcome to contact manager app backend API."
  })
})


// app.use('*',(req, res)=>{
//   res.status(404).json({
//     status: 'Failed',
//     message: '404! not found'
//   })
// })

app.use("/users", UserRoute);
app.use("/api/contacts", contactRouter);

module.exports = app;


// {           
  //   "Email": "Johnsmiwth@fakeemail.com",
  //   "Password": "Adbcd55efg"
  // }

// {
//   "Email": "abcdef@gmail.com",
//   "Password": "abcdefjsli"
// }
