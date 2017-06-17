const selectedElements = (state = {title: '', description: ''}, action) => {

  switch (action.type) {
    case 'EDIT_METAINFO':
      return action.newMetaInfo
    default:
      return state
  }
}

export default selectedElements