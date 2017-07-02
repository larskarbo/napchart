const activeElements = (state, action) => {
  if(typeof state == "undefined"){
    state = {
      shapes: [
        'circle',
        'line',
        'compactLine',
        'wideCircle'
      ],
      activeShape: 'circle'
    }
  }
  switch (action.type) {
    case 'SET_ACTIVE_SHAPE':
      return {
        ...state,
        activeShape: action.shape
      }
    case 'SET_FROM_SERVER':
      return {
        ...state,
        activeShape: action.data.chartData.shape
      }
    case 'SET_DEFAULT_DATA':
      return {
        ...state,
        activeShape: action.data.chartData.shape
      }
    default:
      return state
  }
}

export default activeElements
