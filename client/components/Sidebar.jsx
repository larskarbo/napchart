import React from 'react'

import Expandable from './Expandable.jsx'
import PolyToggleContainer from '../containers/PolyToggleContainer.jsx'


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
        <PolyToggleContainer />
        <div style={{textAlign:'left', fontSize:'11px'}}>
        Napchart is an app created to visualize complex time schedules. Check out the project on <a href="https://github.com/larskarbo/napchart">Github</a>.<br />Created by @larskarbo. Contact me at <a href="https://github.com/larskarbo/">Github</a>, <a href="https://www.reddit.com/user/gaptrast/">Reddit</a> or <a href="https://twitter.com/larskarbo">Twitter</a>. Feedback greatly appreciated 🌟
        </div>
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