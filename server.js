
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const authController = require("./controllers/auth.js");

const methodOverride = require("method-override");
const morgan = require("morgan");

require("./config/database"); // connect to database .. 

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";



// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));

// Express app to use this authController for handling requests that match the /auth URL pattern.
app.use("/auth", authController);

// Route || landing page :

app.get("/", async (req, res) => {
    res.render("index.ejs");
});



app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
});
