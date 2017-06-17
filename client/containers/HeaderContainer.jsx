import { connect } from 'react-redux'
import Header from '../components/Header.jsx'

import { editElement, saveChart } from '../actions/actions.js'

//todo: use fetch instead of axios

const mapStateToProps = (state) => {
	return {
		chartData: {
			elements: state.elements,
			types: state.types
		}
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (chartData) => {
      dispatch(saveChart({
      	chartData
      }))
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