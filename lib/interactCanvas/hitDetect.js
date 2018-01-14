module.exports = function hitDetect (chart, coordinates) {
  var canvas = chart.canvas
  var data = chart.data
  var helpers = chart.helpers

    // will return:
    // element
    // type (start, end, or middle)
    // distance

  var hit = {}

    // hit detection of handles:

  var distance

  data.elements.forEach(function (element) {
    var lane = chart.shape.lanes[element.lane]

      // if element is not selected, continue
    if (!chart.isSelected(element.id)) {
      return
    }
    ['start', 'end'].forEach(function (startOrEnd) {
      var point = helpers.minutesToXY(chart, element[startOrEnd], lane.end)

      distance = helpers.distance(point.x, point.y, coordinates)
      if (distance < chart.config.handlesClickDistance) {
        if (typeof hit.distance === 'undefined' || distance < hit.distance) {
          hit = {
            elementId: element.id,
            type: startOrEnd,
            distance: distance
          }
        }
      }
    })
  })

    // if no handle is hit, check for middle hit

  if (Object.keys(hit).length == 0) {
    var info = helpers.XYtoInfo(chart, coordinates.x, coordinates.y)
      // loop through elements
    data.elements.forEach(function (element) {
      var lane = chart.shape.lanes[element.lane]

        // check if point is inside element horizontally
      if (helpers.isInside(info.minutes, element.start, element.end)) {
          // check if point is inside element vertically
        var innerRadius = lane.start
        var outerRadius = lane.end
        if (info.distance > innerRadius && info.distance < outerRadius) {
          hit = {
            elementId: element.id,
            type: 'middle',
            positionInElement: info.minutes - element.start
          }
        }
      }
    })
  }

  return hit
}
