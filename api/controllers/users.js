const express = require("express");

const router = express.Router();

const User = require("../models/userSchema.js");

router.post("/", (req, res) => {
  User.findOne({username:req.body.username},(err,thisUser)=>{
      if (!thisUser){
        User.create(req.body, (err, createdUser) => {
          res.redirect('/')
        })
      }
      else{
        res.send('username is taken')
      }
    })
  })


module.exports = router;
