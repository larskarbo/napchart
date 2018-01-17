module.exports = function (chart) {
  var ctx = chart.ctx
  var helpers = chart.helpers
  var config = chart.config

  ctx.save()

  ctx.fillStyle="black"

  var textPosition = {
  	x:chart.w/2,
  	y:chart.h/2 - 40
  }

  var colorTags = chart.data.colorTags
  colorTags.forEach(function(tagObj) {
  	textPosition.y += chart.config.fontSize * 1.5
  	var minutes = chart.data.elements.reduce((minutes, element) => {
  	  if(element.color == tagObj.color){
  	    return minutes + helpers.duration(element.start, element.end)
  	  }else{
  	    return minutes
  	  }
  	}, 0)
  	var text = tagObj.tag + ': ' + helpers.minutesToReadable(minutes)
    
  	ctx.fillText(text, textPosition.x, textPosition.y)

  	var width = ctx.measureText(text).width
  	var squarePosition = {
  		x: textPosition.x - width/2 - 15,
  		y: textPosition.y - 6
  	}
  	ctx.save()

    var squareSize = chart.config.fontSize
  	ctx.fillStyle = helpers.colorMap(chart, tagObj.color)
  	ctx.fillRect(squarePosition.x, squarePosition.y, squareSize, squareSize)
  	ctx.restore()
  })

  ctx.restore()
}