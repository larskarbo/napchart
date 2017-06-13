import { combineReducers } from 'redux'
import elements from './elements'
import types from './types'
import selected from './selected'

const chartApp = combineReducers({
  elements,
  types,
  selected
})

export default chartApp