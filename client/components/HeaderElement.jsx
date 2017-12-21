
import React from 'react'

export default class HeaderElement extends React.Component {
	
  render () {
    if(typeof this.props.onClick == 'undefined'){
      var onClick = this.doNothing
    }else {
      var onClick = this.onClick
    }
    return (
      <a style={this.props.style} href={this.props.href} className={'HeaderElement' + ' ' + this.props.className} onClick={onClick}>
        <span>{this.props.children}</span>
      </a>)
  }

  onClick = () => {
  	this.props.onClick()
  }

  doNothing = () => {}
}