const express = require("express");
const router = express.Router();
const User = require("../models/userSchema.js");
const Planar=require('../models/plannerSchema.js');


router.post("/verify",  (req, res) => {
  
    let findUser= async function (){
      User.findOne({username:req.body.username}, (err, userFound) => {
        if (err) {
          console.log("Unable to retrieve user" + err.message);
        } 
        else if (userFound && req.body.username != '' && req.body.password!=''){
          if(req.body.password===userFound.password){
              req.session.currentUser=userFound; //pass this value to session key
              console.log('verified')

              
                Planar.findOne({username:req.session.currentUser.username},(err,myPlanar)=>{
                  console.log(myPlanar)
                  res.redirect('/api/planner')
                })


                            
            }else{
              res.send('incorrect username or password');
          }
          }
        })}
            
  //   let myPlanner=  async function(){
  //     await findUser
  //     Planar.findOne({username:req.session.currentUser.username},(err,myPlanar)=>{
  //       console.log(myPlanar)
  //       res.redirect('/api/planner')
  //     })
  //   }
            
  // myPlanner()
              

})
          
    
 





// router.delete("/", (req, res) => {
//   req.session.destroy(() => {
//     res.redirect("/");
//   });
// });

module.exports = router;
