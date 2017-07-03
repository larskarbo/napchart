
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
    }else if(type.name.length == 0){
      var nameElement = <span onClick={this.props.onSetEditing}><i>No name</i></span>
    }else{
      var nameElement = <span onClick={this.props.onSetEditing}>{type.name}</span>
    }

    return (
      <div className="TypeElement">
        <div draggable='false'
        onMouseDown={this.maybeWillDrag} className={"colorSquare " + type.style}></div>
        <div className="type">{nameElement}</div>
        <div className="time">{this.calculateDuration(type, this.props.elements)}</div>
        <Button text="delete" onClick={this.props.onDeleteType} />
        <Button text="color" />
      </div>
    )
  }

  maybeWillDrag = (e) => {
    e.preventDefault()
    this.props.onDrag(this)
  }

  calculateDuration = (type, elements) => {
    // count minutes
    var minutes = elements.reduce((minutes, element) => {
      if(element.typeId == type.id){
        return minutes + this.duration(element.start, element.end)
      }else{
        return minutes
      }
    }, 0)
    return this.minutesToReadable(minutes)
  }

  duration = function (start, end) {
    if (end < start) {
      return 1440 - start + end
    } else {
      return end - start
    }
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