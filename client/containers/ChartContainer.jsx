import { connect } from 'react-redux'
import Chart from '../components/Chart.jsx'

import { editElement } from '../actions/actions.js'

const mapStateToProps = (state) => {
  return {
    data: {
      elements: state.elements,
      types: state.types,
      selected: state.selected
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
      	type: 'SET_SELECTED',
      	selected
      })
    }
  }
}

const ChartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart)

export default ChartContainer
