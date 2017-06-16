
const elements = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_ELEMENT':
      return [
        ...state,
        action.element
      ]
    case 'EDIT_ELEMENT':
      return state.map(elem => {
        if(elem.id == action.id){
          return action.element
        }
        return elem
      })
    case 'DELETE_ELEMENT':
      return state.filter(elem => action.id != elem.id)
    case 'SET_ELEMENTS':
      return action.elements
    default:
      return state
  }
}

export default elements