import { connect } from 'react-redux'
import Elements from '../components/Elements.jsx'

import { editElement, deleteElement, createElement } from '../actions/actions.js'

const mapStateToProps = (state) => {
  var elementsToShow = state.elements.filter(element => state.selected.indexOf(element.id) > -1)
	return {
    elements: state.elements,
    elementsToShow: elementsToShow,
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
    onCreateElement: (elements) => {
      dispatch(createElement(elements))
    },
  }
}

const ElementsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Elements)

export default ElementsContainer