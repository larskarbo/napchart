import { connect } from 'react-redux'
import Chart from '../components/Chart.jsx'

import { editElement } from '../actions/actions.js'

const mapStateToProps = ({present}) => {
  return {
    data: {
      // elements: JSON.parse(JSON.stringify(present.elements)),
      elements: present.elements,
      types: present.types,
      selected: present.selected,
      activeElements: present.active,
      shape: present.shapes.activeShape,
      title: present.metaInfo.title,
      description: present.metaInfo.description
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
