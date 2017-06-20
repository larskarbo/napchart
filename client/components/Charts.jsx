
import React from 'react'
import Chart from './Chart.jsx'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      charts: [<Chart key='1' />]
    }

    this.addChart = this.addChart.bind(this)
  }

  addChart () {
    console.log('yes')
    this.setState((prevState) => ({
      charts: [...prevState.charts, <Chart key={prevState.charts.length + 1} />]
    }))
  }

      // <div onClick={this.addChart}>
  render () {
    return (
      <div>
        {this.state.charts}
      </div>
    )
  }
}
