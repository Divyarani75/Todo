const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({    
   
    email: {
        type: String,
        required: true,
        unique: true
      },
    password: {
        type: String,
        required: true
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

UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
  
UserSchema.methods.validPassword = (password, this_password) => {
    return bcrypt.compareSync(password, this_password)
}

const user = mongoose.model("user", UserSchema);

module.exports = user;
