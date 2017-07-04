import { connect } from 'react-redux'
import Types from '../components/Types.jsx'

import { editType, deleteType, createType, createElement, deleteElementsWithType, moveTypeLane,
setDragging } from '../actions/actions.js'

const mapStateToProps = (state) => {
  return {
    types: state.history.present.types,
    elements: state.history.present.elements,
    styles: state.styles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTypeUpdate: (type) => {
      dispatch(editType(type))
    },
    onDeleteType: (id, elements) => {
      console.log('deletetype', elements, id)
      dispatch(deleteElementsWithType(elements, id))
      dispatch(deleteType(id))
    },
    onCreateType: (type, types) => {
      dispatch(createType(types, type.name))
    },
    onCreateElement: (elements, type) => {
      console.log(type)
      dispatch(createElement(elements, type))
    },
    onStartDrag: (elements, type) => {
      var elementAction = createElement(elements, type)
      dispatch(elementAction)
      dispatch(setDragging(elementAction.element.id))
      dispatch({
        type: 'SET_SELECTED_ELEMENT',
        selected: elementAction.element.id
      })
    },
    onMoveLane: (type, direction) => {
      dispatch(moveTypeLane(type, direction))
    },
    onStyleChange: (id, newStyle) => {
      dispatch({
        type: 'SET_TYPE_STYLE',
        newStyle,
        id
      })
    }
  }
}

const ElementsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Types)

export default ElementsContainer
