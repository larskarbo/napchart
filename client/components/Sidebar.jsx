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
      <div>
        <Expandable title="Polyphasic sleep" onToggle={this.onToggle.bind(null, 'poly')} active={this.isActive('poly')}>
          Submit feedback here
        </Expandable>

        <Expandable title="Feedback" onToggle={this.onToggle.bind(null, 'feedback')} active={this.isActive('feedback')}>
          Submit feedback here
        </Expandable>

        <Expandable title="About" onToggle={this.onToggle.bind(null, 'about')} active={this.isActive('about')}>
          Submit feedback here
        </Expandable>
      </div>
    )
  }

  onToggle = (key) => {
    this.setState({
      active: key
    })
  }

  isActive = key => this.state.active == key
}