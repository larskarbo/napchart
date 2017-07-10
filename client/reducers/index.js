import { combineReducers } from 'redux'
import undoable from './undoable'

import elements from './elements'
import types from './types'
import selected from './selected'
import active from './active'
import metaInfo from './metaInfo'
import shapes from './shapes'
import styles from './styles'
import chartDetails from './chartDetails'

// I don't really like the way the undo feature
// makes me access data state.history.present.elements
// instead of state.elements
// but maybe I'm just overreacting
// anyway, I did it that way
const chartApp = combineReducers({
	history: undoable(combineReducers({
	  elements,
	  types,
	  metaInfo,
	})),
  selected,
  shapes,
  active,
  styles,
  chartDetails
})



export default chartApp
