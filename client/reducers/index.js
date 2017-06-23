import { combineReducers } from 'redux'
import elements from './elements'
import types from './types'
import selected from './selected'
import active from './active'
import metaInfo from './metaInfo'

const chartApp = combineReducers({
  elements,
  types,
  selected,
  metaInfo,
  active
})

export default chartApp
