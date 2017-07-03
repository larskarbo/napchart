import { combineReducers } from 'redux'
import elements from './elements'
import types from './types'
import selected from './selected'
import active from './active'
import metaInfo from './metaInfo'
import shapes from './shapes'
import styles from './styles'

const chartApp = combineReducers({
  elements,
  types,
  selected,
  metaInfo,
  shapes,
  active,
  styles
})

export default chartApp
