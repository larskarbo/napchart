/*
*
* Shape module
*
*/

var shapes = require('./shapes')
var calculateShape = require('./calculateShape')
var animateShape = require('./animateShape')

module.exports = function (Napchart) {
  var helpers = Napchart.helpers
  var currentShape

  Napchart.shape = {
    initShape: function (chart) {
      setShape(chart, chart.data.shape)
    },
    changeShape: function (chart, to) {
      changeShape(chart, to)
    }
  }

  function setShape (chart, shape) {
    if (typeof shape === 'string') {
      currentShape = shape
      shape = shapes[shape]
    }
    chart.shape = calculateShape(chart, shape)
  }

  function changeShape (chart, wantToShape) {
    // we are this shape:
    var currentShape = chart.data.shape

    // make a sequence of shapes for smoother animations
    var shapeSequenze = [wantToShape] // default to direct
    if (currentShape == 'circle') {
      if (wantToShape == 'line') {
        shapeSequenze = ['transitionShape', 'line']
      }
    } else if (currentShape == 'wide') {
      if (wantToShape == 'line') {
        shapeSequenze = ['circle', 'transitionShape', 'line']
      }
    } else if (currentShape == 'line') {
      if (wantToShape == 'wide') {
        shapeSequenze = ['transitionShape', 'circle', 'wide']
      } else if (wantToShape == 'circle') {
        shapeSequenze = ['transitionShape', 'circle']
      }
    }

    var index = 0
    function next () {
      var oldShape = helpers.clone(shapes[currentShape])
      var newShape = helpers.clone(shapes[shapeSequenze[index]])
      var globalProgress = {
        count: shapeSequenze.length
      }
      animateShape(chart, oldShape, newShape, globalProgress, function () {
        currentShape = shapeSequenze[index]
        index++
        if (index < shapeSequenze.length) {
          next()
        }
      })
    }

    next()
  }
}
