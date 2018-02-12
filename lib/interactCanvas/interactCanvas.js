/*
 *  interactCanvas
 *
 *  This module adds support for modifying a schedule
 *  directly on the canvas with mouse or touch
 */

var hitDetect = require('./hitDetect')
var keyboard = require('./keyboard')

module.exports = function (Napchart) {
  var helpers = Napchart.helpers

  Napchart.interactCanvas = {
    init: function (chart) {
      if (!chart.config.interaction) {
        return
      }

      // helper function for event listeners
      function addListeners(element, eventNames, listener) {
        eventNames.split(' ').forEach(eventName => {
          element.addEventListener(eventName, listener)
        })
      }

      // first a little function for detecting touch users and setting
      // global prop
      window.addEventListener('touchstart', function onFirstTouch() {
        // set global variable
        chart.isTouchUser = true

        // we only need to know once that a human touched the screen, so we can stop listening now
        window.removeEventListener('touchstart', onFirstTouch, true);
      }, true);

      // move
      addListeners(document, 'mousemove touchmove', e => {
        if (chart.data.activeElement) {
          e.stopPropagation()
          e.preventDefault()
        }
        move(e, chart)
      })

      // down
      addListeners(chart.canvas, 'mousedown touchstart', e => {
        down(e, chart)
      })

      addListeners(window, 'mousedown touchstart', e => {
        if (e.target == chart.canvas) {
          return // let down() handle it
        } else if (e.target.classList.contains("napchartDontLoseFocus")) {
          // hmm we need to make sure keyboard.js's input doesnt auto-blur
          keepAlive = chart.selectedElement
        } else {
          blur(chart)
        }
      })

      // up
      addListeners(window, 'mouseup touchend', e => {
        // e.stopPropagation()
        // e.preventDefault()
        up(e, chart)
      })

      // initialize keyboard bindings
      keyboard.init(chart)
    }
  }

  var position // reason for this global var: update() function
  var keepAlive // little hacky: used to preserve keyboard.js focus when clicking outside chart

  function down(e, chart) {
    position = getPosition(e)
    var hit = hitDetect(chart, getCoordinates(position, chart))
    e.stopPropagation()
    e.preventDefault()
    if (Object.keys(hit).length == 0) {
      // if no hit and no pen
      setMousePenLocation(e, chart)
      if (chart.isPen()) {
        penStart(e, chart)
      }
      deselect(chart)
      return
    } else {

      chart.setActive(hit)
      select(chart, hit.elementId)
    }

    update(chart)
  }

  function blur(chart) {
    deselect(chart)
  }

  function penStart(e, chart) {
    // listen and check which way user eventually drags mouse
    setMousePenLocation(e, chart)
    chart.listeningForPenMove = true
  }

  function move(e, chart) {
    var helpers = chart.helpers
    position = getPosition(e)
    var coordinates = getCoordinates(position, chart)

    // first check pen shit
    if (chart.listeningForPenMove) {
      var initialPenLocation = chart.mousePenLocation.minutes
      var info = helpers.XYtoInfo(chart, coordinates.x, coordinates.y)
      var currentLocation = info.minutes

      // scratchDistance is the distance between where you first clicked
      // your pen and how far you have dragged the pen on the surface
      var scratchDistance = helpers.duration(initialPenLocation, currentLocation)

      // the reason for 1430 is that -10 = 1430
      if (scratchDistance > 10 && scratchDistance < 1430) {
        var dragStartOrEnd = (scratchDistance > 720) ? 'start' : 'end'
        var otherStartOrEnd = (dragStartOrEnd == 'end') ? 'start' : 'end'

        var values = {
          [otherStartOrEnd]: initialPenLocation,
          [dragStartOrEnd]: snap(currentLocation),
          lane: chart.mousePenLocation.lane
        }

        // check collision
        if (isCollision(chart, values.start, values.end, values.lane)) {
          // ditch
          return
        }

        // create element, make it an activeElement + selected and forget all pen stuff
        var element = chart.createElement(values)

        chart.setActive({
          elementId: element.id,
          type: dragStartOrEnd
        })
        chart.setSelected(element.id)

        chart.listeningForPenMove = false
      } else {
        return
      }
    }

    // add hover
    var hit = hitDetect(chart, coordinates)
    if (Object.keys(hit).length == 0) {
      // if no hit
      // - check if hovers an empty space on lane
      setMousePenLocation(e, chart)
      // - remove hover
      chart.removeHover()
    } else {
      chart.setHover(hit.elementId, hit.type)
    }

    update(chart)
  }

  function up(e, chart) {
    // check if active and
    // delete element if duration == 0
    if (Object.keys(chart.activeElement).length > 0) {
      var id = chart.activeElement.elementId
      var element = chart.data.elements.find(e => e.id == id)
      if (helpers.duration(element.start, element.end) == 0) {
        chart.deleteElement(id)
      }
    }

    if (keepAlive) {
      select(chart, keepAlive)
      keepAlive = false
    }

    chart.removeActive()
    chart.listeningForPenMove = false
    chart.onUpdate()
  }

  function setMousePenLocation(e, chart) {
    // sets a variable that is used to mark where an eventual
    // new element will be in pen mode
    position = getPosition(e)
    var coordinates = getCoordinates(position, chart)
    var helpers = chart.helpers

    var info = helpers.XYtoInfo(chart, coordinates.x, coordinates.y)

    if (info.lane == -1) {
      // mouse is not INSIDE a lane
      chart.mousePenLocation = false
    } else {
      // mouse is INSIDE a lane, great!
      chart.mousePenLocation = {
        minutes: snap(info.minutes),
        lane: info.lane
      }
    }
  }

  function update(chart) {
    // first check if there are an activeElement (mouse button down on something)
    // if not bail
    var activeElement = chart.activeElement
    if (Object.keys(activeElement).length > 0) {
      var coordinates = getCoordinates(position, chart)
      var info = helpers.XYtoInfo(chart, coordinates.x, coordinates.y)

      move(activeElement, info)
    }

    function move(hit, info) {
      // clone our element
      var originElement = chart.data.elements.find(element => element.id == hit.elementId)
      var changes = {
        // element containig id and changes that should be done
        id: originElement.id
      }

      // do different things based on if you hit a handle (start, end) or the middle of the object
      if (hit.type == 'start' || hit.type == 'end') {
        var minutes = snap(Math.round(info.minutes))

        if (hit.type == 'start') {
          var start = minutes
          var end = originElement.end
        } else {
          var start = originElement.start
          var end = minutes
        }

        var collision = isCollisionStartEnd(chart, start, end, originElement.lane, originElement.id, hit.type)
        if (collision) {
          if (hit.type == 'start') {
            if (helpers.duration(minutes, collision.end) > 720) {
              minutes = end
            } else {
              minutes = collision.end
            }
          } else {
            if (helpers.duration(collision.start, minutes) > 720) {
              minutes = start
            } else {
              minutes = collision.start
            }
          }
        }

        if (originElement[hit.type] != minutes) {
          changes[hit.type] = minutes
        }

        // write changes
        if (Object.keys(changes).length > 1) {
          chart.updateElement(changes)
        }
      } else {
        // hit.type is middle


        var laneIsLocked = chart.data.lanes[originElement.lane].locked
        // find lane (only if current != locked)
        if (!laneIsLocked) {
          var distance = info.distance
          var lanes = chart.shape.lanes
          var closestLaneToCursor = lanes.reduce((bestLane, thisLane, laneIndex) => {
            // distance to lane
            const distanceToLane = Math.abs(distance - (thisLane.start + thisLane.end) / 2)
            if (distanceToLane < bestLane.distanceToLane) {
              return {
                laneIndex,
                distanceToLane
              }
            }
            return bestLane
          }, {
            distanceToLane: Infinity
          })
          if (closestLaneToCursor.distanceToLane === Infinity) {
            console.error('Could not find a lane to place element in')
          }
          var theLane = closestLaneToCursor.laneIndex

          if (theLane != originElement.lane) { // if changed
            // NB: collision check first
            // is there an element in this lane that obstructs?
            var collision = isCollision(chart, originElement.start, originElement.end, theLane, originElement.id)

            if (!collision) {
              changes.lane = theLane
            }
          }
        }

        // move the bastard
        originElement.duration = helpers.duration(originElement.start, originElement.end)
        var positionInElement = hit.positionInElement
        if (typeof positionInElement === 'undefined') {
          positionInElement = originElement.duration / 2
        }

        var start = snap(helpers.limit(Math.round(info.minutes - positionInElement)))
        var end = helpers.limit(start + originElement.duration)

        // check collision
        var collision = isCollision(chart, start, end, originElement.lane, originElement.id)
        if (collision) {
          // start = collision.end
          // end = start + duration
          var elementsInLane = chart.data.elements.filter(element => {
            return (element.lane == collision.lane && // same lane
              element.id != originElement.id) // exclude self
          }).sort(function (a, b) {
            return a.start - b.start
          })

          // where should element be?

          var middlePoint = helpers.limit(info.minutes - positionInElement + originElement.duration / 2)
          // find gaps
          var gapsInLane = elementsInLane.map((element, i) => {
            if (i == elementsInLane.length - 1) {
              return {
                start: element.end,
                end: elementsInLane[0].start
              }
            } else {
              return {
                start: element.end,
                end: elementsInLane[i + 1].start
              }
            }
          }).map(element => { // calculate duration
            element.space = helpers.duration(element.start, element.end)
            return element
          }).filter(element => { // remove too small gaps
            return element.space >= originElement.duration
          })

          // which gap element has the endpoint closest to middlePoint?
          var gapElement = gapsInLane.reduce((bestGap, currentGap) => {
            var d2start = helpers.minutesDistance(currentGap.start, middlePoint)
            var d2end = helpers.minutesDistance(currentGap.end, middlePoint)
            if (d2start < d2end) {
              var startOrEnd = 'start'
              var distance = d2start
            } else {
              var startOrEnd = 'end'
              var distance = d2end
            }
            if (distance < bestGap.distance) {
              return {
                ...currentGap,
                distance: distance,
                startOrEnd: startOrEnd
              }
            }
            return bestGap
          }, {
            distance: 1440
          })

          if (gapElement.startOrEnd == 'start') {
            start = gapElement.start
            end = start + helpers.duration(originElement.start, originElement.end)
          } else {
            end = gapElement.end
            start = end - helpers.duration(originElement.start, originElement.end)
          }
        }

        // changes (if it has changed)
        if (originElement.start != start || originElement.end != end) {
          changes.start = helpers.limit(start)
          changes.end = helpers.limit(end)
        }

        if (Object.keys(changes).length === 1) {
          // no changes
          return
        }

        // if locked apply changes on all elements
        if (laneIsLocked) {
          // calculate relative changes instead of absolute
          var relativeChanges = {
            start: changes.start - originElement.start,
            end: changes.end - originElement.end
          }
          var elementsWithThisLane = chart.data.elements.filter(e => e.lane == originElement.lane).map(e => e.id)
          chart.updateManyElements(relativeChanges, elementsWithThisLane)
        } else {
          // write changes normal way
          if (Object.keys(changes).length > 1) {
            chart.updateElement(changes)
          }
        }
      }
    }
  }

  // helper functions :
  function isCollision(chart, start, end, lane, id) {
    // returns the element it finds, if not: false
    var found = chart.data.elements.find(element => {
      if (id == element.id) {
        // dont check own element
        return false
      }
      return (((helpers.isInside(element.start + 1, start, end) ||
            helpers.isInside(element.end - 1, start, end)) ||
          helpers.isInside(start, element.start + 1, element.end - 1)) && // if element interferes AND...
        element.lane === lane // ...has the lane...
      ) // ... it will send a true and we know that it will be a collision
    })

    if (typeof found === 'undefined') {
      return false
    } else {
      return found
    }
  }

  function isCollisionStartEnd(chart, start, end, lane, id, dragStartOrEnd) {
    // collision detect used when dragging start or end of an element
    var stationaryStartOrEnd = (dragStartOrEnd == 'end') ? 'start' : 'end'

    var collides = chart.data.elements.some(element => {
      if (id == element.id) {
        // dont check own element
        return false
      }
      return (((helpers.isInside(element.start + 1, start, end) ||
            helpers.isInside(element.end - 1, start, end)) ||
          helpers.isInside(start, element.start + 1, element.end - 1)) && // if element interferes AND...
        element.lane === lane // ...has the lane...
      ) // ... it will send a true and we know that it will be a collision
    })

    if (!collides) {
      return false
    } else {
      // OK, it *collides*... we know that,
      // now we need to find out where this startorend should be
      // we need to find the first element it would collide with

      // we only need to concentrate about either start or end
      // example dragstartorend = start
      // find the element with a start property closest to
      // our start property in the right direction (for start anticlockwise)
      var ownElement = {
        start,
        end
      }
      var closestElement = chart.data.elements.reduce((bestElement, thisElement) => {
        if (id == thisElement.id) {
          // dont check own element
          return bestElement
        }
        var anticlockwise = (dragStartOrEnd == 'start')
        var distance = helpers.range(ownElement[stationaryStartOrEnd], thisElement[stationaryStartOrEnd], anticlockwise)

        if (distance < bestElement.distance) {
          return {
            ...thisElement,
            distance: distance
          }
        }
        return bestElement
      }, {
        distance: 1440
      })

      return closestElement
    }
  }

  function getPosition(e) {
    if (typeof e.touches !== 'undefined') {
      return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
    } else {
      return {
        x: e.clientX,
        y: e.clientY
      }
    }
  }

  function getCoordinates(position, chart) {
    var boundingRect = chart.canvas.getBoundingClientRect()
    // use window.devicePixelRatio because if a retina screen, canvas has more pixels
    // than the getCoordinates
    var dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1
    return {
      x: (position.x - boundingRect.left) * dpr,
      y: (position.y - boundingRect.top) * dpr
    }
  }

  function snap(input) {
    return Math.round(input / 5) * 5
  }

  function select(chart, id) {
    // notify core module:
    chart.setSelected(id)
  }

  function deselect(chart, element) {
    if (typeof element === 'undefined') {
      // deselect all
      chart.deselect()
    }
    // deselect one
    chart.deselect(element)
  }
}