const express = require("express");
const app = express()
app.use(express.json());

app.get('/api',(req,res) => {
    res.status(200).send({
        status : "success"
    })
})

module.exports = app