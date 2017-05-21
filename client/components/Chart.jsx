// data lives here

import React from 'react'
import Elements from './Elements.jsx'
import uuid from 'uuid'

export default class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: uuid.v4(),
    }
  }

  componentDidMount() {
    this.initializeChart()
  }

  render() {
    return (
      <div>
        <canvas width="600" height="600" ref={this.state.id}>
          A chart
        </canvas>
     </div>)
  }

  initializeChart() {
    var ctx = this.refs[this.state.id].getContext('2d')

    var napchart = Napchart.init(ctx, {shape:'circle'})
    napchart.addListener(chart => this.setData(chart.data))
    napchart.setElements(this.props.data.elements)

    this.state.napchart = napchart
  }

  setData = (data) => {
    this.props.onSetData(data)
  }
}