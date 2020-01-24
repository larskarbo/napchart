var textHelper = require('../textHelper')

module.exports = function (chart) {
  var ctx = chart.ctx
  var helpers = chart.helpers
  var config = chart.config

  if (!config.text) return

  chart.data.elements.forEach(function (element) {
    var lane = chart.shape.lanes[element.lane]
    if(element.animProgress < 0.4){
      return
    }
    ctx.save()
    var middleMinutes = helpers.middlePoint(element.start, element.end)

    var radius = (lane.start + lane.end) / 2
    var textPosition = helpers.minutesToXY(chart, middleMinutes, radius)
    var duration = helpers.minutesToReadable(helpers.duration(element.start, element.end))
    // ctx.globalAlpha = element.animProgress
    
    textHelper.string(element.text, textPosition.x, textPosition.y, {
      size: config.fontSize.medium,
      color: 'white',
      background: helpers.colorMap(chart, element.color),
      roundedCorners: true
    })

    ctx.restore()
  })
}
