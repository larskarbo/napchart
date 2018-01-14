// not really used in the program but I used it for generating the logo
// and it might be useful in the future for dynamic favicons

module.exports = function (chart, ctx) {
  var lanes = chart.shape.lanes
  var helpers = chart.helpers

  ctx.fillStyle='white'
  helpers.createSegment(chart, 0, chart.config.edgeRadius, 0, 1440, function () {
	  ctx.fill()
	})
}
