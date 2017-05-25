
import React from 'react'

export default class ColorPicker extends React.Component {
  constructor(props){
    super(props)

    this.state = {
    	panelOpen: false
    }
  }

  render() {
    var lol = ""
    if(this.state.panelOpen){
    	var lol = (
    		<div>

    			<span></span>
    			
    		</div>
    	)
    }
    return(
      <div onClick={this.openPanel}>dsfdskfjl
      	{lol}
      </div>
    )
  }

  openPanel = (value) => {
    this.setState({
    	panelOpen: !this.state.panelOpen
    })
  }
}