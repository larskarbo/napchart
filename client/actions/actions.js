

export const createElement = (elements) => {
	// find an id that is not in use
	var highestId = 0
	elements.forEach(element => {
		if(element.id > highestId){
			highestId = element.id
		}
	})
  console.log(elements)
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