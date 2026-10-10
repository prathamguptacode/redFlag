import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  redFlags: {
    type: Number,
    default: 0
  },
  greenFlags: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String,
    required: true
  },
  display: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})
export default mongoose.model("Users", userSchema)
