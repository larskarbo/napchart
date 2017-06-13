const element = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return {
        id: action.id,
        start: 50,
        end: 150,
        text: 'Very cool app',
        typeName: 'default'
      }

    case 'EDIT_ELEMENT':
      return action.element
    
    default:
      return state
  }
}

const elements = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return [
        ...state,
        element(undefined, action)
      ]
    case 'EDIT_ELEMENT':
      return state.map(elem => {
        if(elem.id == action.id){
          return element(undefined, action)
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