import { connect } from 'react-redux'
import MetaInfo from '../components/MetaInfo.jsx'

const mapStateToProps = (state) => {
	return {
    metaInfo: state.metaInfo
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMetaInfoUpdate: (element) => {
      dispatch({
        type: 'EDIT_METAINFO',
        newMetaInfo: element
      })
    },
  }
}

const MetaInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MetaInfo)

export default MetaInfoContainer