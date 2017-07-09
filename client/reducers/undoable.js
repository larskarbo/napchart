export default function undoable(reducer) {

  var isUndoableActive = false
  // Call the reducer with empty action to populate the initial state
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
  }

  // Return a reducer that handles undo and redo
  return function (state = initialState, action) {
    const { past, present, future } = state

    switch (action.type) {
      case 'NAPCHART_START':
        isUndoableActive = true
        return state
      case 'UNDO':
        const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)
        return {
          past: newPast,
          present: previous,
          future: [present, ...future]
        }
      case 'REDO':
        const next = future[0]
        const newFuture = future.slice(1)
        return {
          past: [...past, present],
          present: next,
          future: newFuture
        }
      case 'SET_ACTIVE_ELEMENT':
        // just a hotfix to fix this man from showing up in the history
        return state
      default:
        // Delegate handling the action to the passed reducer
        const newPresent = reducer(present, action)

        if (present.elements === newPresent.elements 
          && present.types == newPresent.types
          && present.metaInfo === newPresent.metaInfo) {
          // nothing changed
          return state
        }else

        if(!isUndoableActive){ // not active
          return {
            ...state,
            present: {
              ...newPresent,
              action: action
            }
          }
        }

        // ignore when multiple small identical EDIT_ELEMENTs
        if(state.past.length > 0){
          if(state.present.action.type == action.type 
            && action.type == 'EDIT_ELEMENT'
            && action.changes.id == state.present.action.changes.id){
            return {
              ...state,
              present: {
                ...newPresent,
                action: action
              }
            }
          }
        }

        return {
          past: [...past, present],
          present: {
            ...newPresent,
            action: action
          },
          future: []
        }
    }
  }
}