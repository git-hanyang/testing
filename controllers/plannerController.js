const express = require("express");
const router = express.Router();
const Planner = require("../models/plannerSchema");
const User = require("../models/userSchema.js");
const jwt=require("jsonwebtoken")
require("dotenv").config()

function authenticateToken (req,res,next){
  // console.log(req.headers)
  // console.log(req.session)
  const authHeader=req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token==null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err)return res.sendStatus(403)
    req.user= user
      next()
  })
}

//https://www.youtube.com/watch?v=mbsmsi7l3r4&t=1444s

router.get("/", authenticateToken, (req, res) => {
  //User.findOne({username:req.user})
  console.log(req.cookies.bridge)
  console.log(req.user)
  Planner.find({id:req.cookies.bridge}, (err, myPlanner) => {
    //console.log(req.session.currentUser.username)
    if (err) {
      res.status(400).send({ err: err.message });
    } else {
      res.status(200).send(myPlanner);
    }
  });
});

router.get("/:id",authenticateToken, (req, res) => {
  Planner.findOne({_id : req.params.id}, (err, myPlanner) => {
    if (err) {
      res.status(400).send({ err: err.message });
    } else {
      res.status(200).send(myPlanner);
    }
  });
});





//***************************To Create/Insert The Attraction ********************//

router.post("/", authenticateToken, (req, res) => {
  const plannerData={
    //username:req.user,
    data:[],
    ...req.body
  }
  //console.log(req.session)
  Planner.create(plannerData, (err, createdPlanner) => {
    if (err) {
      console.log(err)
      res.status(400).send({ err: err.message });
    } else {
      res.send(createdPlanner);
    }
  });
});

//curl -H "Content-Type:application/json" -d '{"name":"testing","destination":"testing"}' -X POST http://
// localhost:3000/api/planner

//***************************To Delete The Attraction ****************************//

router.delete("/:id", (req, res) => {
  Planner.findByIdAndDelete(req.params.id, (err, deletePlanner) => {
    if (err) {
      res.status(400).send({ err: err.message });
    } else {
      res.send(deletePlanner);
    }
  });
});

//curl -X DELETE http://localhost:3000/api/planner/6353fac2cec9b2e5acc1c11b

//***************************To Update The Attraction *****************************//

router.put("/:id", authenticateToken,(req, res) => {
  console.log(req.params.id)
  Planner.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedPlanner) => {
      if (err) {
        res.status(400).send({ err: err.message });
      } else {
        res.status(200).send(updatedPlanner);
      }
    }
  );
});

//curl tested
//curl -H "Content-Type:application/json" -d '{"username":"testing123","destination":"hello"}' -X POST http://localhost:3003/api/planner

module.exports = router;
