import { omit } from 'lodash'

const types = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_TYPE':
      return {
        ...state,
        [action.typeElement.id]: action.typeElement
      }
    case 'EDIT_TYPE':
    console.log([action.typeElement.id])
      return {
      	...state,
      	[action.typeElement.id]: action.typeElement
      }
    case 'DELETE_TYPE':
    console.log(state, action.id)
      return omit(state, action.id)
    case 'SET_TYPES':
      return action.typeElements
    case 'SET_FROM_SERVER':
      return action.data.chartData.types
    default:
      return state
  }
}

export default types