

export const createElement = (elements, type) => {
	// find an id that is not in use
	var highestId = 0
	elements.forEach(element => {
		if(element.id > highestId){
			highestId = element.id
		}
	})

  // find start position based on last element
  var lastElementOfSameType = elements.filter(el => el.type == type).slice(-1)

  if(lastElementOfSameType.length == 0){
    var startPosition = 100
    var endPosition = 200
  }else{
    var startPosition = lastElementOfSameType[0].end + 60
    var endPosition = startPosition + 120
  }


  return {
    type: 'CREATE_ELEMENT',
    element: {
    	id: highestId + 1,
    	start: startPosition,
    	end: endPosition,
    	text: '',
    	type: type
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

export const moveTypeLane = (typeElement, direction) => {
  var newLane = typeElement.lane + direction
  if(newLane == 3 || newLane == -1){
    console.warn('at edge already')
    return {
      type: 'DO_NOTHING'
    }
  }
  console.log({
    type: 'EDIT_TYPE',
    typeElement: {
      ...typeElement,
      lane:newLane
    }
  })
  return {
    type: 'EDIT_TYPE',
    typeElement: {
      ...typeElement,
      lane:newLane
    }
  }
}

export const deleteType = (id) => {
  return {
    type: 'DELETE_TYPE',
    id
  }
}

export const deleteElementsWithType = (elements, typeId) => {
  var elementsToDelete = elements.map(element => {
    if(element.type == typeId){
      return element.id
    }
  })
  return {
    type: 'DELETE_ELEMENTS',
    ids: elementsToDelete
  }
}

export const createType = (types, newTypeName) => {
  // find an id that is not in use
  var highestId = 0
  Object.keys(types).forEach(id => {
    if(id > highestId){
      highestId = id
    }
  })

  var defaultType = {
    style: 'green',
    lane: 2
  }

  return {
    type: 'CREATE_TYPE',
    typeElement: {
      ...defaultType,
      name: newTypeName,
      id: highestId + 1
    }
  }
}