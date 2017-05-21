

import React from 'react'

export default class Canvas extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
     <canvas style={{textAlign: 'center'}} width="500" height="500" ref='yoo'>
        A chart
      </canvas>);
  }
}