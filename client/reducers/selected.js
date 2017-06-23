const selectedElements = (state = [], action) => {
  switch (action.type) {
    case 'SET_SELECTED_ELEMENT':
      return [
        ...state,
        action.selected
      ]
    case 'SET_SELECTED_ELEMENTS':
      return [
        ...action.selected
      ]
    case 'DESELECT':
      return []
    case 'SET_FROM_SERVER':
      return []
    default:
      return state
  }
}

export default selectedElements
