var textHelper = require('../textHelper')
module.exports = function (chart) {
  var ctx = chart.ctx
  var helpers = chart.helpers
  var config = chart.config

  ctx.save()

  ctx.fillStyle="black"
console.log(chart.shape.laneMinRadius/2)
  var textPosition = helpers.minutesToXY(chart, chart.shape.centerMinutes, chart.shape.lanes[0].start - chart.shape.laneMinRadius/2 * chart.ratio)

  var colorTags = chart.data.colorTags
  colorTags.forEach(function(tagObj) {
  	textPosition.y += config.colorTagsSize * 1.5
  	var minutes = chart.data.elements.reduce((minutes, element) => {
  	  if(element.color == tagObj.color){
  	    return minutes + helpers.duration(element.start, element.end)
  	  }else{
  	    return minutes
  	  }
  	}, 0)
  	var text = tagObj.tag + ': ' + helpers.minutesToReadable(minutes)
    textHelper.string(text, textPosition.x, textPosition.y, {
      size: config.colorTagsSize,
      color: 'black'
    })

    var squareSize = config.colorTagsSize

  	var width = ctx.measureText(text).width
  	var squarePosition = {
  		x: textPosition.x - width/2 - squareSize - config.colorTagsSize/2,
  		y: textPosition.y - config.colorTagsSize/2
  	}
  	ctx.save()

  	ctx.fillStyle = helpers.colorMap(chart, tagObj.color)
  	ctx.fillRect(squarePosition.x, squarePosition.y, squareSize, squareSize)
  	ctx.restore()
  })

  ctx.restore()
}