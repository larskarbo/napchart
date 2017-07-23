const poly = (state = {open: false}, action) => {
	if(typeof state.schedules == 'undefined'){
    state.schedules = [
      {
        name: 'Monophasic',
        elements: [
          {
            start: 1260,
            end: 500,
            text: 'Sleep',
            typeId: '0',
            lane: 1
          }
        ]
      },
      {
        name: 'Everyman',
        elements: [
          {
            start: 1260,
            end: 30,
            duration: 100,
            text: '',
            typeId: '0',
            lane: 1
          },
          {
            start: 250,
            end: 270,
            duration: 120,
            text: '',
            typeId: '0',
            lane: 1
          },
          {
            start: 490,
            end: 510,
            duration: 120,
            text: '',
            typeId: '0',
            lane: 1
          },
          {
            start: 880,
            end: 900,
            duration: 120,
            text: '',
            typeId: '0',
            lane: 1
          }
        ]
      }
    ]
  }
  switch (action.type) {
    case 'TOGGLE_POLY':
      return {
        ...state,
        open: !state.open
      }
    default:
      return state
  }
}

export default poly
