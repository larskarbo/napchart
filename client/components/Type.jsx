
import React from 'react'
import Button from './Button.jsx'
import ColorPicker from './ColorPicker.jsx'

export default class Type extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dragging: false
    }
  }

  render() {
    const {type} = this.props


    if(type.editing){
      var nameElement = <input autoFocus type="text" key='jfiji' value={type.name} onBlur={this.props.onFinishedEditing}
          onChange={this.props.onTextChange} onKeyPress={this.checkEnter} />
    }else{
      var nameElement = <span onClick={this.props.onSetEditing}>{type.name}</span>
    }

    if(this.state.dragging){
      var classNames = "TypeElement"
    } else {
      var classNames = "TypeElement dragging"
    }

    return (
      <div className={classNames}>
        <div draggable='false' onClick={this.toggleDrag}
        onMouseDown={this.maybeWillDrag} onMouseUp={this.toggleDrag} className={"colorSquare " + type.style}></div>
        <div className="type">{nameElement}</div>
        <div className="time">{this.calculateDuration(type)}</div>
      </div>
    )
  }

  maybeWillDrag = () => {
    this.props.onDrag(this)
  }

  toggleDrag = () => {
    this.setState({
      dragging: !this.state.dragging
    })
  }

  calculateDuration = (type) => {
    // count minutes
    var minutes = this.props.elements.reduce((minutes, element) => {
      if(element.typeId === type.id){
        return minutes + element.duration
      }else{
        return minutes
      }
    }, 0)
    return this.minutesToReadable(minutes)
  }

  checkEnter = (e) => {
    if(e.key === 'Enter') {
      this.props.onFinishedEditing(e)
    }
  }

  changeText = (e) => {
    this.props.onTextChange(e)
  }

  minutesToHoursMinutes(min){

      var hours = Math.floor(min / 60) + ""
      var minutes = min % 60 + ""
      minutes = Math.floor(minutes)

      return {
          hours:hours,
          minutes:minutes
      }
  }

  minutesToReadable(min,breakpoint){
      //extends minutesToHoursMinutes and adds h and m
      var hm;
      if(typeof breakpoint == 'undefined'){
          breakpoint = 60
      }

      if(min > breakpoint){
          hm = this.minutesToHoursMinutes(min)
          return hm.hours + 'h ' + hm.minutes + 'm'
      }else{
          return min + 'm'
      }
  }
}