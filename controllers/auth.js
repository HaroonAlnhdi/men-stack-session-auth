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
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (!userInDatabase) {
          return res.send("Login failed. Please try again.");
        }
      
        // There is a user! Time to test their password with bcrypt
        const validPassword = bcrypt.compareSync(
          req.body.password,
          userInDatabase.password
        );
        if (!validPassword) {
          return res.send("Login failed. Please try again.");
        }
      
        // There is a user AND they had the correct password. Time to make a session!
        // Avoid storing the password, even in hashed format, in the session
        // If there is other data you want to save to `req.session.user`, do so here!
        req.session.user = { username: userInDatabase.username,
        };
      
        res.redirect("/");

    }catch(error){}

  });


  router.get("/sign-out", (req, res) => {
    req.session.destroy();
    res.redirect("/");
  });

module.exports = router;