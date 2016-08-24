const mongoose = require('mongoose');

mongoose.connect("localhost");

mongoose.connection.on('connected', function (error) {
  if (error) {
    return console.error(error);
  }
  return console.log("Helllooo :)");
})
