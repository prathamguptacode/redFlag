import mongoose from "mongoose";
const anonymus = new mongoose.Schema({
  redFlags: [{
    // type: mongoose.Types.ObjectId,
    // ref: "users",
    type: String,
  }],
  greenFlags: [{
    // type: mongoose.Types.ObjectId,
    // ref: "users",
    type: String,
  }],
  likedComments: [String]
})
export default mongoose.model("anonymus", anonymus)
