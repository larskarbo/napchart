import { connect } from 'react-redux'
import Shapes from '../components/Shapes.jsx'

const mapStateToProps = (state) => {
  return {
    shapes: state.shapes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeShape: (shape) => {
      dispatch({
      	type: 'SET_ACTIVE_SHAPE',
      	shape
      })
    }
  }
}

const ShapesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Shapes)

export default ShapesContainer
