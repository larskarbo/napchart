let nextElementId = 0
export const addElement = (text) => {
  return {
    type: 'ADD_ELEMENT',
    id: nextElementId++
  }
}

export const editElement = (element) => {
  return {
    type: 'EDIT_ELEMENT',
    element
  }
}

export const deleteElement = (id) => {
  return {
    type: 'DELETE_ELEMENT',
    id
  }
}

export const setElements = (element) => {
  return {
    type: 'SET_ELEMENTS',
    elements: elements
  }
}