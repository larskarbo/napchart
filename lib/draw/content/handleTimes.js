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

    var arr = ['start', 'end']

    arr.forEach(function (startOrEnd) {
      var settings = config.content.handleTimes

      var radius = lane.end + settings.distance
      if (element.lane == 0) {
        var radius = lane.start - settings.distance
      }

      ctx.fillStyle = settings.color

      var position = helpers.minutesToXY(chart, element[startOrEnd], radius)
      textHelper.string(helpers.minutesToClock(chart, element[startOrEnd]), position.x, position.y, {
        size: config.fontSize.small,
        color: config.content.handleTimes.color
      })
    })

    ctx.restore()
  })
}
