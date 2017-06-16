
import React from 'react'
import Button from './Button.jsx'
import ColorPicker from './ColorPicker.jsx'

export default class Type extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const {type} = this.props
    if(type.editing){
      return (
        <div className="Element">

          <input autoFocus type="text" key='jfiji' value={type.name} onBlur={this.props.onFinishedEditing}
          onChange={this.props.onTextChange} onKeyPress={this.checkEnter} />
          

        </div>
      )
    }
    return (
      <div className="Element">

        <span onClick={this.props.onSetEditing}>{type.name}</span>
        <Button text="edit" onClick={this.props.onSetEditing} />


        <Button text="up" onClick={this.props.onMoveLaneUp} />
        <Button text="down" onClick={this.props.onMoveLaneDown} />

        <Button text="+" onClick={this.props.onCreateElement} />
        <Button text="color" onClick={this.props.onMoveLaneUp} />
        <Button text="x" onClick={this.props.onDeleteType} />
        {this.calculateDuration(type)}

      </div>
    )
  }

  

  calculateDuration = (type) => {
    var minutes = 0
    this.props.elements.forEach(element => {
      if(element.type == type){

      }
    })
    return "6h 30m"
  }

  checkEnter = (e) => {
    if(e.key === 'Enter') {
      this.props.onFinishedEditing(e)
    }
  }

  changeText = (e) => {
    this.props.onTextChange(e)
  }
}