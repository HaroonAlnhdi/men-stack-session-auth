const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");



router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
});


router.post("/sign-up", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;


    try {
        const userInDatabase = await User.findOne({ username: username });
        if (userInDatabase) {
            return res.send("Ooops somthing went wrong.");
        }


        if (password !== confirmPassword) {
            return res.send("Password and Confirm Password must match");
        }


        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;
        // validation logic
        const user = await User.create(req.body);
        res.send(`Thanks for signing up ${user.username}`);
    } catch (error) { }


});


router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
});

router.post("/sign-in", async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    try{
    const userInDatabase = await User.findOne({ username });
    if (!userInDatabase) {
      return res.send("Login failed. Please try again.");
    }

    const validPassword = bcrypt.compareSync(password,userInDatabase.password);
      if (!validPassword) {
        return res.send("Login failed. Please try again.");
      }
    }catch(error){}

  });

module.exports = router;