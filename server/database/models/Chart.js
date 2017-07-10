var mongoose = require('mongoose')

var Schema = mongoose.Schema

var chart = new Schema({
  id: String,
  chartData: {
    elements: [
      {
        id: Number,
        start: Number,
        end: Number,
        typeId: Number,
        text: String,
        lane: Number,
        _id: false
      }
    ],
    types: [
      {
        name: String,
        style: String,
        id: Number,
        _id: false
      }
    ],
    shape: String
  },
  metaInfo: {
    title: String,
    description: String
  }
})

chart.pre('save', function (next) {
  if(typeof this.id == 'undefined'){
    this.id = idgen()
  }
  next()
})

module.exports = mongoose.model('Chart', chart)

function idgen () {
  alphabet = 'abcdefghijklmnopqrstuwxyz0123456789'
  id = ''
  for (var i = 0; i < 5; i++) { id += alphabet.charAt(Math.floor(Math.random() * alphabet.length)) }
  return id
}
