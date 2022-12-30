const mongoose = require("mongoose")
const app = require("./app")
require("dotenv").config()
mongoose.set('strictQuery', true)

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/Blog"
const PORT = process.env.PORT || 3000
mongoose.connect(MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("connected to Database");
    app.listen(PORT,()=>console.log(`server is up and running on ${PORT}`))
})
.catch((err)=>console.log(err))