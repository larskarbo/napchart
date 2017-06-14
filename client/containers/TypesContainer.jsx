import { connect } from 'react-redux'
import Types from '../components/Types.jsx'

import { editType, deleteType, createType, createElement } from '../actions/actions.js'

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
    onDeleteType: (id) => {
      dispatch(deleteType(id))
    },
    onCreateType: (type) => {
      dispatch(createType(type))
    },
    onCreateElement: (elements, type) => {
      dispatch(createElement(elements, type))
    },
  }
}

const ElementsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Types)

export default ElementsContainer