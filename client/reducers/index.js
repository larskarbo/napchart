import { combineReducers } from 'redux'
import undoable from './undoable'

import elements from './elements'
import types from './types'
import selected from './selected'
import active from './active'
import metaInfo from './metaInfo'
import shapes from './shapes'
import styles from './styles'

const chartApp = undoable(combineReducers({
  elements,
  types,
  selected,
  metaInfo,
  shapes,
  active,
  styles
}))

export default chartApp
