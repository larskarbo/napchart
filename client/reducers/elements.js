import { List, Map, fromJS } from 'immutable'

const element = (state = Map(), action) => {
  switch (action.type) {
    case 'CREATE_ELEMENT':
      return state.push(action.element)
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
      return List(action.elements)
    default:
      return state
  }
}


const elements = (state = List(), action) => {
  switch (action.type) {
    case 'CREATE_ELEMENT':
      return state.push(action.element)
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
      return List([Map({
        id: 0,
        start: 50,
        end: 150,
        text: 'Very cool app',
        type: 0
      })])
    default:
      return state
  }
}

export default elements