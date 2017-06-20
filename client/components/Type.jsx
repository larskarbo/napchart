
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
      var nameElement = <input autoFocus type="text" key='jfiji' value={type.name} onBlur={this.props.onFinishedEditing}
          onChange={this.props.onTextChange} onKeyPress={this.checkEnter} />
    }else{
      var nameElement = <span onClick={this.props.onSetEditing}>{type.name}</span>
    }

    return (
      <div className="">

        <div className={"colorSquare " + type.style} onClick={this.props.onSetEditing}></div>
        {nameElement}
        {//this.props.onCreateElement
        }
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
    // return "6h 30m"
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