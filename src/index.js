const app = require('./app')
const mongoose = require("mongoose");
let port = process.env.PORT || 3000
require('dotenv/config');
mongoose.set('strictQuery', true)

const db = mongoose.connect("mongodb://localhost/Blog",{ useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log("connected to Database"))
            .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server is running......on ${port}` ));