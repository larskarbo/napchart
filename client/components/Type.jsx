

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

  componentDidMount(){
    // use native events because then we can use preventDefault
    this.refs.add.addEventListener('touchstart', this.maybeWillDrag, false)
    this.refs.add.addEventListener('mousedown', this.maybeWillDrag, false)
  }

  render() {
    const {type} = this.props


    if(type.editing){
      var nameElement = <input autoFocus type="text" key='jfiji' value={type.name} onBlur={this.props.onFinishedEditing}
          onChange={this.props.onTextChange} onKeyPress={this.checkEnter} />
    }else if(type.name.length == 0){
      var nameElement = <span className="invisibleBeforeHover" onClick={this.props.onSetEditing}><i>Click to add name</i></span>
    }else{
      var nameElement = <span onClick={this.props.onSetEditing}>{type.name}</span>
    }

    if(type.locked){
      var LockIcon = <Lock />
    }else {
      var LockIcon = <LockUnlocked />
    }

    return (
      <div className="TypeElement">
        <div ref="add" className="add">
          <span className={"colorSquare " + type.style}></span>
        </div>
        <div className="duration">
          {this.calculateDuration(type, this.props.elements)}
        </div>
        <div className="options">
          {nameElement}
          <span className="invisibleBeforeHover iconlink" onClick={this.props.onLockToggle.bind(null, type.locked)}>{LockIcon}</span>
        </div>
      </div>
    )
        
  }
        // <div className="type" style={{color:this.props.styles[type.style],fill:this.props.styles[type.style]}}>
        //   {nameElement}
        // </div>

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