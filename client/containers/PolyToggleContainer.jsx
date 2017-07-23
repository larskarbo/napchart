import { connect } from 'react-redux'
import PolyToggle from '../components/PolyToggle.jsx'

const mapStateToProps = (state) => {
	return {
		open: state.open
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggle: (changes) => {
      dispatch({
        type: 'TOGGLE_POLY'
      })

      // Create the event
      var event = new CustomEvent("resize");

      // Dispatch/Trigger/Fire the event
      window.dispatchEvent(event);
    },
  }
}

const PolyToggleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PolyToggle)

export default PolyToggleContainer
