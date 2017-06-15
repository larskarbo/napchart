import { List } from 'immutable'

const selectedElements = (state = List(), action) => {

  switch (action.type) {
    case 'SET_SELECTED':
      return List(action.selected)
    case 'DESELECT':
      return List()
    default:
      return state
  }
}

export default selectedElements