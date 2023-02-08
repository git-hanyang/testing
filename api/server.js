require("dotenv").config();
const User = require("./models/userSchema.js");

const express = require("express");
const session = require("express-session");
const app = express();
const cookieParser=require("cookie-parser")
const redis = require("connect-redis");
const jwt=require("jsonwebtoken")

// const { createProxyMiddleware } = require("http-proxy-middleware");
// app.use('/api', createProxyMiddleware('**',{ target: 'http://localhost:3003', changeOrigin: true }))


const cors = require("cors");


// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

app.use(cookieParser())

const whitelist = ["http://localhost:3000"];

const corsOption = {
  origin: whitelist,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOption))

const redisClient = require('redis').createClient({
  legacyMode:true
});

// redisClient.connect().catch(console.log)
// const RedisStore=redis(session)



app.use(express.urlencoded({ extended: false }));
app.use(express.json());



const portnum = 3003;
app.listen(portnum,'localhost', () => {
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




///////////////////////////////////////////////////////////////////////
//**************************SignUp & SignIn *****************************//
const oneDay=1000*60*60*24


app.use(
  session({
    //store:new RedisStore({client:redisClient}),
    secret: "someramdomstringvalue",
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge: oneDay},
  })
);



const userController = require("./controllers/users.js");
const plannerController = require("./controllers/plannerController.js");



app.use("/user", userController);
app.use("/api/planner", plannerController);






// app.get("/app", (req, res) => {
//   //Disallow user not logged in from Party Message
//   if (req.session.currentUser) {
//     res.send("Welcome to the party!");
//   } else {
//     res.redirect("/session/new");
//   }
// });
