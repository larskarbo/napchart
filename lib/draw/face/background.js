module.exports = function (chart, ctx) {
  if (chart.config.background != 'transparent') {
    ctx.save()
    ctx.fillStyle = chart.config.background

    ctx.fillRect(0, 0, chart.w, chart.h)

    ctx.restore()
  }
}
