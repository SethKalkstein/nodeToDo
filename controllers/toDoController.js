const bodyParser = require("body-parser")
const mongoose = require("mongoose");

module.exports = (app) => {
    
    app.get("/todo", (req, res)=>{
        res.render("todo");
    });

    app.post("/todo", (req, res)=>{

    });

    app.delete("/todo", (req, res) =>{

    });

}