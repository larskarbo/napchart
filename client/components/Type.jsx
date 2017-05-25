
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

          <input type="text" onKeyPress={this.checkEnter} />
          
          <Button text="+" onClick={this.props.onMoveLaneUp} />
          <Button text="color" onClick={this.props.onMoveLaneUp} />
          {this.calculateDuration(type)}

        </div>
      )
    }
    return (
      <div className="Element">

        {type.name}
        <Button text="edit" onClick={this.props.onMoveLaneUp} />

        <Button text="+" onClick={this.props.onMoveLaneUp} />
        <Button text="color" onClick={this.props.onMoveLaneUp} />
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
      console.log('enter')
      this.props.onTextChange(e)
    }
  }
}