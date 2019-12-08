const express = require("express");
const app = express;
const toDoController = require("./controllers/toDoController");

//set up template engine to ejs 

app.set("view engine", "ejs");

//static file route
app.use(express.static("./public"));

//set up port

app.listen(3000);
console.log("Listening to port 3000");


