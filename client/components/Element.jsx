
import React from 'react'
import Button from './Button.jsx'

export default class Element extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const {element, onDeleteElement} = this.props

    return(
      <div className="Element">
        <Button text="color" />
        <Button text="up" />
        <Button text="down" />
        <input type="text" onChange={this.textChange} onKeyPress={this.checkEnter} value={element.text} />
        <Button text="x" onClick={onDeleteElement} />
      </div>
    )
  }

  startChange = (e) => {
    this.props.element.start = this.limitValue(e.target.value * 1)
    this.finishEdit()
  }

  endChange = (e) => {
    this.props.element.end = this.limitValue(e.target.value * 1)
    this.finishEdit()
  }

  textChange = (e) => {
    this.props.element.text = e.target.value
    this.finishEdit()
  }

  checkEnter = (e) => {
    if(e.key === 'Enter') {
      this.finishEdit()
    }
  }

  finishEdit = (number) => {
    this.props.onEditElement(this.props.element)
  }

  limitValue = (value) => {
    if(value == 1440) return 1440
    return value - 1440 * Math.floor(value/1440)
  }
}