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


app.use("/", UserRoute);
app.use("/contacts", contactRouter);

module.exports = app;
