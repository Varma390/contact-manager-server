const mongoose = require('mongoose');


// User Schema
const userSchema = mongoose.Schema({
    Email: {
      type: String,
      required: true,

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


// Contacts Schema
const contactSchema = mongoose.Schema({
    Name: {
      type: String,
      required: true,
    },
    Designation: {
      type: String,
      required: true,
    },
    Company: {
      type: String,
      required: true,
    },
    Industry: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: false,
    },
    Phone_number: {
      type: Number,
      required: true,
      unique: false,
    },
    Country: {
      type: String,
      required: true,
      // upper_case: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: User,
    },
  });
  
  const Contact = mongoose.model("contacts", contactSchema);
  module.exports = { User, Contact };


  // const validateEmail = function(email) {
//     const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return regex.test(email);
// };

// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         lowercase: true,
//         required: [true, "Please enter your email"],
//         validate: [validateEmail, "Please enter a valid email"],
//         unique: true,
//       },
//       password: {type: String}
// })
// const usersModal = mongoose.model('users',userSchema)

// const contactsSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.ObjectId,
//         ref: usersModal,
//     },
//     contacts: 
//         [
//             {
//                 name: {type: String},
//                 designation: {type: String},
//                 company: {type: String},
//                 industry: {type: String},
//                 email_id: {type: String},
//                 phoneNumber: {type: Number},
//                 country: {type: String}
//             }
//         ]
// })

// const contactsModal = mongoose.model('contacts',contactsSchema)