import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  to: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
}, { timestamps: true })
export default mongoose.model("Comments", commentSchema)
