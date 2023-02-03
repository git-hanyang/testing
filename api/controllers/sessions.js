const express = require("express");
const router = express.Router();
const User = require("../models/userSchema.js");
const Planar=require('../models/plannerSchema.js');
const { redirect } = require("react-router-dom");

router.post("/verify", async (req, res) => {

  try{
   await User.findOne({username:req.body.username}, (err, userFound) => {
      if (err) {
        console.log("Unable to retrieve user" + err.message);
      } 
      if (userFound && req.body.username != '' && req.body.password!=''){
        if(req.body.password===userFound.password){
            req.session.currentUser=userFound; //pass this value to session key
            console.log('verified')
            // res.send(userFound);
            Planar.findOne({username:req.session.currentUser.username},(err,myPlanar)=>{
              console.log(myPlanar)
              res.redirect('/')
            })
          }
          else{
              res.send('incorrect username or password');
          }
      }else{
        res.send('user id / password is wrong')
      }
    })
  }
  catch(err){
    console.log(err)
  }
})





// router.delete("/", (req, res) => {
//   req.session.destroy(() => {
//     res.redirect("/");
//   });
// });

module.exports = router;
