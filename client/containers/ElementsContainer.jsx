import { connect } from 'react-redux'
import Elements from '../components/Elements.jsx'

import { editElement, deleteElement, createElement } from '../actions/actions.js'

const mapStateToProps = (state) => {
  var present = state.history.present
  var elementsToShow = present.elements.filter(element => state.selected.indexOf(element.id) > -1)
  return {
    elements: present.elements,
    elementsToShow: elementsToShow,
    types: present.types
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onElementUpdate: (changes) => {
      dispatch({
        type: 'EDIT_ELEMENT',
        changes
      })
    },
    onDeleteElement: (id) => {
      dispatch(deleteElement(id))
    },
    onCreateElement: (elements) => {
      dispatch(createElement(elements))
    },
    onDeselect: (elements) => {
      dispatch({
        type: 'DESELECT'
      })
    }
  }
}

const ElementsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Elements)

export default ElementsContainer
