
module.exports = function (Napchart) {
  var helpers = Napchart.helpers

  helpers.strokeSegment = function (chart, start, end, config) {
  	var ctx = chart.ctx
  	ctx.save()
  	ctx.strokeStyle = config.color
  	ctx.lineWidth = chart.config.bars.general.stroke.lineWidth
  	ctx.lineJoin = 'mittel'

  	helpers.createSegment(chart, config.outerRadius, config.innerRadius, start, end)

  	ctx.stroke()
  	ctx.restore()
  }

  helpers.colorMap = function(chart, color) {
    if(color.includes('#')){
      return color
    } else {
      return chart.config.colorMap[color]
    }
  }

  helpers.fillRectRounded = function (chart, x, y, width, height) {
    var cornerRadius = chart.config.cornerRadius
    var ctx = chart.ctx
    ctx.save()

    // stroke edges give rounded effect
    ctx.strokeStyle = ctx.fillStyle
    ctx.lineJoin = 'round'
    ctx.lineWidth = cornerRadius
    ctx.strokeRect(x + (cornerRadius / 2), y + (cornerRadius / 2), width - cornerRadius, height - cornerRadius)

    ctx.restore()
  }

  helpers.circle = function (chart, point, radius) {
    var ctx = chart.ctx
    ctx.beginPath()
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2)
    ctx.closePath()
  }

  helpers.fillCircle = function (chart, point, radius) {
    var ctx = chart.ctx
    this.circle(chart, point, radius)
    ctx.fill()
  }

  helpers.fontSize = function (chart, size) {
    return `${size}px ${chart.config.font}`
  }
}
