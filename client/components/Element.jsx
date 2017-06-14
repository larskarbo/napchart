
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
        <input type="text" onChange={this.textChange} onKeyPress={this.checkEnter} value={element.text} />
        <select onChange={this.typeChange} value={element.type}>
          {Object.keys(this.props.types).map(id => (
            <option key={id} value={id}>{this.props.types[id].name}</option>
          ))}
        </select>
        <Button text="x" onClick={this.props.onDeleteElement} />
      </div>
    )
  }

  textChange = (e) => {
    this.props.element.text = e.target.value
    this.finishEdit()
  }

  typeChange = (e) => {
    this.props.element.type = e.target.value
    this.finishEdit()
  }

  checkEnter = (e) => {
    if(e.key === 'Enter') {
      this.finishEdit()
    }
  }

  finishEdit = () => {
    this.props.onElementUpdate(this.props.element)
  }

  limitValue = (value) => {
    if(value == 1440) return 1440
    return value - 1440 * Math.floor(value/1440)
  }
}