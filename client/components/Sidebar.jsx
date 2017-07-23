import React from 'react'

import Expandable from './Expandable.jsx'


export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      active: 'types'
    }
  }

  render () {
  	return (
      <div style={{textAlign:'left', fontSize:'11px'}}>
      Napchart is an app created to visualize complex time schedules. Check it out on <a href="jij">Github</a>
      </div>
    )
  }

        // <Expandable title="About & feedback" onToggle={this.onToggle.bind(null, 'about')} active={this.isActive('about')}>
        //   Submit feedback here
        // </Expandable>
  onToggle = (key) => {
    this.setState({
      active: key
    })
  }

  isActive = key => this.state.active == key
}