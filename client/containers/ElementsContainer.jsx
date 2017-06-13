import { connect } from 'react-redux'
import Elements from '../components/Elements.jsx'

import { editElement, deleteElement } from '../actions/actions.js'

const mapStateToProps = (state) => {
	return {
		elements: state.elements,
		types: state.types
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onElementUpdate: (element) => {
      dispatch(editElement(element))
    },
    onDeleteElement: (id) => {
      dispatch(deleteElement(id))
    },
    // onSetSelected: (selected) => {
    //   dispatch({
    //   	type: 'SET_SELECTED',
    //   	selected
    //   })
    // }
  }
}

const ElementsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Elements)

export default ElementsContainer