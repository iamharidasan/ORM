const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ReplySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  reply: {
    type: String,
    required: true,
  },
  review: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Reply = mongoose.model("reply", ReplySchema)
