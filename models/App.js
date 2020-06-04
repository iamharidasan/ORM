const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AppSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  appName: {
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
    required: true,
    unique: true,
  },
  packageName: {
    type: String,
    required: true,
  },
  privateKey: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = User = mongoose.model("apps", AppSchema)
