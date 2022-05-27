const mongoose = require("mongoose");

const db = process.env.mongodb;

//console.log(db,"dbdb")

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB is connected");
    } catch (err) {
        console.log("Mongodb Error")
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
