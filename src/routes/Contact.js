const router = require("express").Router();
const { json } = require("body-parser");
const bodyParser = require("body-parser");
const { User, Contact } = require("../models/schema");
router.use(bodyParser.json());
const cors = require("cors");
router.use(cors());
router.use(bodyParser.json());


router.get("/work", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Contacts route is working",
  });
});


router.post("/createuser", async (req, res) => {
  // let cvdata = req.body; //array of objects
  console.log(req.body);
  try {
    //     const ob = {
    //         "email": req.body.email,
    //         "password": req.body.password
    //     }
    // console.log(ob)
    await User.create(req.body)
      // await contactsModal.create(ob)
      .then(async (e) => {
        await Contact.create({ user: e._id });
        res.send({
          status: "success",
          mess: e,
        });
      });
  } catch (err) {
    res.send({
      status: "failure",
      mess: err.message,
    });
  }
});

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


router.post("/usercontacts", async (req, res) => {
  let cvdata = req.body; //array of objects
  try {
    console.log(req.body);
    // if req.body is array
    req.body.forEach(async (req, res) => {
      await Contact.findOneAndUpdate({ user: req.body })
        // await Contact.findOneAndUpdate({user:"63ad8363e53df7a381cb9694"},e)

        .then((err) => {
          res.send({
            status: "success",
            message: err.message
          });
        });
    });
    // if req.body is a single object
    await Contact.findOneAndUpdate({ user: req.body })
      // await Contact.findOneAndUpdate({user:"63ad8363e53df7a381cb9694"},req.body)
      .then((err) => {
        res.send({
          status: "success",
          message: err.message
        });
      });
  } catch (err) {
    res.send({
      status: "failure",
      message: err.message
    });
  }
});


router.get('/',async (req,res)=>{
  try {
    // const {filter = 'name' } = req.query
    const contacts = await Contact.find({userRef: req.user}).sort({ email : -1});  // or Contact.find({email:req.user.email});
    console.log("Fetching Contacts", contacts);
    res.status(200).json({
        status: "Fetched",  
        contacts: contacts,
    })
  } catch (err) {
    res.status(400).json({
        status: "Failed to fetch",
        message: err.message
    })
  }
})


router.get("/:email", async (req, res) => {
  try {
    const user = await Contact.findOne({ email: req.params.email }); // console.log(req.body.email)
    if (user.email) {
      console.log(user._id)
      res.status(200).json({
        status: "success",
        user
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "User does not exists",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
});


router.delete("/delete", async (req, res) => {
  // console.log(req.body)
  const { selectedContactsIds } = req.body;
  if (selectedContactsIds.length) {
    try {
      let response = await Contact.deleteMany({
        _id: selectedContactsIds,
      });
      res.status(200).json({
        status: "Success",
        message: "Deleted Contacts successfully",
        response,
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message,
      });
    }
  } else {
    res.status(400).json({
      status: "Failed",
      message: "No contacts selected",
    });
  }
});

module.exports = router;
