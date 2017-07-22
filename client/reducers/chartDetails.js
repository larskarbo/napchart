export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_CHARTID':
      return {
      	...state,
      	chartid: action.chartid
      }
    case 'SAVING_CHART':
      return {
      	...state,
      	loading: true
      }
    case 'CHART_SAVED':
      return {
      	...state,
      	loading: false
      }
    default:
      return state
  }
}
