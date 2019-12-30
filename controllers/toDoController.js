const bodyParser = require("body-parser")
const mongoose = require("mongoose");

let data = [{item: "get cat food"}, {item: "go to gym" }, {item: "make pickles"}, {item: "get sleep"}];

const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => {
    
    app.get("/todo", (req, res)=>{
        res.render("todo", {chores: data});
    });

    app.post("/todo", urlencodedParser, (req, res)=>{
        data.push(req.body);
        res.json(data);
    });

    app.delete("/todo/:item", (req, res) =>{
        data = data.filter( theChore => theChore.item.replace(/ /g, "-") !== req.params.item);
        res.json(data);
    });

}