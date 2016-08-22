var express = require('express');
var app = express();

app.get('/register', function(req, res){
  console.console.log("Got a get request from homepage");
  res.send('This is the register page');
})

app.post('/register', function(req, res){
  console.console.log("Got a post request for register");
  var deviseId = req.header;
  //TODO check if deviseId is 64bits
  //TODO: check mongoDB if it's new user
  var token;
  //TODO make random 128 bit string
  res.send({result: "ok", user-token: token.toString()});
})

app.get('/allMedia', function(req, res){
  var token = req.header;
  //TODO if token is real
  //TODO get media from mongoDB
  //TODO find out how many medias the user has and send them:
  res.send({result: "successful", })
})

app.get('/remove', function(req, res){
  var token = req.header;
  var mediaId = req.query;
  //TODO if token and MId existed in the mongoDB, result = successful, else unsuccessful
})
