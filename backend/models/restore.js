const mongoose = require("mongoose");

const RestoreSchema = new mongoose.Schema({ 
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
        default: 1,
    },
    datetime:{
        type:Date, 
        default:Date.now
    }
});

const trash = mongoose.model("trash", RestoreSchema);

module.exports = trash;
