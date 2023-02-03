const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const attractionSchema = new Schema({
  category: { type: String },
  date: { type: Date },
  time: { type: Date },
});

const plannerSchema = new Schema({
  username:{type:String, required:true},
  id: { type: String },
  plannerName: { type: String, default: "Untitled", required: true },
  travelPeriod: { type: String },
  destination: { type: String, required: true },
  data: [attractionSchema],
});



const Planner = mongoose.model("planner", plannerSchema);

module.exports = Planner;
