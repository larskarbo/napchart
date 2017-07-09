import React from 'react'

export default class App extends React.Component {
  render () {
    var activeClass = ''
    if(this.props.active){
      activeClass = ' active'
    }
    return (
    	<div>
  	  	<div onClick={this.props.onToggle} className={"toggler" + activeClass}>{this.props.title}</div>
  	  	<div className={"expandable" + activeClass}>{this.props.children}</div>
    	</div>
    )
  }
}