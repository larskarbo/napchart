const selectedElements = (state = [], action) => {

  switch (action.type) {
    case 'SET_SELECTED':
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