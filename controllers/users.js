const express = require("express");
require("dotenv").config()

const router = express.Router();
const jwt=require("jsonwebtoken")
const User = require("../models/userSchema.js");



router.post("/add", async (req, res) => {
  
  User.findOne({username:req.body.username},(err,thisUser)=>{
      if (!thisUser){
        User.create(req.body, (err, createdUser) => {
              
              res.send('ok')
        })
      }
  })
})
//curl -X POST -H "Content-Type:application/json" -d '{"username":"test", "password":"wq"}' https://travelapp2u-api.onrender.com/user/add

router.post("/verify",  (req, res) => {
  //console.log(req.sessionID)
  User.findOne({username:req.body.username}, (err, userFound) => {
    if (userFound) {
      if(req.body.password===userFound.password){

        const username = req.body.username
        const userDetails = { username: username}
        //const userDetails = userFound.toJSON();
          const token = jwt.sign(userDetails, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 1000* 60 * 60 * 24,
          });
            //if the token expires before the cookie does, verification later on will fail


          res.cookie("jwt",token,{
            httpOnly: false,
            maxAge: 1000*60*60*24,
            secure:true,
            sameSite:"none"
          })

          res.cookie("bridge",userFound.id,{
            maxAge: 1000*60*60*24
          })
          
          res.json({accessToken:token})
          //res.json({ username: username, token: token })
         // console.log(userFound.id)
        // console.log(req.headers)
        //console.log(req.cookies)
        //res.send('ok')
      }
    } else{
      res.send(err.message)
    }
  })
})
//curl -X POST -H "Content-Type:application/json" -d '{"username":"wq", "password":"wq"}' https://travelapp2u-api.onrender.com/user/verify

router.delete('/logout',(req,res)=>{
  req.session.destroy(
    ()=>{
      res.send('loggedOut')
    }
  )
})

module.exports = router;

//https://www.simplilearn.com/tutorials/nodejs-tutorial/jwt-in-express-js#:~:text=You%20will%20create%20an%20express,will%20create%20a%20JSON%20file

//https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
//https://blog.openreplay.com/sessions-management-and-authentication-with-node/

//https://www.youtube.com/watch?v=soGRyl9ztjI
//https://expressjs.com/en/api.html#res.cookie
//https://www.youtube.com/watch?v=DxeSGUM16_4

//https://jerrynsh.com/all-to-know-about-auth-and-cookies/#:~:text=JWT%20is%20simply%20a%20token,stop%20comparing%20JWT%20vs%20Cookie.
//https://dleroari.medium.com/learn-the-basics-of-json-web-tokens-jwt-and-how-it-works-in-practice-8b3b14cbe0f9




//session token = reference token
//jwt token = value token


// This is the code in the res.json() method that the res.send() method doesn't have:
// var app = this.app;
// var replacer = app.get('json replacer');
// var spaces = app.get('json spaces');
// var body = JSON.stringify(obj, replacer, spaces);