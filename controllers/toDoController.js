const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const loginString = require("../dbConnectString.js");

//connect to database
mongoose.connect(loginString, { useUnifiedTopology: true, useNewUrlParser: true});
//create scema
const todoSchema = new mongoose.Schema({
    item: String
});
//create model 
let ToDoModel = mongoose.model("TodoModel",todoSchema);
const itemOne = ToDoModel({item: "buy flowers"}).save(err=> {
    if (err) throw err;
    console.log("item saved");
})


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