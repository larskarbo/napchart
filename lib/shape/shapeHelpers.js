
module.exports = function (Napchart) {
  var helpers = Napchart.helpers

  helpers.XYtoInfo = function (chart, x, y) {
    // will gather three things: minutes and distance and lane from basepoint
    var minutes, distance
    var shape = chart.shape

    // which element is the right sector

    var shapeElement = shape.elements.find(function (element) {
      if (element.type === 'arc') {
        var angle = helpers.angleBetweenTwoPoints(x, y, element.startPoint)
        if (angle >= element.startAngle && angle <= element.endAngle) {
          return true
        }
      } else if (element.type === 'line') {
        var angle1 = helpers.angleBetweenTwoPoints(x, y, element.startPoint)
        var angle2 = helpers.angleBetweenTwoPoints(x, y, element.endPoint)

        if (helpers.isInsideAngle(angle1, element.startAngle, element.startAngle + Math.PI / 2) &&
          helpers.isInsideAngle(angle2, element.startAngle - Math.PI / 2, element.startAngle)) {
          return true
        }
      }
      return false
    })

    if (typeof shapeElement === 'undefined') {
      throw new Err('uf')
    }
    // calculate the relative position inside the element
    // and find minutes
    var positionInShapeElement

    if (shapeElement.type === 'arc') {
      var angle = helpers.angleBetweenTwoPoints(x, y, shapeElement.startPoint)
      positionInShapeElement = helpers.getProgressBetweenTwoValues(angle, shapeElement.startAngle, shapeElement.endAngle)
    } else if (shapeElement.type === 'line') {
      var a = helpers.distanceFromPointToLine(x, y, shapeElement.startPoint, shapeElement.endPoint)
      var b = helpers.distance(x, y, shapeElement.startPoint)
      var length = Math.sqrt(b * b - a * a)
      positionInShapeElement = length / shapeElement.length
      if (isNaN(positionInShapeElement)) {
        // this happens sometimes because 0/0 == NaN
        positionInShapeElement = 0
      }
    }
    var minutes = helpers.duration(shapeElement.start, shapeElement.end) * positionInShapeElement + shapeElement.start

    if (shapeElement.type === 'arc') {
      distance = helpers.distance(x, y, shapeElement.startPoint)
    } else if (shapeElement.type === 'line') {
      distance = helpers.distanceFromPointToLine(x, y, shapeElement.startPoint, shapeElement.endPoint)
    }

    if (isNaN(minutes) || isNaN(distance)) {
      throw new 'ouch'()
    }

    var lanes = chart.shape.lanes
    var lane = lanes.findIndex(lane => (distance > lane.start && distance < lane.end))

    return {
      minutes,
      distance,
      lane
    }
  }

  helpers.minutesToXY = function (chart, minutes, radius) {
    var ctx = chart.ctx
    var shape = chart.shape

    var minutes = helpers.limit(minutes)
    // Find out which shapeElement we find our point in
    var shapeElement = shape.elements.find(function (element) {
      return helpers.isInside(minutes, element.start, element.end)
    })

    if (typeof shapeElement === 'undefined') {
      console.warn(Object.assign({}, chart.shape), minutes, radius)
      throw new 'shapeElement==undefined'()
    }
    // Decimal used to calculate where the point is inside the shape
    var positionInShape = helpers.getProgressBetweenTwoValues(minutes, shapeElement.start, shapeElement.end)

    if (shapeElement.type === 'line') {
      var basePoint = {
        x: shapeElement.startPoint.x + Math.cos(shapeElement.startAngle) * positionInShape * shapeElement.length,
        y: shapeElement.startPoint.y + Math.sin(shapeElement.startAngle) * positionInShape * shapeElement.length
      }
      var point = {
        x: basePoint.x + Math.cos(shapeElement.startAngle - Math.PI / 2) * radius,
        y: basePoint.y + Math.sin(shapeElement.startAngle - Math.PI / 2) * radius
      }
    } else if (shapeElement.type === 'arc') {
      var centerOfArc = shapeElement.startPoint
      var angle = positionInShape * shapeElement.radians
      var point = {
        x: centerOfArc.x + Math.cos(shapeElement.startAngle + angle - Math.PI / 2) * radius,
        y: centerOfArc.y + Math.sin(shapeElement.startAngle + angle - Math.PI / 2) * radius
      }
    }

    return point
  }

  helpers.createCurve = function (chart, start, end, radius, anticlockwise, callback) {
    var ctx = chart.ctx
    if (typeof anticlockwise === 'undefined') {
      var anticlockwise = false
    }
    // the reason for this silly function inside function: callback see at the end
    function createCurve (start, end) {
      var shape = helpers.clone(chart.shape)
      if (anticlockwise) {
        shape.elements.reverse()
      }
      start = helpers.limit(start)
      end = helpers.limit(end)

      // find out which shapeElement has the start and end
      var startElementIndex, endElementIndex
      shape.elements.forEach(function (element, i) {
        if (helpers.isInside(start, element.start, element.end)) {
          startElementIndex = i
        }
        if (helpers.isInside(end, element.start, element.end)) {
          endElementIndex = i
        }
      })

      var shapeElements = []
      // create iterable task array
      var taskArray = []
      var skipEndCheck = false
      var defaultTask
      if (anticlockwise) {
        defaultTask = {
          start: 1,
          end: 0
        }
      } else {
        defaultTask = {
          start: 0,
          end: 1
        }
      }

      if (typeof startElementIndex === 'undefined' || typeof endElementIndex === 'undefined') {
        console.log(shape, start, end)
        throw 'error: something is not right here'
      }

      for (var i = startElementIndex; i < shape.elements.length; i++) {
        var task = {
          shapeElement: shape.elements[i],
          start: defaultTask.start,
          end: defaultTask.end
        }

        if (i == startElementIndex) {
          task.start = helpers.getPositionBetweenTwoValues(start, shape.elements[i].start, shape.elements[i].end)
        }
        if (i == endElementIndex) {
          task.end = helpers.getPositionBetweenTwoValues(end, shape.elements[i].start, shape.elements[i].end)
        }
        if (i == startElementIndex && i == endElementIndex && (task.end > task.start && anticlockwise) || (task.end < task.start && !anticlockwise)) {
          // make sure things are correct when end is less than start
          if (taskArray.length == 0) {
            // it is beginning
            task.end = defaultTask.end
            skipEndCheck = true
          } else {
            // it is end
            task.start = defaultTask.start
          }
        }

        taskArray.push(task)

        if (i == endElementIndex) {
          if (skipEndCheck) {
            skipEndCheck = false
            // let it run a round and add all shapes
          } else {
            // finished.. nothing more to do here!
            break
          }
        }

        // if we reached end of array without having found
        // the end point, it means that we have to go to
        // the beginning again
        // ex. when start:700 end:300
        if (i == shape.elements.length - 1) {
          i = -1
        }
      }
      taskArray.forEach(function (task, i) {
        var shapeElement = task.shapeElement
        if (shapeElement.type === 'arc') {
          var shapeStart = shapeElement.startAngle - (Math.PI / 2)
          var start = shapeStart + (task.start * shapeElement.radians)
          var end = shapeStart + (task.end * shapeElement.radians)
          ctx.arc(shapeElement.startPoint.x, shapeElement.startPoint.y, radius, start, end, anticlockwise)
        } else if (shapeElement.type === 'line') {
          var startPoint = helpers.minutesToXY(chart, shapeElement.start + shapeElement.minutes * task.start, radius)
          var endPoint = helpers.minutesToXY(chart, shapeElement.start + shapeElement.minutes * task.end, radius)
          ctx.lineTo(startPoint.x, startPoint.y)
          ctx.lineTo(endPoint.x, endPoint.y)
        }
      })
    }
    if (typeof callback === 'undefined') {
      createCurve(start, end)
    } else {
      // callback makes it possible for this function to do two operations
      // instead of one, thus be able to draw when shape is a straight line
      if (!chart.shapeIsContinous && start > end) {
        createCurve(start, 1440)
        callback()

        chart.ctx.beginPath() // this is a hotfix
        createCurve(0, end)
        callback()
      } else {
        createCurve(start, end)
        callback()
      }
    }
  }

  helpers.createSegment = function (chart, outer, inner, start, end, callback) {
    function createSegment (start, end) {
      var ctx = chart.ctx
      ctx.beginPath()
      helpers.createCurve(chart, start, end, outer)
      helpers.createCurve(chart, end, start, inner, true)
      ctx.closePath()
    }

    if (typeof callback === 'undefined') {
      createSegment(start, end)
    } else {
      // callback makes it possible for this function to do two operations
      // instead of one, thus be able to draw when shape is a straight line
      if (!chart.shapeIsContinous && start > end) {
        createSegment(start, 1440)
        callback()

        createSegment(0, end)
        callback()
      } else {
        createSegment(start, end)
        callback()
      }
    }
  }
}
