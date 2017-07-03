

import React from 'react'
import Button from './Button.jsx'
import ColorPicker from './ColorPicker.jsx'
import TextboxIcon from 'mdi-react/TextboxIcon'
import Palette from 'mdi-react/PaletteIcon'
import Plus from 'mdi-react/PlusIcon'
import Trash from 'mdi-react/TrashIcon'

import mapObject from '../helpers/mapObject'

export default class Type extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      hover: false,
      colorPicker: false
    }
  }

  render() {
    const {type} = this.props


    if(type.editing){
      var nameElement = <input autoFocus type="text" key='jfiji' value={type.name} onBlur={this.props.onFinishedEditing}
          onChange={this.props.onTextChange} onKeyPress={this.checkEnter} />
    }else if(type.name.length == 0){
      var nameElement = <span onClick={this.props.onSetEditing}><i>...</i></span>
    }else{
      var nameElement = (
        <span onClick={this.props.onSetEditing}>{type.name}
          
        </span>
      )
    }

    if(this.state.hover){
      var hoverClass = 'hover'
      var hoverStyle = {background: this.props.styles[type.style]}
    }else {
      var hoverClass = ''
      var hoverStyle = {}
    }

    if(this.state.colorPicker){
      var colorPicker = (
        <div>
          {mapObject(this.props.styles, (style, name) => (
            <span key={name} onClick={this.setColor.bind(null, name)} style={{background: style}} className="smallColorBox"></span>
          ))}
        </div>
      )
    }else {
      var colorPicker = ''
    }

    return (
      <div style={hoverStyle} className={"TypeElement " + hoverClass}>
        <div style={{background:this.props.styles[type.style]}} className="colorSquare"></div>
        <div 
          onMouseEnter={this.hoverStart}
          onMouseLeave={this.hoverEnd}
          onMouseDown={this.maybeWillDrag} className="add">
          <Plus className="plusicon" />
        </div>
        <div className="type">{nameElement}</div>
        <div>
          <span className="iconlink" onClick={this.props.onSetEditing}><TextboxIcon /></span>
          <span className="iconlink" onClick={this.changeColor}><Palette /></span>
          <span className="iconlink" onClick={this.props.onDeleteType}><Trash /></span>
        </div>
        {colorPicker}
      </div>
    )
        
  }

  maybeWillDrag = (e) => {
    e.preventDefault()

    this.props.onDrag(this)
  }

  hoverStart = (e) => {
    this.setState({
      hover: true
    })
  }

  hoverEnd = (e) => {
    this.setState({
      hover: false
    })
  }

  changeColor = () => {
    this.setState({
      colorPicker: true
    })
  }

  setColor = (color) => {
    this.props.onStyleChange(color)
    this.setState({
      colorPicker: false
    })
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