
import React from 'react'
import Button from './Button.jsx'
import Trash from 'mdi-react/DeleteCircleIcon'


export default class Element extends React.Component {
  render() {
    const {element} = this.props
    var deleteButton = ''
    if(!element.disabled){
    	var deleteButton = <Button text={<Trash />} onClick={this.props.onDeleteElement} />
    }
    return(
      <div className="Element">
        <input style={{width: '80%'}} ref={input => input && input.focus()} type="text" disabled={element.disabled} onChange={this.textChange} value={element.text} />
        {deleteButton}
      </div>
    )
  }

  textChange = (e) => {
    this.props.onTextChange(this.props.element.id, e.target.value)
  }
}