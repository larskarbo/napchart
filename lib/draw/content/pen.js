module.exports = function (chart) {
  var ctx = chart.ctx
  var helpers = chart.helpers
  var config = chart.config
  if (chart.isPen()) {
  	var minutes = chart.mousePenLocation.minutes
  	var lane = chart.shape.lanes[chart.mousePenLocation.lane]

  	ctx.save()
  	ctx.fillStyle = chart.config.defaultColor
  	ctx.globalAlpha = 0.5
  	helpers.createSegment(chart, lane.end - config.paddingLanes, lane.start + config.paddingLanes, minutes - 1, minutes + 1, function () {
  	  ctx.fill()
  	})

  	ctx.restore()
  }
}
