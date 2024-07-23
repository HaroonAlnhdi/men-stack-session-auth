const express = require("express");
const User = require("../models/user.js");

const router = express.Router();



 router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
  });

router.post("/sign-up", async (req, res) => {

    const username = req.body.username
    const password = req.body.password
    try{
    const userInDatabase = await User.findOne({ username,});
    if (userInDatabase) {
        return res.send("Username already taken.");
    }

    if ( password !== req.body.confirmPassword) {
        return res.send("Password and Confirm Password must match");
      }

   }catch(error){}
});

module.exports = router;