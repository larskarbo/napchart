const selectedElements = (state = [], action) => {

  switch (action.type) {
    case 'SET_SELECTED':
      return [
        ...action.selected
      ]
    case 'DESELECT':
      return []
    default:
      return state
  }
}

export default selectedElements