const selectedElements = (state = [], action) => {
  switch (action.type) {
    case 'SET_SELECTED_ELEMENT':
      // figure this out when adding multitouch support
      return [
        // ...state,
        action.selected
      ]
    case 'SET_SELECTED_ELEMENTS':
      return [
        ...action.selected
      ]
    case 'DESELECT':
      return []
    case 'DELETE_ELEMENT':
      return state.filter(elem => action.id != elem)
    case 'DELETE_ELEMENTS':
      return state.filter(id => {
        return action.ids.indexOf(id) == -1
      })
    case 'SET_FROM_SERVER':
      return []
    default:
      return state
  }
}

export default selectedElements
