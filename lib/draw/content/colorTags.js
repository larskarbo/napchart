var textHelper = require('../textHelper')
module.exports = function (chart) {
  var ctx = chart.ctx
  var helpers = chart.helpers
  var config = chart.config
  
  ctx.save()

  ctx.fillStyle="black"
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
    ctx.font = helpers.fontSize(chart, config.fontSize.medium)

    ctx.fillText(text, textPosition.x, textPosition.y)

    var squareSize = config.fontSize.medium

  	var width = ctx.measureText(text).width
  	var squarePosition = {
  		x: textPosition.x - width/2 - squareSize - config.fontSize.medium/2,
  		y: textPosition.y - config.fontSize.medium/2
  	}
  	ctx.save()

  	ctx.fillStyle = helpers.colorMap(chart, tagObj.color)
  	ctx.fillRect(squarePosition.x, squarePosition.y, squareSize, squareSize)
  	ctx.restore()
  })

  ctx.restore()
}