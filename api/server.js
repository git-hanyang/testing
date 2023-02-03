require("dotenv").config();
const Planner = require("./models/plannerSchema");
const express = require("express");
const session = require("express-session");
const app = express();
const cookieParser=require('cookie-parser')


const cors = require("cors");
const whitelist = ["http://localhost:3000",'http://127.0.0.1:3000'];

const corsOption = {
  origin: whitelist,
};
app.use(cors(corsOption));
app.use(cookieParser())



const portnum = 3003;
app.listen(portnum, () => {
  console.log("travel app is listening to port " + portnum);
});

///////////////////////////////////////////////////////////////////////
const mongoose = require("mongoose");

// const mongoURI = 'mongodb://192.168.1.103:27017/travel' || process.env.MONGODB_URI;
const mongoURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://travel-app-api:be2FV59P5XJSXkcs@cluster0.zizp4z1.mongodb.net/travel-app";

mongoose.connect(mongoURI, { useNewUrlParser: true });

mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", () => {
  console.log("mongodb connection error");
});

mongoose.connection.on("disconnected", () => {
  console.log("disconnected from mongodb");
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});


///////////////////////////////////////////////////////////////////////
//**************************SignUp & SignIn *****************************//
const oneDay=1000*60*60*24
app.use(
  session({
    secret: "someramdomstringvalue",
    resave: true,
    saveUninitialized: true,
    cookie:{maxAge: oneDay}
  })
);

const userController = require("./controllers/users.js");
const sessionController = require("./controllers/sessions.js");
const plannerController = require("./controllers/plannerController.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userController);
app.use("/api/session", sessionController);
app.use("/api/planner", plannerController);




//https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/


// app.get("/app", (req, res) => {
//   //Disallow user not logged in from Party Message
//   if (req.session.currentUser) {
//     res.send("Welcome to the party!");
//   } else {
//     res.redirect("/session/new");
//   }
// });
