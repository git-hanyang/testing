const express = require("express");
const router = express.Router();
const Planner = require("../models/plannerSchema");



router.get("/", (req, res) => {
  Planner.find({}, (err, myPlanner) => {
    //console.log(req.session.currentUser.username)
    
    if (err) {
      res.status(400).send({ err: err.message });
    } else {
      res.status(200).send(myPlanner);
    }
  });
});

router.get("/:id", (req, res) => {
  Planner.findOne({_id : req.params.id}, (err, myPlanner) => {
    if (err) {
      res.status(400).send({ err: err.message });
    } else {
      res.status(200).send(myPlanner);
    }
  });
});




//***************************To Create/Insert The Attraction ********************//




//***************************To Create/Insert The Attraction ********************//

router.post("/", (req, res) => {
  Planner.create(req.body, (err, createdPlanner) => {
    if (err) {
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

router.put("/:id", (req, res) => {
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
