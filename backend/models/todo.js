const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'user'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    setdatetime:{
        type:Date, 
    },
    status: {
        type: Number,
        default: 1, //1- active 2-completed 0 -expire
    },
    datetime:{
        type:Date, 
        default:Date.now
    }
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;
