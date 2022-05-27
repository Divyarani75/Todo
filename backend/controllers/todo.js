const Todo = require("../models/todo");
const restore = require("../models/restore");
const cron  = require('node-cron');
const mongoose = require("mongoose");

exports.getAllTodo = (req, res) => {
   // console.log(req.userid,"useriduseriduserid")
    Todo.find({status:{$ne:0},userid:mongoose.Types.ObjectId(req.userid)})
        .then((todo) => {
            //console.log({ todo });
            res.status(200).json(todo);
        })
        .catch((err) =>
            res
                .status(404)
                .json({ message: "no todo found", error: err.message })
        );
};

exports.getAllTodoExpire = (req, res) => {
    Todo.find({status:0,userid:mongoose.Types.ObjectId(req.userid)})
        .then((todo) => {
            //console.log({ todo });
            res.status(200).json(todo);
        })
        .catch((err) =>
            res
                .status(404)
                .json({ message: "no todo found", error: err.message })
        );
};

exports.getAllTodotrashlist = (req, res) => {
    restore.find({userid:mongoose.Types.ObjectId(req.userid)})
        .then((todo) => {
            //console.log({ todo },"ddddddddddddd");
            res.status(200).json(todo);
        })
        .catch((err) =>
            res
                .status(404)
                .json({ message: "no todo found", error: err.message })
        );
};



exports.postCreateTodo = (req, res) => {
    let values = req.body;
    values.userid = req.userid;
    Todo.create(req.body)
        .then((data) => {
            //console.log({ data });
            res.json({status:true, message: "todo added successfully", data });
        })
        .catch((err) =>
            res.status(400).json({
                status:false,
                message: "unable to add new todo",
                error: err.message,
            })
        );
};



exports.putUpdateTodo = (req, res) => {
    //console.log("id: ", req.params.id);
    //console.log("body: ", req.body);
    Todo.findByIdAndUpdate(req.params.id, req.body)
        .then((todo) => {
           // console.log("edit", { todo });
            return res.json({status:true, message: "updated successfully", todo });
        })
        .catch((err) =>
            res
                .status(400)
                .json({status:false, error: "unable to update todo", message: err.message })
        );
};



exports.restoretodo = async (req, res) => {

    await Todo.create(req.body)
    .then(async (data) => {
        let id = req.body._id
           await restore.findByIdAndRemove(id, req.body)
        .then((data) => {
        
            return res.json({status:true, message: "Restored successfully" });
        })
        .catch((err) =>
            res
                .status(400)
                .json({ status:false,error: "unable to update todo", message: err.message })
        );  
    })
    .catch((err) =>
        res.status(400).json({
            status:false,
            message: "unable to add new todo",
            error: err.message,
        })
    );

            
    
};

exports.deleteTodo = async (req, res) => {

    await restore.create(req.body)
    .then(async (data) => {
        let id = req.body._id
           await Todo.findByIdAndRemove(id, req.body)
        .then((data) => {
        
            return res.json({status:true, message: "Deleted successfully" });
        })
        .catch((err) =>
            res
                .status(400)
                .json({ status:false,error: "unable to update todo", message: err.message })
        );  
    })
    .catch((err) =>
        res.status(400).json({
            status:false,
            message: "unable to add new todo",
            error: err.message,
        })
    );

            
    
};

cron.schedule("* * * * * *",async function () {

    //console.log("test")

    var inputDate = new Date().toISOString();
   // console.log(inputDate,"inputDate")
    await Todo.find({
    'setdatetime': { $lte: inputDate },'status':1
}).then((data) => {

    if(data.length>0){
        for(let i=0;i<data.length;i++){
           // console.log(data[i]._id,"iiii")
            Todo.findByIdAndUpdate(data[i]._id, {status:0}).then((data) => {
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    //console.log(data,"data")       
    //return res.json({status:true, message: "Deleted successfully" });
})
.catch((err) => {
    
})
    

})
