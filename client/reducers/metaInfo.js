const selectedElements = (state = {title: '', description: ''}, action) => {
  switch (action.type) {
    case 'EDIT_TITLE':
      return {
        ...state,
        title: action.title
      }
    case 'EDIT_DESCRIPTION':
      return {
        ...state,
        description: action.description
      }
    case 'SET_FROM_SERVER':
    	if (typeof action.data.metaInfo === 'undefined') {
      return state
    }
      return action.data.metaInfo
    default:
      return state
  }
}

export default selectedElements
