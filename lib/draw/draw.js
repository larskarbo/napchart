
module.exports = function (Napchart) {
  // textHelper
  var textHelper = require('./textHelper')

  Napchart.draw = {
    fullDraw: fullDraw,
    drawFrame: draw,
    benchmark: benchmark
  }

  var clear = require('./clear')

  var tasks = [

    // - face

    function (chart) {
      if (typeof chart.ocanvas !== 'undefined') {
        chart.ctx.drawImage(chart.ocanvas, 0, 0)
      }
    },

    // - content

    // -- bars
    require('./content/bars'),
    // -- handles
    require('./content/handles'),
    // -- handleTimes
    require('./content/handleTimes'),
    // -- text
    require('./content/text'),
    // -- durations
    require('./content/durations'),
    // -- distances
    require('./content/distances'),
    // -- pen
    require('./content/pen'),
    // -- colorTags
    require('./content/colorTags'),
    // -- text strings
    textHelper.writeAll
  ]

  var faceTasks = [
    // -- circles
    require('./face/background'),
    // -- circles
    require('./face/circles'),
    // -- lines
    require('./face/lines'),
    // -- numbers
    require('./face/numbers')
  ]

  function fullDraw (chart) {
    var ctx = chart.ctx

    ctx.font = chart.config.fontSize + 'px ' + chart.config.font
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    clear(chart)

    if (typeof document === 'undefined') {
      // we are in a node environment
      // dont do the offscreen thing
      faceTasks.forEach(function (task) {
        task(chart, chart.ctx)
      })
      tasks.forEach(function (task) {
        task(chart, chart.ctx)
      })
    } else {
      chart.ocanvas = document.createElement('canvas')
      chart.ocanvas.width = chart.width
      chart.ocanvas.height = chart.height
      var octx = chart.ocanvas.getContext('2d')

      // here I create a sligthly modified chart object faceChart
      // please don't get confused by this, you should really
      // just think that there is one chart object to rule
      // them all (each instance)
      var faceChart = Object.assign({}, chart, {ctx: octx})
      faceTasks.forEach(function (task) {
        task(faceChart, octx)
      })

      draw(chart)
    }
  }

  // mini function that draws only the things
  // that usually change
  // (does not update clock-face, settings, shape etc)
  function draw (chart) {
    clear(chart)

    tasks.forEach(function (task) {
      task(chart, Napchart)
    })
  }

  function benchmark (chart) {
    var iterations = 1000
    var bigstart = Date.now()
    for (task in tasks) {
      var start = Date.now()
      for (var i = 0; i < iterations; i++) {
        tasks[task](chart, Napchart)
      }
      var end = Date.now()
      console.log(`${task} x ${iterations} ` + (end - start) + ' ms')
    }
    var bigend = Date.now()
    console.log(`Total: ` + (bigend - bigstart) + ' ms')
    console.log(`One round: ` + ((bigend - bigstart) / iterations) + ' ms')
  }
}
