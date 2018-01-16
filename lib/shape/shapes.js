
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
    ],
    laneMinRadius: 16
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
    ],
    laneMaxRadius: 60,
    laneMinRadius: 0,
    maxLaneSize: 20,
    shiftDown: 30
  },
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
    ]
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
