module.exports = function (chart) {
  var ctx = chart.ctx
  var helpers = chart.helpers
  var config = chart.config

  // fill
  chart.data.elements.forEach(function (element) {
    var lane = chart.shape.lanes[element.lane]
    ctx.save()
    ctx.fillStyle = helpers.colorMap(chart, element.color)
    if (chart.isActive(element.id, 'middle')) {
      ctx.globalAlpha = 0.9
    }

    helpers.createSegment(chart, lane.end - config.paddingLanes, lane.start + config.paddingLanes, element.start, element.end, function () {
      ctx.fill()
    })

    ctx.restore()
  })
}
