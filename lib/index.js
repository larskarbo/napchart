var Napchart = {}

/* helper functions */
require('./helpers')(Napchart)
require('./draw/canvasHelpers')(Napchart)
require('./shape/shapeHelpers')(Napchart)

/* config file */
require('./config')(Napchart)

/* core and init */
require('./core')(Napchart)

/* drawing */
require('./shape/shape')(Napchart)
require('./draw/draw')(Napchart)

/* interaction */
require('./interactCanvas/interactCanvas')(Napchart)

module.exports = Napchart
