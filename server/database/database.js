
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
})

var Chart = require('./models/Chart')

module.exports = {
  createChart: function (data, callback) {
    var chart = new Chart(data)

    chart.save(function (err, response) {
      callback(err, response)
    })
  },

  getChart: function (chartid, callback) {
    console.log(chartid)
    Chart.findOne({id: chartid}, callback)
  }
}
