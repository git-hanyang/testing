require("dotenv").config();


const express = require("express");
const session = require("express-session");
const app = express();
const cookieParser=require("cookie-parser")
//const redis = require("connect-redis");
///////////////////////////////////////////////////////////////////////
//**************************SignUp & SignIn *****************************//
const oneDay=1000*60*60*24


app.use(
  session({
    //store:new RedisStore({client:redisClient}),
    secret: "someramdomstringvalue",
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge: oneDay,
      sameSite:"none",
      secure:false
    },
  })
);
//for session id
//https://www.youtube.com/watch?v=J1qXK66k1y4

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

const whitelist = ["https://travelapp2u.onrender.com","https://travelapp2u.netlify.app","http://localhost:3000"];

const corsOption = {
  origin: whitelist,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOption))

// const redisClient = require('redis').createClient({
//   legacyMode:true
// });

// redisClient.connect().catch(console.log)
// const RedisStore=redis(session)



app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const portnum = process.env.PORT || 3003;
app.listen(portnum,'localhost', () => {
  console.log("travel app is listening to port " + portnum);
});

///////////////////////////////////////////////////////////////////////
const mongoose = require("mongoose");

id=process.env.id
password=process.env.password
const MONGODB_URI =`mongodb+srv://${id}:${password}@cluster0.zizp4z1.mongodb.net/travel-app` 
mongoURI=process.env.MONGODB_URI

mongoose.connect(
  mongoURI,
  { useNewUrlParser:true},
  ()=>{console.log(`connection to db is established`)
  }
);

mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", () => {
  console.log("mongodb connection error");
});

mongoose.connection.on("disconnected", () => {
  console.log("disconnected from mongodb");
});


const userController = require("./controllers/users.js");
const plannerController = require("./controllers/plannerController.js");

app.get('/',(req,res)=>{
  res.redirect('/')
})
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
