module.exports = function (chart) {
  var ctx = chart.ctx
  var helpers = chart.helpers
  var config = chart.config
  var data = chart.data

  return

  var element = data.elements.find(e => e.id == chart.selectedElement)
  if (typeof element === 'undefined') {
    return
  }
  var lane = chart.shape.lanes[element.lane]

  ctx.save()

  var arr = ['start', 'end']

  arr.forEach(function (startOrEnd) {
    var handlePosition = helpers.minutesToXY(chart, element[startOrEnd], lane.end - config.paddingLanes)

    ctx.globalAlpha = 0.5
    ctx.fillStyle = helpers.colorMap(chart, element.color)

    helpers.circle(chart, handlePosition, config.content.handles)
    ctx.fill()

    if (chart.isHover(element.id, startOrEnd) || chart.isActive(element.id, startOrEnd)) {
      ctx.globalAlpha = 0.2
      ctx.fillStyle = helpers.colorMap(chart, element.color)

      helpers.circle(chart, handlePosition, config.handlesClickDistance)
      ctx.fill()
    }
  })
  ctx.restore()
}
