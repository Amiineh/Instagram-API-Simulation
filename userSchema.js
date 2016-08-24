const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  deviceId: Number,
  userToken: String,
  medias: [{
    mediaId: Number,
    mediaAdrs: String,
    mediaDate: Date,
    mediaLikes: Number
  }]
});

module.exports.userSchema = userSchema;
