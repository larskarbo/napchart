/* global window: false */
/* global document: false */
'use strict'

module.exports = function (Chart) {
  // Global Chart helpers object for utility methods and classes
  var helpers = Chart.helpers = {}

  helpers.duration = function (start, end) {
    return helpers.limit(end - start)
  }

  helpers.range = function (a, b, anticlockwise) {
    // kinda same as duration, but only when !anticlockwise
    if (anticlockwise) {
      return helpers.limit(a - b)
    } else {
      return helpers.limit(b - a)
    }
  }

  helpers.minutesToHoursMinutes = function (min) {
    var hours = Math.floor(min / 60) + ''
    var minutes = min % 60 + ''
    minutes = Math.floor(minutes)

    return {
      hours: hours,
      minutes: minutes
    }
  }

  helpers.minutesToReadable = function (min, breakpoint) {
    // extends minutesToHoursMinutes and adds h and m
    var hm
    if (typeof breakpoint === 'undefined') {
      breakpoint = 60
    }

    if (min > breakpoint) {
      hm = helpers.minutesToHoursMinutes(min)
      return hm.hours + 'h ' + hm.minutes + 'm'
    } else {
      return min + 'm'
    }
  }

  helpers.middlePoint = function (start, end) {
    var duration = helpers.duration(start, end)
    return helpers.limit(start + duration / 2)
  }

  helpers.getProgressBetweenTwoValues = function (pos, start, end) {
    var result = helpers.duration(start, pos) / helpers.duration(start, end)
    if (isNaN(result)) {
      // I am doing this check because when dividing 0/0 it outputs NaN
      return 1
    } else {
      return result
    }
  }

  helpers.getPositionBetweenTwoValues = helpers.getProgressBetweenTwoValues

  helpers.limit = function (value) {
    if (value == 1440) return 1440
    return value - 1440 * Math.floor(value / 1440)
  }

  helpers.shortestWay = function (a) {
    // alternative??console.log(a - 1440 * Math.floor(a/720))

    // 1440/2 = 720
    if (a > 720) {
      return a - 1440
    } else if (a < -720) {
      return a + 1440
    } else {
      return a
    }
  }

  helpers.minutesDistance = function (a, b) {
    return Math.min(helpers.duration(a, b), helpers.duration(b, a))
  }

  helpers.isInside = function (point, start, end) {
    if (end > start) {
      if (point < end && point > start) {
        return true
      }
    } else if (start > end) {
      if (point > start || point < end) {
        return true
      }
    }
    if (point == start || point == end) {
      return true
    }
    return false
  }

  helpers.isInsideAngle = function (point, start, end) {
    // same as angle but it limits values to between 0 and 2*Math.PI
    return helpers.isInside(limit(point), limit(start), limit(end))

    function limit(angle) {
      angle %= Math.PI * 2
      if (angle < 0) {
        angle += Math.PI * 2
      }
      return angle
    }
  }

  helpers.distance = function (x, y, a) {
    var y = a.y - y
    var x = a.x - x
    return Math.sqrt(y * y + x * x)
  }

  helpers.angleBetweenTwoPoints = function (x, y, a) {
    var distance = helpers.distance(x, y, a)
    var y = (a.y - y) / distance
    var x = (a.x - x) / distance

    var angle = Math.atan(y / x)
    if (x >= 0) {
      angle += Math.PI
    }
    angle += Math.PI / 2
    return angle
  }

  helpers.minutesToAngle = function (minutes) {
    return minutes * (Math.PI) / 720
  }

  helpers.minutesToClock = function (chart, minutes) {
    var hoursInt = Math.floor(minutes / 60)
    var minutesInt = Math.floor(Math.floor(minutes) % 60)
    minutes = Math.floor(minutes)
    var hours = Math.floor(minutes / 60) + ''
    minutes = minutes % 60 + ''
    if (hours.length == 1) {
      hours = '0' + hours
    }
    if (minutes.length == 1) {
      minutes = '0' + minutes
    }

    if (chart.config.ampm) {
      if (minutesInt == 0) {
        if(hoursInt == 0){
          return "midnight"
        }
        if(hoursInt == 12){
          return "noon"
        }
      }
      if(hoursInt < 12){
        return (hours*1) + ':' + minutes + ' am'
      } else {
        return (hours*1 - 12) + ':' + minutes + ' pm'
      }
    } else {
      return hours + ':' + minutes
    }

  }

  // helpers.XYtoMinutes = function (x,y) {
  //   minutes = (Math.atan(y /x) / (Math.PI * 2)) * 1440 + 360;
  //   if (x < 0) {
  //       minutes += 720;
  //   }
  //   minutes = Math.round(minutes);

  //   return minutes;
  // };

  helpers.distanceFromPointToLineSegment = function (x, y, a, b) {
    var x1 = a.x
    var y1 = a.y
    var x2 = b.x
    var y2 = b.y

    var A = x - x1
    var B = y - y1
    var C = x2 - x1
    var D = y2 - y1

    var dot = A * C + B * D
    var len_sq = C * C + D * D
    var param = -1
    if (len_sq != 0) // in case of 0 length line
    {
      param = dot / len_sq
    }

    var xx, yy

    if (param < 0) {
      xx = x1
      yy = y1
    } else if (param > 1) {
      xx = x2
      yy = y2
    } else {
      xx = x1 + param * C
      yy = y1 + param * D
    }

    var dx = x - xx
    var dy = y - yy
    return Math.sqrt(dx * dx + dy * dy)
  }

  helpers.distanceFromPointToLine = function (y, lineY) {
    //// NBNB very simplified function for only horizontal lines
    return lineY - y
  }

  helpers.each = function (loopable, callback, self, reverse) {
    // Check to see if null or undefined firstly.
    var i, len
    if (helpers.isArray(loopable)) {
      len = loopable.length
      if (reverse) {
        for (i = len - 1; i >= 0; i--) {
          callback.call(self, loopable[i], i)
        }
      } else {
        for (i = 0; i < len; i++) {
          callback.call(self, loopable[i], i)
        }
      }
    } else if (typeof loopable === 'object') {
      var keys = Object.keys(loopable)
      len = keys.length
      for (i = 0; i < len; i++) {
        callback.call(self, loopable[keys[i]], keys[i])
      }
    }
  }

  helpers.deepEach = function (loopable, callback) {
    // Check to see if null or undefined firstly.
    var i, len

    function search(loopable, cb) {
      if (helpers.isArray(loopable)) {
        for (var i = 0; i < loopable.length; i++) {
          cb(loopable, loopable[i], i)
        }
      } else if (typeof loopable === 'object') {
        var keys = Object.keys(loopable)
        for (var i = 0; i < keys.length; i++) {
          cb(loopable, loopable[keys[i]], keys[i])
        }
      }
    }

    function found(base, value, key) {
      if (helpers.isArray(value) || typeof value === 'object') {
        search(value, found)
      } else {
        callback(base, value, key)
      }
    }

    search(loopable, found)
  }

  helpers.clone = function (obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  helpers.extend = function (base) {
    var setFn = function (value, key) {
      base[key] = value
    }
    for (var i = 1, ilen = arguments.length; i < ilen; i++) {
      helpers.each(arguments[i], setFn)
    }
    return base
  }

  helpers.uid = (function () {
    var id = 0
    return function () {
      return id++
    }
  }())

  var easingEffects = helpers.easingEffects = {
    linear: function (t) {
      return t
    },
    easeInQuad: function (t) {
      return t * t
    },
    easeOutQuad: function (t) {
      return -1 * t * (t - 2)
    },
    easeInOutQuad: function (t) {
      if ((t /= 1 / 2) < 1) {
        return 1 / 2 * t * t
      }
      return -1 / 2 * ((--t) * (t - 2) - 1)
    },
    easeInCubic: function (t) {
      return t * t * t
    },
    easeOutCubic: function (t) {
      return 1 * ((t = t / 1 - 1) * t * t + 1)
    },
    easeInOutCubic: function (t) {
      if ((t /= 1 / 2) < 1) {
        return 1 / 2 * t * t * t
      }
      return 1 / 2 * ((t -= 2) * t * t + 2)
    },
    easeInQuart: function (t) {
      return t * t * t * t
    },
    easeOutQuart: function (t) {
      return -1 * ((t = t / 1 - 1) * t * t * t - 1)
    },
    easeInOutQuart: function (t) {
      if ((t /= 1 / 2) < 1) {
        return 1 / 2 * t * t * t * t
      }
      return -1 / 2 * ((t -= 2) * t * t * t - 2)
    },
    easeInQuint: function (t) {
      return 1 * (t /= 1) * t * t * t * t
    },
    easeOutQuint: function (t) {
      return 1 * ((t = t / 1 - 1) * t * t * t * t + 1)
    },
    easeInOutQuint: function (t) {
      if ((t /= 1 / 2) < 1) {
        return 1 / 2 * t * t * t * t * t
      }
      return 1 / 2 * ((t -= 2) * t * t * t * t + 2)
    },
    easeInSine: function (t) {
      return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1
    },
    easeOutSine: function (t) {
      return 1 * Math.sin(t / 1 * (Math.PI / 2))
    },
    easeInOutSine: function (t) {
      return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1)
    },
    easeInExpo: function (t) {
      return (t === 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1))
    },
    easeOutExpo: function (t) {
      return (t === 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1)
    },
    easeInOutExpo: function (t) {
      if (t === 0) {
        return 0
      }
      if (t === 1) {
        return 1
      }
      if ((t /= 1 / 2) < 1) {
        return 1 / 2 * Math.pow(2, 10 * (t - 1))
      }
      return 1 / 2 * (-Math.pow(2, -10 * --t) + 2)
    },
    easeInCirc: function (t) {
      if (t >= 1) {
        return t
      }
      return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1)
    },
    easeOutCirc: function (t) {
      return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t)
    },
    easeInOutCirc: function (t) {
      if ((t /= 1 / 2) < 1) {
        return -1 / 2 * (Math.sqrt(1 - t * t) - 1)
      }
      return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1)
    },
    easeInElastic: function (t) {
      var s = 1.70158
      var p = 0
      var a = 1
      if (t === 0) {
        return 0
      }
      if ((t /= 1) === 1) {
        return 1
      }
      if (!p) {
        p = 1 * 0.3
      }
      if (a < Math.abs(1)) {
        a = 1
        s = p / 4
      } else {
        s = p / (2 * Math.PI) * Math.asin(1 / a)
      }
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p))
    },
    easeOutElastic: function (t) {
      var s = 1.70158
      var p = 0
      var a = 1
      if (t === 0) {
        return 0
      }
      if ((t /= 1) === 1) {
        return 1
      }
      if (!p) {
        p = 1 * 0.3
      }
      if (a < Math.abs(1)) {
        a = 1
        s = p / 4
      } else {
        s = p / (2 * Math.PI) * Math.asin(1 / a)
      }
      return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1
    },
    easeInOutElastic: function (t) {
      var s = 1.70158
      var p = 0
      var a = 1
      if (t === 0) {
        return 0
      }
      if ((t /= 1 / 2) === 2) {
        return 1
      }
      if (!p) {
        p = 1 * (0.3 * 1.5)
      }
      if (a < Math.abs(1)) {
        a = 1
        s = p / 4
      } else {
        s = p / (2 * Math.PI) * Math.asin(1 / a)
      }
      if (t < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p))
      }
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1
    },
    easeInBack: function (t) {
      var s = 1.70158
      return 1 * (t /= 1) * t * ((s + 1) * t - s)
    },
    easeOutBack: function (t) {
      var s = 1.70158
      return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1)
    },
    easeInOutBack: function (t) {
      var s = 1.70158
      if ((t /= 1 / 2) < 1) {
        return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s))
      }
      return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2)
    },
    easeInBounce: function (t) {
      return 1 - easingEffects.easeOutBounce(1 - t)
    },
    easeOutBounce: function (t) {
      if ((t /= 1) < (1 / 2.75)) {
        return 1 * (7.5625 * t * t)
      } else if (t < (2 / 2.75)) {
        return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)
      } else if (t < (2.5 / 2.75)) {
        return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)
      }
      return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)
    },
    easeInOutBounce: function (t) {
      if (t < 1 / 2) {
        return easingEffects.easeInBounce(t * 2) * 0.5
      }
      return easingEffects.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5
    }
  }

  helpers.isArray = Array.isArray ?
    function (obj) {
      return Array.isArray(obj)
    } :
    function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]'
    }
}