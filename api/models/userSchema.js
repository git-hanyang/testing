const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique:true},
  password: { type: String, required: true },
  
});

//to avoid duplicate name:1 will create username, name:0 will not create username


const User = mongoose.model("User", userSchema);

module.exports = User;
