

import React from 'react'

export default class Button extends React.Component {
  render() {
    return (
     <button className="Button">
     	{this.props.text}
     </button>);
  }
}