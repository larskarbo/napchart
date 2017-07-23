import axios from 'axios'
import limitValue from '../helpers/limitValue'

export const createElement = (elements, type) => {
	// find an id that is not in use
  var highestId = 0
  elements.forEach(element => {
    if (element.id > highestId) {
      highestId = element.id
    }
  })

  // find start position based on last element
  var lastElementOfSameType = elements.filter(el => el.typeId == type).slice(-1)

  if (lastElementOfSameType.length == 0) {
    var startPosition = 100
    var endPosition = 200
  } else {
    var startPosition = lastElementOfSameType[0].end + 60
    var endPosition = startPosition + 120
  }

  startPosition = limitValue(startPosition)
  endPosition = limitValue(endPosition)

  return {
    type: 'CREATE_ELEMENT',
    element: {
    	id: highestId + 1,
    	start: startPosition,
    	end: endPosition,
      duration: endPosition - startPosition,
    	text: '',
    	typeId: type,
      lane:1
    }
  }
}

export const setDragging = (elementId) => {
  return {
    type: 'SET_ACTIVE_ELEMENT',
    activeElement: {
      elementId,
      type: 'middle',
      identifier: 'mouse'
    }
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
  if (newLane == 3 || newLane == -1) {
    console.warn('at edge already')
    return {
      type: 'DO_NOTHING'
    }
  }
  console.log({
    type: 'EDIT_TYPE',
    typeElement: {
      ...typeElement,
      lane: newLane
    }
  })
  return {
    type: 'EDIT_TYPE',
    typeElement: {
      ...typeElement,
      lane: newLane
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
  var elementsToDelete = elements.filter(e => e.typeId == typeId).map(e => e.id)
  
  return {
    type: 'DELETE_ELEMENTS',
    ids: elementsToDelete
  }
}

export const createType = (types, newTypeName) => {
  // find an id that is not in use
  var highestId = 0
  Object.keys(types).forEach(id => {
    if (id > highestId) {
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

export function startTour (currentData) {
  return (dispatch) => {
    dispatch({
      type: 'START_TOUR',
      currentData
    })

    var actions = JSON.parse('[{"type":"SET_DEFAULT_DATA","data":{"chartData":{"shape":"circle","types":{"0":{"id":0,"name":"Sleep","style":"gray"},"2":{"id":2,"name":"Activities","style":"red"},"3":{"id":3,"name":"","style":"blue"}}}}},{"type":"CHECKING_IF_FETCH_IS_NEEDED"},{"type":"CREATE_ELEMENT","element":{"id":1,"start":100,"end":200,"duration":100,"text":"","typeId":"0","lane":2}},{"type":"SET_ACTIVE_ELEMENT","activeElement":{"elementId":1,"type":"middle","identifier":"mouse"}},{"type":"SET_SELECTED_ELEMENT","selected":1},{"type":"SET_ACTIVE_ELEMENTS","activeElements":[]},{"type":"SET_ACTIVE_ELEMENTS","activeElements":[{"elementId":1,"type":"start","distance":5.841419116081281,"identifier":"mouse"}]},{"type":"SET_SELECTED_ELEMENT","selected":1},{"type":"EDIT_ELEMENT","element":{"id":1,"start":105}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":104}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":99}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":90}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":83}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":74}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":60}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":47}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":44}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":36}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":30}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":18}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":9}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":0}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1440}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1435}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1432}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1431}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1428}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1427}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1425}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1424}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1423}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1421}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1420}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1419}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1418}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1417}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1416}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1415}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1410}},{"type":"SET_ACTIVE_ELEMENTS","activeElements":[]},{"type":"SET_ACTIVE_ELEMENTS","activeElements":[{"elementId":1,"type":"end","distance":11.8787963073397,"identifier":"mouse"}]},{"type":"SET_SELECTED_ELEMENT","selected":1},{"type":"EDIT_ELEMENT","element":{"id":1,"end":210}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":215}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":219}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":223}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":227}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":240}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":255}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":270}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":282}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":300}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":311}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":323}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":337}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":347}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":360}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":376}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":390}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":401}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":405}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":407}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":412}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":413}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":410}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":403}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":396}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":390}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":377}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":373}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":372}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":368}},{"type":"EDIT_ELEMENT","element":{"id":1,"end":360}},{"type":"SET_ACTIVE_ELEMENTS","activeElements":[]},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1410,"end":360,"duration":100,"text":"S","typeId":"0","lane":2}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1410,"end":360,"duration":100,"text":"Sø","typeId":"0","lane":2}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1410,"end":360,"duration":100,"text":"Søv","typeId":"0","lane":2}},{"type":"EDIT_ELEMENT","element":{"id":1,"start":1410,"end":360,"duration":100,"text":"Søvn","typeId":"0","lane":2}},{"type":"CREATE_ELEMENT","element":{"id":2,"start":100,"end":200,"duration":100,"text":"","typeId":"3","lane":2}},{"type":"SET_ACTIVE_ELEMENT","activeElement":{"elementId":2,"type":"middle","identifier":"mouse"}},{"type":"SET_SELECTED_ELEMENT","selected":2},{"type":"SET_ACTIVE_ELEMENTS","activeElements":[]},{"type":"SET_ACTIVE_ELEMENTS","activeElements":[{"elementId":2,"type":"middle","positionInElement":52.79474070407369,"identifier":"mouse"}]},{"type":"SET_SELECTED_ELEMENT","selected":2},{"type":"EDIT_ELEMENT","element":{"id":2,"start":101,"end":201}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":102,"end":202}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":103,"end":203}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":104,"end":204}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":105,"end":205}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":106,"end":206}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":107,"end":207}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":108,"end":208}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":109,"end":209}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":112,"end":212}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":120,"end":220}},{"type":"SET_ACTIVE_SHAPE","shape": "horizontalEllipse"},{"type":"EDIT_ELEMENT","element":{"id":2,"start":139,"end":239}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":142,"end":242}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":150,"end":250}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":165,"end":265}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":174,"end":274}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":180,"end":280}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":189,"end":289}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":204,"end":304}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":219,"end":319}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":235,"end":335}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":258,"end":358}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":276,"end":376}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":292,"end":392}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":307,"end":407,"lane":3}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":319,"end":419}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":330,"end":430}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":337,"end":437}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":338,"end":438}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":339,"end":439}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":343,"end":443}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":345,"end":445}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":348,"end":448}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":351,"end":451}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":355,"end":455,"lane":2}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":360,"end":460}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":370,"end":470}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":378,"end":478,"lane":1}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":381,"end":481}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":390,"end":490}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":404,"end":504}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":413,"end":513}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":431,"end":531}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":441,"end":541}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":450,"end":550}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":461,"end":561}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":470,"end":570}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":474,"end":574}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":475,"end":575}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":480,"end":580}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":475,"end":575}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":474,"end":574}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":472,"end":572}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":469,"end":569}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":468,"end":568}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":465,"end":565}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":460,"end":560}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":450,"end":550}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":445,"end":545}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":440,"end":540}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":435,"end":535}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":433,"end":533}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":430,"end":530}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":427,"end":527}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":420,"end":520}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":415,"end":515}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":413,"end":513}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":410,"end":510}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":409,"end":509}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":408,"end":508}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":405,"end":505}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":402,"end":502}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":400,"end":500}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":398,"end":498}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":396,"end":496}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":395,"end":495}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":390,"end":490}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":385,"end":485}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":382,"end":482}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":381,"end":481}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":380,"end":480}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":378,"end":478}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":377,"end":477}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":375,"end":475}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":373,"end":473}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":371,"end":471}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":370,"end":470}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":368,"end":468}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":360,"end":460}},{"type":"EDIT_ELEMENT","element":{"id":2,"lane":2}},{"type":"SET_ACTIVE_ELEMENTS","activeElements":[]},{"type":"SET_ACTIVE_ELEMENTS","activeElements":[{"elementId":2,"type":"middle","positionInElement":55.269676594539646,"identifier":"mouse"}]},{"type":"SET_SELECTED_ELEMENT","selected":2},{"type":"EDIT_ELEMENT","element":{"id":2,"start":367,"end":467,"lane":1}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":360,"end":460}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":367,"end":467}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":368,"end":468}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":369,"end":469}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":368,"end":468}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":360,"end":460}},{"type":"SET_ACTIVE_ELEMENTS","activeElements":[]},{"type":"SET_ACTIVE_ELEMENTS","activeElements":[{"elementId":2,"type":"end","distance":12.486225146406138,"identifier":"mouse"}]},{"type":"SET_SELECTED_ELEMENT","selected":2},{"type":"EDIT_ELEMENT","element":{"id":2,"end":465}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":468}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":469}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":470}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":474}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":480}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":491}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":498}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":510}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":516}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":532}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":553}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":570}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":582}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":600}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":616}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":630}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":660}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":678}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":700}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":720}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":745}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":755}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":774}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":793}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":810}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":825}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":840}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":858}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":865}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":876}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":891}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":900}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":915}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":930}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":960}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":980}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1007}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1020}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1040}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1061}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1080}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1091}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1110}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1127}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1140}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1160}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1180}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1195}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1200}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1218}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1230}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1240}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1252}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1260}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1281}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1298}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1315}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1320}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1332}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1338}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1342}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1350}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1356}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1359}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1362}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1363}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1365}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1367}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1369}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1372}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1375}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1380}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1387}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1388}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1391}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1393}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1394}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1396}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1398}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1399}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1401}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1403}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1404}},{"type":"EDIT_ELEMENT","element":{"id":2,"end":1410}},{"type":"SET_ACTIVE_ELEMENTS","activeElements":[]},{"type":"EDIT_ELEMENT","element":{"id":2,"start":360,"end":1410,"duration":100,"text":"L","typeId":"3","lane":1}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":360,"end":1410,"duration":100,"text":"Li","typeId":"3","lane":1}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":360,"end":1410,"duration":100,"text":"Liv","typeId":"3","lane":1}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":360,"end":1410,"duration":100,"text":"Live","typeId":"3","lane":1}},{"type":"EDIT_ELEMENT","element":{"id":2,"start":360,"end":1410,"duration":100,"text":"Livet","typeId":"3","lane":1}},{"type":"SET_ACTIVE_ELEMENTS","activeElements":[]},{"type":"EDIT_TITLE","title":"M"},{"type":"EDIT_TITLE","title":"Mi"},{"type":"EDIT_TITLE","title":"Mit"},{"type":"EDIT_TITLE","title":"Mitt"},{"type":"EDIT_TITLE","title":"Mitt "},{"type":"EDIT_TITLE","title":"Mitt"},{"type":"EDIT_TITLE","title":"Mit"},{"type":"EDIT_TITLE","title":"Mi"},{"type":"EDIT_TITLE","title":"Min"},{"type":"EDIT_TITLE","title":"Min "},{"type":"EDIT_TITLE","title":"Min k"},{"type":"EDIT_TITLE","title":"Min kv"},{"type":"EDIT_TITLE","title":"Min kva"},{"type":"EDIT_TITLE","title":"Min kvar"},{"type":"EDIT_TITLE","title":"Min kvard"},{"type":"EDIT_TITLE","title":"Min kvarda"},{"type":"EDIT_TITLE","title":"Min kvardag"},{"type":"SET_ACTIVE_ELEMENTS","activeElements":[]},{"type":"EDIT_DESCRIPTION","description":"W"},{"type":"EDIT_DESCRIPTION","description":"Wi"},{"type":"EDIT_DESCRIPTION","description":"Wig"},{"type":"EDIT_DESCRIPTION","description":"Wigu"},{"type":"EDIT_DESCRIPTION","description":"Wig"},{"type":"EDIT_DESCRIPTION","description":"Wi"},{"type":"EDIT_DESCRIPTION","description":"Wih"},{"type":"EDIT_DESCRIPTION","description":"Wihu"}]')

    var i = 0
    function next() {
      dispatch(actions[i])
      if(actions[i+1].type == "EDIT_ELEMENT" && typeof actions[i+1].element.text == 'undefined'){
        var wait = 15
      } else {
        var wait = 200
      }
      setTimeout(function() {
        i++
        next()
      }, wait)
    }

    next()
  }
}

export function saveChart (data) {
  return (dispatch) => {
    var dataForDatabase = {
      metaInfo: data.metaInfo,
      chartData: {
        ...data.chartData,
        // anti-normalize types before server
        types: Object.keys(data.chartData.types).map(type => data.chartData.types[type])
      }
    }

    dispatch({
      type: 'SAVING_CHART',
      data: dataForDatabase
    })

    return axios.post('/api/create', {
      data: JSON.stringify(dataForDatabase)
    })
    .then(function (response) {
      console.log(response)
      var chartid = response.data.id
      window.history.pushState(response.data, '', '/c/' + chartid)
      dispatch({
        type: 'CHART_SAVED'
      })
      window.alert('Napchart saved!')
      dispatch({
        type: 'SET_CHARTID',
        chartid
      })
    })
  }
}

export function fetchChart (chartid) {
  return (dispatch) => {

    dispatch({
      type: 'FETCHING_CHART'
    })

    axios.get(`/api/get?chartid=${chartid}`, )
      .then(response => {
        var data = {
          ...response.data,
          chartData: {
            ...response.data.chartData,
            types: response.data.chartData.types.reduce((result, type) => {
              result[type.id] = type
              return result
            }, {})
          }
        }
        dispatch({
          type: 'SET_FROM_SERVER',
          data
        })

        
        dispatch({
          type: 'SET_CHARTID',
          chartid
        })

        dispatch({
          type: 'NAPCHART_START',
          data
        })
        
      })
  }
}

export function fetchChartIfNeeded () {
  return (dispatch) => {
    var url = window.location.href

    dispatch({
      type: 'CHECKING_IF_FETCH_IS_NEEDED'
    })

    if (url.search('/c/') == -1) {
      // nothing to fetch!
      dispatch({
        type: 'NAPCHART_START'
      })
      return Promise.resolve()
    } else {
      var splitted = url.split('/')
      var chartid = splitted[splitted.length - 1]

      return dispatch(fetchChart(chartid))
    }
  }
}
