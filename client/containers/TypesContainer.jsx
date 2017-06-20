import { connect } from 'react-redux'
import Types from '../components/Types.jsx'

import { editType, deleteType, createType, createElement, deleteElementsWithType, moveTypeLane } from '../actions/actions.js'

const mapStateToProps = (state) => {
  return {
    types: state.types,
    elements: state.elements
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTypeUpdate: (type) => {
      dispatch(editType(type))
    },
    onDeleteType: (id, elements) => {
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
    onMoveLane: (type, direction) => {
      dispatch(moveTypeLane(type, direction))
    }
  }
}

const ElementsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Types)

export default ElementsContainer
