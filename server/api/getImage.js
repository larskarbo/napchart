var database = require('../database/database')
var Napchart = require('napchart-canvas')

module.exports = function (req, res) {
  var chartid = req.query.chartid
  var width = req.query.width * 1 // * 1 to ensure they are numbers not strings
	var height = req.query.height * 1
  var shape = req.query.shape

  if(
    typeof chartid == 'undefined' ||
    typeof width == 'undefined' ||
    typeof height == 'undefined'){
    return res.send('Invalid request')
  }

  var Canvas = require('canvas')
  var Image = Canvas.Image
  var canvas = new Canvas(width, height)
  var ctx = canvas.getContext('2d')

	database.getChart(chartid, function (err, response) {
	  if (err) throw new Error(err)
    
    var types = response.chartData.types.reduce(function(returnObj, input) {
      returnObj[input.id] = input;
      return returnObj;
    }, {})

    if(typeof shape == 'undefined'){
      shape = response.chartData.shape
    }

    var chartData = {
      elements: response.chartData.elements,
      types,
      shape: shape
    }

    var mynapchart = Napchart.init(ctx, chartData, {interaction:false})

    // return res.send('iji')
    canvas.pngStream().pipe(res)
	})
}