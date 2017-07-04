import { connect } from 'react-redux'
import Chart from '../components/Chart.jsx'

import { editElement } from '../actions/actions.js'

const mapStateToProps = (state) => {
  return {
    data: {
      elements: state.history.present.elements,
      types: state.history.present.types,
      description: state.history.present.metaInfo.description,
      title: state.history.present.metaInfo.title,
      selected: state.selected,
      activeElements: state.active,
      shape: state.shapes.activeShape,
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onElementUpdate: (element) => {
      dispatch(editElement(element))
    },
    onSetSelected: (selected) => {
      dispatch({
        type: 'SET_SELECTED_ELEMENT',
        selected
      })
    },
    onDeselect: (selected) => {
      dispatch({
        type: 'DESELECT'
      })
    },
    onSetActive: (activeElements) => {
      dispatch({
        type: 'SET_ACTIVE_ELEMENTS',
        activeElements
      })
    },
    onDeleteSelected: (ids) => {
      dispatch({
        type: 'DELETE_ELEMENTS',
        ids: ids
      })
    }
  }
}

const ChartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart)

export default ChartContainer
