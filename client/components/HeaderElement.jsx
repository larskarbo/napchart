
import React from 'react'

export default class HeaderElement extends React.Component {
  render () {
    return (
      <a href={this.props.href} style={this.props.style} className='HeaderElement' onClick={this.props.onClick}>
        <span>{this.props.text}</span>
      </a>)
  }
}