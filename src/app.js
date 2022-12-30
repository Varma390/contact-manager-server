const express = require("express");
const app = express();
const allRoutes = require("./routes/route");
const signroute = require("./routes/user");
app.use(express.json());

app.use("/hello", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Welcome to contact manager app backend API.",
  });
});

//Routes
app.use("/user", allRoutes);
app.use("/", signroute);

module.exports = app;
