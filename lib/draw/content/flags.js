const textPath = require('textpath')

module.exports = function(chart) {
  var ctx = chart.ctx;
  var helpers = chart.helpers;
  var config = chart.config;
  var data = chart.data;

  var lane = chart.shape.lanes[0];

  data.flags.forEach(flag => {
    ctx.save();
    ctx.beginPath();
    // ctx.translate(400,400)

    ctx.translate(chart.w/2, chart.w/2);
    ctx.rotate(helpers.minutesToAngle(flag.minutes));
    ctx.translate(-chart.w/2, -chart.w/2);
    // ctx.rotate(Math.PI)
    var pos1 = helpers.minutesToXY(chart, 0, lane.end);
    var pos2 = helpers.minutesToXY(chart, 0, lane.end + 60);
    var pos3 = helpers.minutesToXY(chart, 20, lane.end + 45);
    var pos4 = helpers.minutesToXY(chart, 0, lane.end + 30);

    // ctx.globalAlpha = 0.5
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#467F9F";
    ctx.fillStyle = "#7AE4F2";
    ctx.moveTo(pos1.x, pos1.y);
    ctx.lineTo(pos2.x, pos2.y);
    ctx.lineTo(pos3.x, pos3.y);
    ctx.lineTo(pos4.x, pos4.y);

    // helpers.circle(chart, position, config.content.handles)
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = helpers.fontSize(chart, 20);
    var text = "⏰ " +helpers.minutesToClock(chart, flag.minutes);
    var tWidth = ctx.measureText(text).width;
    
    var textPos = helpers.minutesToXY(chart, 10, lane.end + 20);
    ctx.translate(textPos.x, textPos.y);
    ctx.rotate(helpers.minutesToAngle(-chart.shape.shift - 35));
    ctx.translate(-textPos.x, -textPos.y);
    ctx.fillText(text, textPos.x - tWidth, textPos.y);

    ctx.restore();
  });
};
