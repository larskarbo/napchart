// data lives here (no it doesn't)

import React from 'react'
import Elements from './Elements.jsx'
import uuid from 'uuid'
import napchart from 'napchart'

import shallowEqual from 'react-pure-render/shallowEqual'


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
    console.log(nextState)
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  componentWillUpdate(nextProps, nextState){
    console.log('will update')
    this.state.napchart.update(this.dataToJS(this.props.data))
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
    console.log(this.props.data.elements.toJS())
    var napchart = Napchart.init(ctx, this.dataToJS(this.props.data), {shape:'circle'})
    napchart.onElementUpdate(this.props.onElementUpdate)

    napchart.onSetSelected(this.props.onSetSelected)

    this.state.napchart = napchart
  }

  dataToJS = (data) => {
    return {
      elements: data.elements.toJS(),
      selected: data.selected.toJS(),
      types: data.types.toJS(),
    }
  }


}