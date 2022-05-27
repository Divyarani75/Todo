require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const jwt = require("jsonwebtoken");

const app = express();

// routes
const todo = require("./routes/todo");
const signup = require("./routes/signup");
const login = require("./routes/login");

// connect database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// initialize middleware
app.use(express.json({ extended: false }));




app.get("/", (req, res) => res.send("server is active"));

// use routes

app.use("/api/signup", signup);
app.use('/api/login', login);


app.use((req, res, next) => {

    //console.log(req,"Rrrrrr")

    //express deprecated req.param(name): Use req.params, req.body, or req.query instead
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.params["token"] || req.headers["x-access-token"];

    
  
    // decode token
    if (token) {
  
      // verifies secret and checks exp
      jwt.verify(token, "REDSWQWESADSA", (err, decoded) => {
        if (err) {
          return res.json({success: false, message: "Failed to authenticate token."});
        } else {
          // if everything is good, save to request for use in other routes
          req.userid = decoded._id;
         
          next();
        }
      });
    }
    else {
      // if there is no token
      // return an error
      return res.status(403).send({
        success: false,
        message: "No token provided."
      });
    }
  });


  app.use("/api/todo", todo);

// setting up port

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
