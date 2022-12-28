const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

// User Schema
const userSchema = mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
    length: {
      min: 8,
    },
  },
});

const User = mongoose.model("users", userSchema);