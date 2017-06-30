import { connect } from 'react-redux'
import Header from '../components/Header.jsx'

import { editElement, saveChart } from '../actions/actions.js'

// todo: use fetch instead of axios

const mapStateToProps = (state) => {
  return {
    data: {
  		chartData: {
  			elements: state.elements,
  			types: state.types,
        shape: state.shapes.activeShape
  		},
      metaInfo: state.metaInfo,
      chartid: state.chartid
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (data) => {
      dispatch(saveChart(data))
    },
    onSetSelected: (selected) => {
      dispatch({
      	type: 'SET_SELECTED',
      	selected
      })
    }
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
