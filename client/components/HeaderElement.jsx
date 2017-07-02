
import React from 'react'

export default class HeaderElement extends React.Component {
  render () {
    return (
      <a style={this.props.style} className='HeaderElement' onClick={this.props.onClick}>
        <span>{this.props.text}</span>
      </a>)
  }
}