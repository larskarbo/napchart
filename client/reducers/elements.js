import limitValue from '../helpers/limitValue'

const elements = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_ELEMENT':
      return [
        ...state,
        action.element
      ]
    case 'EDIT_ELEMENT':
      return state.map(elem => {
        if (elem.id == action.changes.id) {
          return Object.assign({}, elem, action.changes)
        }
        return elem
      })
    case 'EDIT_ELEMENT_LOCKED':
      // will only change start and end, not lane or text
      var elementBeforeChanges = state.find(elem => elem.id == action.changes.id)
      var elementAfterChanges = Object.assign({}, elementBeforeChanges, action.changes)
      var diff = {
        start: elementAfterChanges.start - elementBeforeChanges.start,
        end: elementAfterChanges.end - elementBeforeChanges.end
      }
      return state.map(elem => {
        if (action.idsWithType.indexOf(elem.id) != -1) { // if elem is part array
          return {
            ...elem,
            start: limitValue(elem.start + diff.start),
            end: limitValue(elem.end + diff.end)
          }
        }
        return elem
      })
    case 'DELETE_ELEMENT':
      return state.filter(elem => action.id != elem.id)
    case 'DELETE_ELEMENTS':
      return state.filter(elem => {
        return action.ids.indexOf(elem.id) == -1
      })
    case 'SET_ACTIVE_ELEMENT':
      return state.map(elem => {
        if (elem.id == action.id) {
          return {
            ...elem,
            dragging: 'mouse'
          }
        }
        return elem
      })
    case 'ADD_ELEMENTS':
      var highID = state.reduce((cum, el) => cum + el.id, 0)
      var newElements = action.elements.map(el => {
        return {
          ...el,
          id: highID++
        }
      })
      return [
        ...state,
        ...newElements
      ]
    case 'SET_ELEMENTS':
      return action.elements
    case 'SET_FROM_SERVER':
      return action.data.chartData.elements
    default:
      return state
  }
}

export default elements
