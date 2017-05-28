var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var chartSchema = new Schema({
  id:  String,
  data: {
    elements: [
      {id: Number, start: Number, end: Number, typeName: String, text: String},
    ],
    types: [
      {
        name: String,
        style: String,
        lane: Number
      },
    ]
  }
});

chartSchema.pre('save', function(next) {
  this.id = idgen()
  next();
});

module.exports = mongoose.model('Chart', chartSchema)

function idgen(){
	alphabet = "abcdefghijklmnopqrstuwxyz0123456789";
	id='';
	for( var i=0; i < 5; i++ )
	id += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
	return id;
}