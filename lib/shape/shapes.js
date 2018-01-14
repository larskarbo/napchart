
module.exports = {
  miniCircle: {
    elements: [
      {
        type: 'arc',
        radians: Math.PI
      },
      {
        type: 'line',
        percent: 0 // percent
      },
      {
        type: 'arc',
        radians: Math.PI
      },
      {
        type: 'line',
        percent: 0 // percent
      }
    ]
  },
  circle: {
    elements: [
      {
        type: 'arc',
        radians: Math.PI
      },
      {
        type: 'line',
        percent: 0 // percent
      },
      {
        type: 'arc',
        radians: Math.PI
      },
      {
        type: 'line',
        percent: 0 // percent
      }
    ]
  },
  line: {
    elements: [
      {
        type: 'line',
        percent: 100
      }
    ]
  },
  // compactLine: {
  //   elements:[
  //     {
  //       type: 'line',
  //       percent: 5
  //     }
  //   ],
  //   shift: 0,
  //   lanes: [
  //     {start:20, end: 26},
  //     {start:26, end: 32},
  //     {start:32, end: 38},
  //   ]
  // },
  wide: {
    elements: [
      {
        type: 'arc',
        radians: Math.PI
      },
      {
        type: 'line',
        percent: 100 // percent
      },
      {
        type: 'arc',
        radians: Math.PI
      },
      {
        type: 'line',
        percent: 100 // percent
      }
    ],
    shift: 0
  },
  transitionShape: {
    elements: [
      {
        type: 'arc',
        radians: Math.PI / 6
      }
    ],
    shift: 0
  }
  // smile: {
  //   elements: [
  //     {
  //       type: 'arc',
  //       radians: Math.PI/4
  //     },
  //   ],
  //   shift: 0
  // },
  // verticalEllipse: [
  //   {
  //     type: 'arc',
  //     value: Math.PI/2
  //   },
  //   {
  //     type: 'line',
  //     value: 150
  //   },
  //   {
  //     type: 'arc',
  //     value: Math.PI
  //   },
  //   {
  //     type: 'line',
  //     value: 150
  //   },
  //   {
  //     type: 'arc',
  //     value: Math.PI/2
  //   }
  // ],
  // fucked: [
  //   {
  //     type: 'arc',
  //     value: Math.PI/2*3
  //   },
  //   {
  //     type: 'line',
  //     value: 100
  //   },
  //   {
  //     type: 'arc',
  //     value: Math.PI/2
  //   },
  //   {
  //     type: 'line',
  //     value: 100
  //   },
  //   {
  //     type: 'arc',
  //     value: Math.PI/2
  //   },
  //   {
  //     type: 'line',
  //     value: 50
  //   },
  // ]
}
