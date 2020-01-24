/*
 *
 * Shape module
 *
 */

var shapes = initShapes(require("./shapes"));
var calculateShape = require("./calculateShape");
var animateShape = require("./animateShape");

module.exports = function(Napchart) {
  var helpers = Napchart.helpers;
  var currentShape;

  Napchart.shape = {
    initShape: function(chart) {
      setShape(chart, chart.data.shape);
    },
    changeShape: function(chart, to) {
      changeShape(chart, to);
    },

    animShapeLars: function(chart, toShape) {
      var oldShape = helpers.clone(chart.shape);
      var newShape = helpers.clone(toShape);
      animateShape(chart, oldShape, newShape, null, function() {
      });
    }
  };

  function setShape(chart, shape) {
    if (typeof shape === "string") {
      currentShape = shape;
      shape = shapes[shape];
    }
    chart.shape = calculateShape(chart, shape);

    chart.allShapes = shapes;
  }

  function changeShape(chart, wantToShape) {
    // we are this shape:
    var currentShape = chart.data.shape;

    // make a sequence of shapes for smoother animations
    var shapeSequenze = [wantToShape]; // default to direct
    if (currentShape == "circle") {
      if (wantToShape == "line") {
        shapeSequenze = ["transitionShape", "line"];
      }
    } else if (currentShape == "wide") {
      if (wantToShape == "line") {
        shapeSequenze = ["circle", "transitionShape", "line"];
      }
    } else if (currentShape == "line") {
      if (wantToShape == "wide") {
        shapeSequenze = ["transitionShape", "circle", "wide"];
      } else if (wantToShape == "circle") {
        shapeSequenze = ["transitionShape", "circle"];
      }
    }

    var index = 0;
    function next() {
      var oldShape = helpers.clone(shapes[currentShape]);
      var newShape = helpers.clone(shapes[shapeSequenze[index]]);
      var globalProgress = {
        count: shapeSequenze.length
      };
      animateShape(chart, oldShape, newShape, globalProgress, function() {
        currentShape = shapeSequenze[index];
        index++;
        if (index < shapeSequenze.length) {
          next();
        }
      });
    }

    next();
  }
};

function initShapes(shapes) {
  for (var shapeString in shapes) {
    var shape = shapes[shapeString];
    shapes[shapeString] = {
      ...shape,
      laneMaxRadius: shape.laneMaxRadius || 36,
      laneMinRadius: shape.laneMinRadius || 16,
      maxLaneSize: shape.maxLaneSize || 14,
      shiftDown: shape.shiftDown || 0,
      shift: shape.shift || 0,
      centerMinutes: shape.centerMinutes || 0
    };
  }
  return shapes;
}
