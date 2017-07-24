import { connect } from 'react-redux'
import Poly from '../components/Poly.jsx'
import { deleteElementsWithType} from '../actions/actions.js'

const mapStateToProps = (state) => {
	return {
		open: state.poly.open,
		schedules: state.poly.schedules,
    elements: state.history.present.elements
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSchedule: (elements, schedule) => {
      dispatch(deleteElementsWithType(elements, 0))
      dispatch({
        type: 'ADD_ELEMENTS',
        elements: schedule.elements.map(el => ({
          ...el,
          lane:1
        }))
      })
    },
  }
}

const PolyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Poly)

export default PolyContainer
