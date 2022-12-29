const router = require("express").Router();
const { json } = require("body-parser");
const bodyParser = require("body-parser");
const contactsModel = require("../models/schema");
router.use(bodyParser.json());

router.get("/", async (req, res) => {
  try {
    const contacts = await contactsModel.find({ user: req.user });
    console.log("1", contacts);
    res.status(200).json({
      status: "Fetched",
      contacts: contacts,
    });
  } catch (e) {
    res.status(401).json({
      status: "Failed to fetch",
      message: e.message,
    });
  }
});

router.get("/contacts/:email", async (req, res) => {
  try {
    const user = await contactsModel.findOne({ Email: req.params.email });
    if (user.Email) {
      res.status(200).json({
        status: "success",
        user,
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "User does not exists",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

router.delete("/delete", async (req, res) => {
  // console.log(req.body)
  const { selectedContactsIds } = req.body;
  if (selectedContactsIds.length) {
    try {
      let response = await contactsModel.deleteMany({
        _id: selectedContactsIds,
      });
      res.status(200).json({
        status: "Success",
        message: "Deleted Contacts successfully",
        response,
      });
    } catch (e) {
      res.status(400).json({
        status: "Failed",
        message: e.message,
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
