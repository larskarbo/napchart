// var textHelper = require('../textHelper')

module.exports = function (chart, ctx) {
  var helpers = chart.helpers
  var config = chart.config

  if(!config.drawFace){
    return
  }

  ctx.save()
  ctx.font = helpers.fontSize(chart, config.fontSize.big)
  ctx.fillStyle = config.face.numbers.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  var endLane = chart.shape.lanes[chart.shape.lanes.length - 1]

  for (var i = 0; i <= 24; i = i + 4) {
    if (i == 24 && chart.shapeIsContinous) {
      return
    }
  	var p = helpers.minutesToXY(chart, i * 60, endLane.end + config.face.numbers.distance)

    var text = i

    if(config.ampm){
      if(text == 0){
        text = 'midnight'
      } else if (text < 12) {
        text = text + ' am'
      } else if(text == 12){
        text = 'noon'
      } else if(text > 12){
        text = text - 12 + ' pm'
      }
    }

    ctx.fillText(text, p.x, p.y)

  }

  ctx.restore()
}
