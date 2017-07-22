import { connect } from 'react-redux'
import Chart from '../components/Chart.jsx'

const mapStateToProps = (state) => {
  return {
    data: {
      elements: state.history.present.elements,
      types: state.history.present.types,
      description: state.history.present.metaInfo.description,
      title: state.history.present.metaInfo.title,
      selected: state.selected,
      activeElements: state.active,
      shape: state.shapes.activeShape,
    },

    loading: state.chartDetails.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onElementUpdate: (changes, type, elements) => {
      // we have to check if type is locked before we do anything!
      var idsWithType = elements
        .filter(element => element.typeId == type.id)
        .map(element => element.id)
      if(type.locked){
        dispatch({
          type: 'EDIT_ELEMENT_LOCKED',
          changes,
          idsWithType
        })
      }else{
        dispatch({
          type: 'EDIT_ELEMENT',
          changes
        })
      }
    },
    onSetSelected: (selected) => {
      dispatch({
        type: 'SET_SELECTED_ELEMENT',
        selected
      })
    },
    onDeselect: (selected) => {
      dispatch({
        type: 'DESELECT'
      })
    },
    onSetActive: (activeElements) => {
      dispatch({
        type: 'SET_ACTIVE_ELEMENTS',
        activeElements
      })
    },
    onDeleteSelected: (ids) => {
      dispatch({
        type: 'DELETE_ELEMENTS',
        ids: ids
      })
    }
  }
}

const ChartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart)

export default ChartContainer
