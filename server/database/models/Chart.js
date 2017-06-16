var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var chart = new Schema({
  id:  String,
  data: {
    elements: [
      {id: Number, start: Number, end: Number, typeName: String, text: String, _id: false},
    ],
    types: [
      {
        name: String,
        style: String,
        lane: Number,
        _id: false
      },
    ]
  }
});

chart.pre('save', function(next) {
  this.id = idgen()
  next();
});

module.exports = mongoose.model('Chart', chart)

function idgen(){
	alphabet = "abcdefghijklmnopqrstuwxyz0123456789";
	id='';
	for( var i=0; i < 5; i++ )
	id += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
	return id;
}