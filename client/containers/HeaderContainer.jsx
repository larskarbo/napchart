import { connect } from 'react-redux'
import Header from '../components/Header.jsx'

import { editElement, saveChart, startTour } from '../actions/actions.js'

// todo: use fetch instead of axios

const mapStateToProps = (state) => {
  var present = state.history.present
  return {
    data: {
  		chartData: {
  			elements: present.elements,
  			types: present.types,
        shape: state.shapes.activeShape
  		},
      metaInfo: present.metaInfo,
      chartid: state.chartDetails.chartid
    },
    history: state.history
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (data, dj) => {
      dispatch(saveChart(data))
    },
    onSetSelected: (selected) => {
      dispatch({
        type: 'SET_SELECTED',
        selected
      })
    },
    onStartTour: (currentData) => {
      dispatch(startTour(currentData))
    },
    undo: () => {
      dispatch({
        type: 'UNDO'
      })
    },
    redo: () => {
      dispatch({
        type: 'REDO'
      })
    }
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
