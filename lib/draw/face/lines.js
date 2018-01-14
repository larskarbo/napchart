module.exports = function (chart, ctx) {
  var helpers = chart.helpers
  var config = chart.config
  var lanes = chart.shape.lanes

  if(!config.drawFace){
    return
  }

  ctx.lineWidth = config.face.stroke
  ctx.save()

  // every hour normal

  // ctx.strokeStyle = config.face.strokeColor
  // ctx.beginPath()

  // for (var i = 0; i < 24; i++) {
  // 	var s = helpers.minutesToXY(chart, i * 60, lanes[lanes.length - 1].end)
  // 	var e = helpers.minutesToXY(chart, i * 60, lanes[lanes.length - 1].end + 15 + config.face.hourStrokesLength)
  //   ctx.moveTo(s.x, s.y)
  //   ctx.lineTo(e.x, e.y)
  // }
  // ctx.stroke()

  // every hour weak

  ctx.strokeStyle = config.face.weakStrokeColor
  ctx.setLineDash([2, 4])

  ctx.beginPath()

  for (var i = 0; i <= 24; i++) {
    if (i == 24 && chart.shapeIsContinous) {
      continue
    }
    var s = helpers.minutesToXY(chart, i * 60, lanes[0].start)
    var e = helpers.minutesToXY(chart, i * 60, lanes[lanes.length - 1].end)
    ctx.moveTo(s.x, s.y)
    ctx.lineTo(e.x, e.y)
  }
  ctx.stroke()
  ctx.setLineDash([])

  // important hours

  // ctx.lineWidth = config.face.importantLineWidth
  // ctx.strokeStyle = config.face.importantStrokeColor
  // ctx.beginPath()

  // for(var i=0;i<=24;i = i+4){
  //   if(i == 24 && chart.shapeIsContinous){
  //     continue
  //   }
  //   var s = helpers.minutesToXY(chart, i*60, 25)
  //   var e = helpers.minutesToXY(chart, i*60, lanes[lanes.length - 1].end + config.face.hourStrokesLength)
  //   ctx.moveTo(s.x,s.y)
  //   ctx.lineTo(e.x,e.y)
  // }

  // ctx.stroke()

  // every 10 minutes

  /*
  ctx.strokeStyle = config.face.strokeColor
  ctx.beginPath()

  for(var i=0;i<1440/10;i++){
    var s = helpers.minutesToXY(chart, i*10, lanes[lanes.length - 2].end)
    var e = helpers.minutesToXY(chart, i*10, lanes[lanes.length - 2].end + config.face.tenMinuteStrokesLength)
    ctx.moveTo(s.x,s.y)
    ctx.lineTo(e.x,e.y)
  }
  ctx.stroke()
  ctx.beginPath()
  */

  // every 5 minutes

  /*
  ctx.strokeStyle = config.face.strokeColor
  ctx.beginPath()

  for(var i=0.5;i<1440/10;i++){
    var s = helpers.minutesToXY(chart, i*10, lanes[lanes.length - 2].end)
    var e = helpers.minutesToXY(chart, i*10, lanes[lanes.length - 2].end + config.face.fiveMinuteStrokesLength)
    ctx.moveTo(s.x,s.y)
    ctx.lineTo(e.x,e.y)
  }

  ctx.stroke()
  */

  ctx.restore()
}
