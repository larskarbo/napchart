// data lives here (no it doesn't)

import React from 'react'
import Elements from './Elements.jsx'
import uuid from 'uuid'
import napchart from 'napchart'



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

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  componentWillUpdate(nextProps, nextState){
    this.state.napchart.update(nextProps.data)
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
    var napchart = Napchart.init(ctx, this.props.data, {shape:'circle'})
    napchart.onElementUpdate(this.props.onElementUpdate)

    napchart.onSetSelected(this.props.onSetSelected)

    this.state.napchart = napchart
  }


}