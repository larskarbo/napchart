

import React from 'react'
import Button from './Button.jsx'
import ColorPicker from './ColorPicker.jsx'
import TextboxIcon from 'mdi-react/TextboxIcon'
import Palette from 'mdi-react/PaletteIcon'
import Plus from 'mdi-react/PlusIcon'
import Trash from 'mdi-react/TrashIcon'
import Lock from 'mdi-react/LockIcon'
import LockUnlocked from 'mdi-react/LockUnlockedOutlineIcon'

import mapObject from '../helpers/mapObject'
import color from 'color'

export default class Type extends React.Component {
  constructor(props){
    super(props)

    this.state = {
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

    if(this.state.colorPicker){
      var colorPicker = (
        <div>
          {mapObject(this.props.styles, (style, name) => (
            <span key={name} onClick={this.setColor.bind(null, name)}
            style={{background: style}}
            className="smallColorBox"></span>
          ))}
        </div>
      )
    }else {
      var colorPicker = ''
    }

    if(type.locked){
      var LockIcon = <Lock />
    }else {
      var LockIcon = <LockUnlocked />
    }

    return (
      <div className="TypeElement">
        
        <div 
          onMouseDown={this.maybeWillDrag} onTouchStart={this.maybeWillDrag} className="add">
          <Plus className="plusicon" />
        </div>
        <div className="type" style={{color:this.props.styles[type.style],fill:this.props.styles[type.style]}}>
          <span style={{background:this.props.styles[type.style]}} className="colorSquare"></span>
          {nameElement}
        </div>
        <div className="options">
          <span className="iconlink" onClick={this.props.onSetEditing}><TextboxIcon /></span>
          <span className="iconlink" onClick={this.changeColor}><Palette /></span>
          <span className="iconlink" onClick={this.props.onDeleteType}><Trash /></span>
          <span className="iconlink" onClick={this.props.onLockToggle.bind(null, type.locked)}>{LockIcon}</span>
        </div>
        {colorPicker}
      </div>
    )
        
  }

  maybeWillDrag = (e) => {
    e.preventDefault()

    this.props.onDrag(this)
  }

  changeColor = () => {
    this.setState({
      colorPicker: !this.state.colorPicker
    })
    // window.addEventListener('mousedown', () => {
    //   this.setState({
    //     colorPicker: false
    //   })
    // })
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