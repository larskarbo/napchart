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
    baseRadius: 32,
    edgeRadius: 42,
    background: 'transparent',
    font: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    ampm: false,
    fontSize: {
      small: 1.75,
      medium: 2.25,
      big: 3.5
    },
    baseFontSize: 'noscale:1', // all other font sizes multiply this
    fontColor: '#aaaaaa',
    cornerRadius: 3,
    text: true,
    drawFace: true,
    paddingLanes: 0.4,
    face: { // define how the background clock should be drawn
      stroke: 0.15,
      weakStrokeColor: '#dddddd',
      weakerStrokeColor: '#f5f5f5',
      strokeColor: '#aaaaaa',
      importantStrokeColor: 'black',
      importantLineWidth: 0.3,
      numbers: {
        distance: 6,
        color: '#262626'
      }
    },
    content: {
      handleTimes: {
        distance: 2.5,
        color: '#999999'
      },
      handles: 0.6,
      bigHandles: 1.4,
      textDistance: 3,
      textBoxPadWidth: 0.9
    },
    handlesClickDistance: 3,
    defaultColor: 'red',
    colorMap: {
      red: '#D02516',
      blue: '#4285F4',
      brown: '#B15911',
      green: '#34A853',
      gray: '#949494',
      yellow: '#FBBC05',
      purple: '#730B73',
      pink: '#ff94d4',
      white: '#ffffff'
    },
    colorTagsSize: 2.0
  }
}
