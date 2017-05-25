

import React from 'react'

export default class Button extends React.Component {
  render() {
    return (
     <button className="Button" onClick={this.props.onClick}>
     	{this.props.text}
     </button>);
  }
}