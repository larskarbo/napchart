module.exports = function (chart, ctx) {
  var helpers = chart.helpers
  var config = chart.config

  if(!config.drawFace){
    return
  }

  ctx.save()
  ctx.font = helpers.fontSize(chart, config.face.numbers.size)
  ctx.fillStyle = config.face.numbers.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  var endLane = chart.shape.lanes[chart.shape.lanes.length - 1]

  for (var i = 0; i <= 24; i = i + 4) {
    if (i == 24 && chart.shapeIsContinous) {
      return
    }
  	var p = helpers.minutesToXY(chart, i * 60, endLane.end + config.face.numbers.distance)
    ctx.fillText(i, p.x, p.y)
  }

  ctx.restore()
}
