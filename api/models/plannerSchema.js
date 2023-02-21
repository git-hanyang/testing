const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// const attractionSchema = new Schema({
//   category: { type: String },
//   date: { type: Date },
//   time: { type: Date },
// });

const plannerSchema = new Schema({
  id:{type:String},
  name: { type: String, default: "Untitled", required: true },
  travelPeriod: { 
    start: {type:String,required:false},
    end: {type:String,required:false}
  },
  destination: { type: String, required: false },
  data: [{type: Object}],
});



const Planner = mongoose.model("planner", plannerSchema);

module.exports = Planner;

//Schema has to be right, otherwise when getting data also will have trouble
//when getting data, the data will be filtered by schema first
