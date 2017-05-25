
import React from 'react'
import Button from './Button.jsx'

export default class Element extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const {element} = this.props

    return(
      <div className="Element">
        <Button text="up" onClick={this.props.onMoveLaneUp} />
        <Button text="down" onClick={this.props.onMoveLaneDown} />
        <input type="text" onChange={this.textChange} onKeyPress={this.checkEnter} value={element.text} />
        <select onChange={this.typeChange} value={element.typeString}>
          {this.props.types.map(type => (
            <option key={type.name} value={type.name}>{type.name}</option>
          ))}
        </select>
        <Button text="duplicate" onClick={this.props.onDuplicateElement} />
        <Button text="x" onClick={this.props.onDeleteElement} />
      </div>
    )
  }

  textChange = (e) => {
    this.props.element.text = e.target.value
    this.finishEdit()
  }

  typeChange = (e) => {
    this.props.element.typeString = e.target.value
    this.finishEdit()
  }

  checkEnter = (e) => {
    if(e.key === 'Enter') {
      this.finishEdit()
    }
  }

  finishEdit = () => {
    console.log(this.props.element)
    this.props.onEditElement(this.props.element)
  }

  limitValue = (value) => {
    if(value == 1440) return 1440
    return value - 1440 * Math.floor(value/1440)
  }
}