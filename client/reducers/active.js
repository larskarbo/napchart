const activeElements = (state = [], action) => {
  switch (action.type) {
    case 'SET_ACTIVE_ELEMENTS':
      return [
        ...action.activeElements
      ]
    case 'SET_ACTIVE_ELEMENT':
      return [
        ...state,
        action.activeElement
      ]
    default:
      return state

  }
}

export default activeElements
