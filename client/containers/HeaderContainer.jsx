import { connect } from 'react-redux'
import Header from '../components/Header.jsx'

import { editElement, saveChart, startTour } from '../actions/actions.js'

// todo: use fetch instead of axios

const mapStateToProps = ({present}) => {
  return {
    data: {
  		chartData: {
  			elements: present.elements,
  			types: present.types,
        shape: present.shapes.activeShape
  		},
      metaInfo: present.metaInfo,
      chartid: present.chartid
    }
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
      console.log('fkodko')
      dispatch(startTour(currentData))
    },
    undo: () => {
      dispatch({
        type: 'UNDO'
      })
    }
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
