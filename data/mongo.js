var mongoose = require('mongoose');
var db = mongoose.createConnection('connection');
db.model('Venue', new Schema({name: 'name'}));
var Ticket = db.model('Ticket', new Schema());
var Venue = db.model('Venue');
