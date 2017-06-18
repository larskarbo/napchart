import { combineReducers } from 'redux'
import elements from './elements'
import types from './types'
import selected from './selected'
import metaInfo from './metaInfo'

const chartApp = combineReducers({
  elements,
  types,
  selected,
  metaInfo
})

export default chartApp