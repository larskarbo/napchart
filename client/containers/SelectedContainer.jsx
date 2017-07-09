import { connect } from 'react-redux'
import SelectedElement from '../components/SelectedElement.jsx'

import { deleteElement } from '../actions/actions.js'

const mapStateToProps = (state) => {
	var selectedElement = state.history.present.elements.find(el => el.id == state.selected[0])

  if(typeof selectedElement == 'undefined'){
    selectedElement = {
      disabled: true,
      text: ''
    }
  }

  return {
    element: selectedElement
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTextChange: (id, text) => {
      dispatch({
        type: 'EDIT_ELEMENT',
        changes: {
          id,
          text
        }
      })
    },
    onDeleteElement: (id) => {
      dispatch(deleteElement(id))
    },
  }
}

const SelectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedElement)

export default SelectedContainer
