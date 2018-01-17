var textHelper = require('../textHelper')

module.exports = function (chart) {
  var ctx = chart.ctx
  var helpers = chart.helpers
  var config = chart.config

  if (!config.text) return

  chart.data.elements.forEach(function (element) {
    var lane = chart.shape.lanes[element.lane]

    ctx.save()
    var middleMinutes = helpers.middlePoint(element.start, element.end)

    var radius = (lane.start + lane.end) / 2
    var textPosition = helpers.minutesToXY(chart, middleMinutes, radius)
    var duration = helpers.minutesToReadable(helpers.duration(element.start, element.end))

    textHelper.string(duration, textPosition.x, textPosition.y, {
      size: config.content.handleTimes.fontSize,
      color: 'white',
      background: helpers.colorMap(chart, element.color),
      roundedCorners: true
    })

    ctx.restore()
  })
}
