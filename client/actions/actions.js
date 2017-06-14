

export const createElement = (elements) => {
	// find an id that is not in use
	var highestId = 0
	elements.forEach(element => {
		if(element.id > highestId){
			highestId = element.id
		}
	})

  return {
    type: 'CREATE_ELEMENT',
    element: {
    	id: highestId + 1,
    	start: 40,
    	end: 80,
    	text: '',
    	type: 0
    }

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

export const editType = (typeElement) => {
  return {
    type: 'EDIT_TYPE',
    typeElement
  }
}

export const deleteType = (id) => {
  return {
    type: 'DELETE_TYPE',
    id
  }
}

export const createType = (element) => {
  // find an id that is not in use
  var highestId = 0
  Object.keyst(elements).forEach(id => {
    if(id > highestId){
      highestId = id
    }
  })

  return {
    type: 'CREATE_TYPE',
    typeElement: {
      ...typeElement,
      id: highestId + 1
    }
  }
}