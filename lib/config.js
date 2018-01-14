/*
*  config
*
*  All entries that are numbers will be scaled in core.js
*
*/

module.exports = function (Napchart) {
  Napchart.config = {
    interaction: true,
    penMode: true,
    responsive: false,
    baseRadius: 32,
    edgeRadius: 42,
    font: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontSize: 1.75,
    fontColor: '#aaaaaa',
    background: 'transparent',
    cornerRadius: 3,
    text: true,
    drawFace: true,
    paddingLanes: 0.4,
    laneMaxRadius: 36,
    laneMinRadius: 16,
    maxLaneSize: 14,
    face: { // define how the background clock should be drawn
      stroke: 0.15,
      weakStrokeColor: '#dddddd',
      weakerStrokeColor: '#f5f5f5',
      strokeColor: '#aaaaaa',
      importantStrokeColor: 'black',
      importantLineWidth: 0.3,
      numbers: {
        radius: 42,
        color: '#262626',
        size: 3.3
      }
    },
    content: {
      handleTimes: {
        distance: 2.5,
        fontSize: 1.75,
        color: '#999999'
      },
      handleTimesActive: {
        distance: 3.5,
        fontSize: 3.25,
        color: '#4e4e4e'
      },
      handles: 0.6,
      bigHandles: 1.4,
      textDistance: 3,
      textBoxPadWidth: 0.9
    },
    handlesClickDistance: 3,
    defaultColor: '#EA4335'
  }
}
