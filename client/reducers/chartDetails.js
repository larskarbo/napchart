export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_CHARTID':
      return {
      	...state,
      	chartid: action.chartid
      }
    default:
      return state
  }
}
