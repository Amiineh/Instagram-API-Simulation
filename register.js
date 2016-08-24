'use strict'

const mongoose = require('mongoose');
var express = require('express');
var app = express();
const userSchema = require("./userSchema").userSchema;

mongoose.connect("localhost/test"); // zeshteeeeeeh :)
var db = mongoose.connection;

db.on('connected', function (error) {
  if (error) {
    return console.error(error);
  }
  return console.log("Helllooo MongooDB :)");
})

//make random 128 bit number strings for tokens
function random128() {
  var result = "";
  for (var i = 0; i < 8; i++)
    result += String.fromCharCode(Math.random() * 0x10000);
  return result;
}

app.get('/register', function(req, res){
  console.log("Got a get request for register");
  res.send("please insert your deviceId to register");
})

app.post('/register', function(req, res){
  console.log("Got a post request for register");
  let deviceId = req.headers["deviceid"];
  let UserModel = mongoose.model("Users", userSchema);

  console.log("count headers", (deviceId + "").length);
  if ( (deviceId + "").length !== 8) {
    res.send({result: "invalid device id (it must be 8 bytes)", bytes: (deviceId + "").length});
  } else {

  UserModel.count({deviceId: deviceId}, function (err, count) {
    if (err) {
      console.log(err);
    }else {
      if(count > 0){
        res.send({result: "user already exists! :("});
      } else {
        let token = random128();
        let user = new UserModel({deviceId: deviceId, token: token});
        user.save(function(err){
          console.log(err);
        });
        res.send({result: "registeration was successful! :)", userToken: token });
      }
    }
  })
}
})

app.post('/allMedia', function(req, res){
  let token = req.headers["token"];
  let UserModel = mongoose.model("Users", userSchema, "Users");

  UserModel.findOne({userToken: token}, function(err, user){
    if (err) {
      res.send({result: "invalid token"});
      console.error(error);
    } else {
      let mediaAdrs = [];
      for (let i = 0; i < user.medias.length; i++) {
        mediaAdrs.push(user.medias[i].mediaAdrs);
      }
      res.send({result: "show media successful", media: mediaAdrs});  //this prints only one media adrs
    }
  });
})

app.post('/remove', function(req, res){
  let token = req.headers["token"];
  let mediaId = req.query["MId"];
  let UserModel = mongoose.model("Users", userSchema, "Users");

  UserModel.findOne({userToken: token}, function(err, user){
    if (err) {
      console.log(err);
      res.send({result: "invalid token."})
    } else {
      let isFound = false;
      for (let i = 0; i < user.medias.length; i++) {
        if (user.medias[i].mediaId === mediaId) {
          user.medias = user.medias.splice(i - 1, 1);
          isFound = true;
          user.save(function (err, newUser) {
            if (err) {
              res.send(403); /// zeshteeeeeeh :|
            }else{
              res.send({result: "media deleted successfully", "medias": user.medias, removed: 1});
            }
          })
          break;
        } // end of if
      } // end of for
      if (!isFound) {
        res.send({result: "invalid media id"});
      }
    }// end of else
    }); // end of findOne

})

app.listen(8000, function (err) {
  console.log("we are on 8000 :|");
})
