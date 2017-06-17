const selectedElements = (state = {title: '', description: ''}, action) => {

  switch (action.type) {
    case 'EDIT_METAINFO':
      return action.newMetaInfo
    case 'SET_FROM_SERVER':
      return action.data.metaInfo
    default:
      return state
  }
}

export default selectedElements