/*
*  Core module of Napchart
*
*/

module.exports = function (Napchart) {
  var helpers = Napchart.helpers

  Napchart.init = function (ctx, data, config) {
    // methods of instance:

    var chart = {
      setHover: function (id, type) {
        this.hoverElement = {
          id,
          type
        }

        draw(this)
      },

      isHover: function (id, type) {
        return (this.hoverElement.id == id) && (this.hoverElement.type == type)
      },

      isActive: function (id, type) {
        return (this.activeElement.elementId == id) && (this.activeElement.type == type)
      },

      setActive: function (hit) {
        this.activeElement = hit
      },

      removeActive: function () {
        this.activeElement = {}

        draw(this)
      },

      removeHover: function () {
        this.hoverElement = {}

        draw(this)
      },

      setSelected: function (id) {
        this.selectedElement = id
        this.onUpdate()

        this.onSetSelected(id)

        draw(this)
      },

      isSelected: function (id) {
        return this.selectedElement == id
      },

      deselect: function () {
        this.selectedElement = false
        this.onUpdate()

        this.onSetSelected(false)

        draw(this)
      },

      setNumberOfLanes: function (n) {
        this.data.lanes = n
        chart.needFullRedraw = true
        Napchart.shape.initShape(chart)

        draw(this)
      },

      isPen: function () {
        // checks:
        // penMode, no element under cursor(hover), not dragging (active),
        // and that the pen location is made (it is in lane etc)
        return (
          chart.config.penMode &&
          Object.keys(this.hoverElement).length == 0 &&
          Object.keys(this.activeElement).length == 0 &&
          this.mousePenLocation)
      },

      setShape: function (shape) {
      },

      animateShape: function (shape) {
      },

      initAndAddElements: function (newElements) {
        newElements = verifyAndInitElements(newElements, chart)

        this.data.elements = [
          ...this.data.elements,
          ...newElements
        ]

        this.draw()
      },

      setElements: function (elements) {
        var helpers = this.helpers
        elements = elements.map(function (element) {
          return {
            ...element,
            start: helpers.limit(element.start),
            end: helpers.limit(element.end)
          }
        })
        this.data.elements = elements

        this.draw()
      },

      updateElement: function (changes) {
        // needs id and properties to change
        this.data.elements = this.data.elements.map(element => {
          if (element.id == changes.id) {
            return Object.assign(element, changes)
          }
          return element
        })

        draw(this)
      },

      deleteElement: function (id) {
        this.data.elements = this.data.elements.filter(e => e.id != id)

        if (this.isSelected(id)) {
          this.deselect()
        }

        draw(this)
      },

      emptyLane: function(lane) {
        console.log(lane)
        this.data.elements = this.data.elements.filter(e => e.lane != lane)
        console.log(this.data.elements)
      },

      createElement: function (newElement) {
        var element = verifyAndInitElements([newElement], this)[0]
        chart.data.elements.push(element)

        draw(this)

        return element
      },

      changeColor: function (id, color) {
        this.data.elements = this.data.elements.map(e => {
          if (e.id == id) {
            return {
              ...e,
              color: color
            }
          } else {
            return e
          }
        })

        draw(this)
      },

      draw: function () {
        draw(chart)
      },

      benchmark: function () {
        Napchart.draw.benchmark(this)
      },

      // setConfig: function(config) {
      //   // Napchart.config = config
      //   chart.config = config
      //   scaleConfig(chart.config, chart.ratio)
      //   this.redraw()
      // },

      onSetSelected: function () {
      },

      onUpdate: function () {
      },

      // this function should only be used by a listener
      // to update napchart
      update: function (data) {
        chart.data = data

        draw(chart)
        console.log('updating')
      },

      updateDimensions: function () {
        // probably because of resize

        scale(chart)

        chart.needFullRedraw = true
        Napchart.shape.initShape(chart)

        draw(this)
      },

      changeShape: function (to) {
        Napchart.shape.changeShape(chart, to)
        this.data.shape = to
        console.log(this.data)
      },

      whichLaneIsTheLastOccupied: function () {
        var lane = 0
        chart.shape.lanes.forEach(function (shape, i) {
          var elementsWithThisLane = chart.data.elements.filter(e => e.lane == i)
          if (elementsWithThisLane.length > 0) {
            lane = i
          }
        })
        return lane
      }
    }

    // properties of instance:
    var defaultData = {
      elements: [],
      shape: 'circle',
      lanes: 1
    }

    chart.ctx = ctx
    chart.canvas = ctx.canvas
    chart.unScaledConfig = initConfig(config)

    scale(chart)

    chart.data = helpers.extend(defaultData, data)
    chart.hoverElement = {}
    chart.activeElement = {}
    chart.selectedElement = false
    chart.mousePenLocation = false
    chart.needFullRedraw = true

    // initialize:
    chart.helpers = Napchart.helpers
    chart.styles = Napchart.styles

    Napchart.shape.initShape(chart)
    Napchart.interactCanvas.init(chart)

    // add properties like id, lane, color etc if not there
    chart.data.elements = verifyAndInitElements(chart.data.elements, chart)

    draw(chart)
    return chart
  }

  // private
  function scale (chart) {
    var canvas = chart.canvas
    retinaScale(chart)
    chart.width = chart.w = canvas.width
    chart.height = chart.h = canvas.height
    chart.ratio = Math.min(chart.w / 90, chart.h / 90)
    chart.config = scaleConfig(chart.unScaledConfig, chart.ratio)
  }

  function draw (chart) {
    // here we need to determine how much we should redraw
    if (chart.needFullRedraw) {
      Napchart.draw.fullDraw(chart)
      chart.needFullRedraw = false
      chart.onUpdate() // notify listeners
    } else {
      Napchart.draw.drawFrame(chart)
    }
  }

  function retinaScale (chart) {
    if (typeof window === 'undefined') {
      // we are in node.js
      return
    }
    var canvas = chart.canvas
    var dpr = window.devicePixelRatio

    if (typeof chart.config !== 'undefined' && chart.config.responsive) {
      var _parent = canvas.parentNode
      var WIDTH = _parent.offsetWidth
      var HEIGHT = _parent.offsetHeight

      canvas.width = dpr * WIDTH
      canvas.height = dpr * HEIGHT

      canvas.style.width = '100%'
      canvas.style.height = '100%'
    } else {
      var HEIGHT = canvas.height
      var WIDTH = canvas.width
      canvas.style.width = WIDTH
      canvas.style.height = HEIGHT

      canvas.width = dpr * WIDTH
      canvas.height = dpr * HEIGHT
    }
  }

  function initConfig (config) {
    config = config || {}
    config = helpers.extend(JSON.parse(JSON.stringify(Napchart.config)), config)
    return config
  }

  function verifyAndInitElements (elements, chart) {
    return elements.map(element => {
      if (typeof element.start === 'undefined' ||
        typeof element.end === 'undefined') {
        throw new Err('Start and End properties are required!')
      }
      var element = {
        start: element.start,
        end: element.end,
        id: element.id || idGen(),
        lane: element.lane || 0,
        text: element.text || '',
        color: element.color || chart.config.defaultColor
      }
      if (element.lane > (chart.shape.lanes.length - 1)) {
        console.log(`Lane no. ${element.lane} does not exist in this chart`)
      }

      return element
    })

    function idGen () {
      var id = Math.round(Math.random() * 10000)
      return id
    }
  }

  function scaleConfig (config, ratio) {
    var scaledConfig = helpers.clone(config)
    function scaleFn (base, value, key) {
      if (value > 1 || value < 1 || value === 1) { // if value is a number
        base[key] = value * ratio
      }
    }
    helpers.deepEach(scaledConfig, scaleFn)
    return scaledConfig
  }
}
