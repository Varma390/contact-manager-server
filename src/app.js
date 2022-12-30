const express = require("express");
const app = express()
const allRoutes = require('./routes/route')
const signroute = require('./routes/user')
app.use(express.json());
  
app.use('/user',allRoutes)
app.use('/',signroute)


module.exports = app