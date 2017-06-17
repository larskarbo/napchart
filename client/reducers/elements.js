
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
    case 'DELETE_ELEMENTS':
    console.log(action.ids.indexOf(state[1].id))
      return state.filter(elem => {
        return action.ids.indexOf(elem.id) == -1
      })
    case 'SET_ELEMENTS':
      return action.elements
    case 'SET_FROM_SERVER':
      return action.data.chartData.elements
    default:
      return state
  }
}

export default elements