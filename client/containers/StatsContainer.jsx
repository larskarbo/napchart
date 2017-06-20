import { connect } from 'react-redux'
import Stats from '../components/Stats.jsx'

const mapStateToProps = (state) => {
  return {
    elements: state.elements,
    types: state.types
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const StatsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats)

export default StatsContainer
