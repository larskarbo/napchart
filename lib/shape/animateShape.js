var calculateShape = require('./calculateShape')

module.exports = function animateShape (chart, shape, newShape, globalProgress, callback) {
  var helpers = chart.helpers

  // here is how it works:
  // takes newShape and makes it look like the old shape
  // then animate the values of shape to be like newShape

  newShape.elements.forEach(function (element) {
    if (element.type == 'line') {
      var property = 'percent'
    } else {
      var property = 'radians'
    }

    // find an element that is similar and remove it from old shape
    var elementFromOldShape = shape.elements.find(function (e, i) {
      if (element.type === e.type) {
        return shape.elements.splice(i, 1)
      }
    })
    if (typeof elementFromOldShape === 'undefined') {
      // we have to make one
      elementFromOldShape = {
        [property]: 0,
        type: element.type
      }
    }

    element.animation = {
      start: elementFromOldShape[property],
      end: element[property],
      property: property
    }
  })

  // if there still are elements in the old shape,
  // that means that we have to add them in now (they will be killed)
  shape.elements.forEach(function (element) {
    if (element.type == 'line') {
      var property = 'percent'
    } else {
      var property = 'radians'
    }

    newShape.elements.push({
      type: element.type,
      animation: {
        start: element[property],
        end: 0,
        property: property
      }
    })
  })

  // other animations
  var propsToAnimate = ['shift', 'shiftDown', 'laneMinRadius', 'laneMaxRadius', 'maxLaneSize', 'centerMinutes']
  newShape.propAnimations = propsToAnimate.map(prop => {
    return {
      prop,
      start: shape[prop],
      end: newShape[prop],
      duration: newShape[prop] - shape[prop]
    }
  })

  var timeShouldUse = 350
  var startTime = Date.now()
  var endTime = startTime + timeShouldUse

  function every () {
    var nowTime = Date.now()
    var progress = Math.min(1, (nowTime - startTime) / timeShouldUse)

    progress = applyEasing(progress)

    newShape.elements.forEach(function (element, i) {
      var duration = element.animation.end - element.animation.start
      element[element.animation.property] = element.animation.start + duration * progress
    })

    // prop animations
    newShape.propAnimations.forEach(anim => {
      newShape[anim.prop] = anim.start + anim.duration * progress
    })

    chart.shape = calculateShape(chart, newShape)
    chart.needFullRedraw = true
    chart.draw()

    if (progress < 1) {
      window.requestAnimationFrame(every)
    } else {
      callback()
    }
  }

  every()

  function applyEasing (progress) {
    // return progress
    return helpers.easingEffects.easeInOutQuad(progress)
  }
}
