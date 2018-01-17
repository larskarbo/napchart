var textHelper = require('../textHelper')

module.exports = function (chart) {
  var ctx = chart.ctx
  var helpers = chart.helpers
  var config = chart.config

  if (!config.text) return

  chart.data.elements.forEach(function (element) {
    var text = element.text
    if (text.length == 0) {
      return
    }

    var lane = chart.shape.lanes[element.lane]

    ctx.save()
    var middleMinutes = helpers.middlePoint(element.start, element.end)
    if (helpers.duration(element.start, element.end) < 90) {
      middleMinutes = Math.max(middleMinutes, element.start + 40)
    }

    var radius = lane.end + chart.config.content.textDistance
    if (element.lane == 0) {
      var radius = lane.start - chart.config.content.textDistance
    }

    var textPosition = helpers.minutesToXY(chart, middleMinutes, radius)

    textHelper.string(element.text, textPosition.x, textPosition.y, {
      size: chart.config.fontSize,
      color: 'white',
      background: helpers.colorMap(chart, element.color)
    })

    ctx.restore()
  })
}
