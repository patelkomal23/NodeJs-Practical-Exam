const { Schema, default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({})

const Comment = mongoose.model('comment',commentSchema)
module.exports = Comment