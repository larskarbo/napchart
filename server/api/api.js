
var database = require('../database/database')
var getImage = require('./getImage')

module.exports = {
  create: function (req, res) {
    var data = JSON.parse(req.body.data)
    console.log(data)
    database.createChart(data, function (err, response) {
      if (err) throw new Error(err)

      res.send(response)
    })
  },

  get: function (req, res) {
    var chartid = req.query.chartid

    database.getChart(chartid, function (err, response) {
      if (err) throw new Error(err)

      res.send(response)
    })
  },

  getImage: getImage
}
