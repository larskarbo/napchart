import { List, Map, fromJS } from 'immutable'

const types = (state = Map(), action) => {
  switch (action.type) {
    case 'CREATE_TYPE':
      return state.set(action.typeElement.id, action.typeElement)
    case 'EDIT_TYPE':
      return state.set(action.typeElement.get('id'), action.typeElement)
    case 'DELETE_TYPE':
      return state.delete(action.id)
    case 'SET_TYPES':
      return fromJS(action.typeElements)
    default:
      return state
  }
}

export default types