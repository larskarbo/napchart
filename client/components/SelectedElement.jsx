
import React from 'react'
import Button from './Button.jsx'
import Trash from 'mdi-react/DeleteCircleIcon'


export default class Element extends React.Component {
  render() {
    const {element} = this.props
    return(
      <div className="Element">
        <input autoFocus ref={input => input && input.focus()} className="selectedElement" placeholder="text" type="text" disabled={element.disabled} onChange={this.textChange} value={element.text} />
        <Button text={<Trash />} onClick={this.props.onDeleteElement} />
      </div>
    )
  }

  textChange = (e) => {
    this.props.onTextChange(this.props.element.id, e.target.value)
  }
}