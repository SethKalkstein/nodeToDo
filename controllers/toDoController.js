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
//test item for database
/* 
const itemOne = ToDoModel({item: "buy flowers"}).save(err=> {
    if (err) throw err;
    console.log("item saved");
})
 */
//test data for controller to pass to views
// let data = [{item: "get cat food"}, {item: "go to gym" }, {item: "make pickles"}, {item: "get sleep"}];

const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => {
    
    app.get("/todo", (req, res)=>{
        //get data from mongo db and pass it to the view
        ToDoModel.find({},(err, data)=>{
            if (err) throw err;
            res.render("todo", {chores: data});
        });
    });

    app.post("/todo", urlencodedParser, (req, res)=>{
        //get data from the view and add it to Mongo
        let newItem = ToDoModel(req.body).save((err, data) => {
            if (err) throw err;
            res.json(data);
        })
    });

    app.delete("/todo/:item", (req, res) =>{
        //delete the requested item from Mongo 
        ToDoModel.find({item: req.params.item.replace(/\-/g, " ")}).remove( (err, data) => {
            if (err) throw err;
            res.json(data);
        });
    });
}