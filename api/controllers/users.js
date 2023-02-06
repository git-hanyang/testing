const express = require("express");
require("dotenv").config()

const router = express.Router();
const jwt=require("jsonwebtoken")
const User = require("../models/userSchema.js");
// const cookieParser=require("cookie-parser")
// router.use(cookieParser())

const oneDay=1000*60*60*24
const createToken=(user)=>{
  return jwt.sign({user:user},"hy super secret key",(err,token)=>{
    res.json({token:user})
    
  })
}

router.post("/add", async (req, res) => {
  
  User.findOne({username:req.body.username},(err,thisUser)=>{
      if (!thisUser){
        User.create(req.body, (err, createdUser) => {
          
              // const user=createdUser
              // const token= createToken(user); //create token for this userFound

              // res.cookie("jwt",token,{
              //   withCredentials:true,
              //   httpOnly: false,
              //   maxAge: oneDay
              // })
            
              //res.status(201).json({user:user, created:true})
              
              res.send('ok')
        })
      }
  })
})

router.post("/verify",  (req, res) => {
  console.log(req.sessionID)
  User.findOne({username:req.body.username}, (err, userFound) => {
    if (userFound) {
      if(req.body.password===userFound.password){

        const username = req.body.username
        const userDetails = { user: username}
        //const userDetails = userFound.toJSON();
          const token = jwt.sign(userDetails, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 1000* 60 * 20,
          });

          //res.json({accessToken:token})
          res.cookie("jwt",token,{
            httpOnly: false,
            maxAge: 1000*60*20
          })
          //console.log(token)
          res.json({ username: username, token: token })

        console.log(userFound)
        //res.send('ok')
      }
    } 
  })
})

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

//session token = reference token
//jwt token = value token