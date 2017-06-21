
import React from 'react'

export default class Header extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    var { type } = this.props

    if(type.name.length === 0){
      return null
    }

    return (
      <div className="StatsElement">
        <div className={"colorSquare " + type.style}></div>
        <div className="type">{type.name}</div>
        <div className="time">{this.calculateTime(type)}</div>
      </div>
    )
  }

  calculateTime(type){
    // count minutes
    console.log(this.props.elements)
    var minutes = this.props.elements.reduce((minutes, element) => {
      if(element.typeId === type.id){
        return minutes + element.duration
      }else{
        return minutes
      }
    }, 0)
    return this.minutesToReadable(minutes)
  }

  minutesToHoursMinutes(min){

      var hours = Math.floor(min / 60) + "";
      var minutes = min % 60 + "";
      minutes = Math.floor(minutes);

      return {
          hours:hours,
          minutes:minutes
      };
  };

  minutesToReadable(min,breakpoint){
      //extends minutesToHoursMinutes and adds h and m
      var hm;
      if(typeof breakpoint == 'undefined'){
          breakpoint = 60
      }

      if(min > breakpoint){
          hm = this.minutesToHoursMinutes(min);
          return hm.hours + 'h ' + hm.minutes + 'm';
      }else{
          return min + 'm';
      }
  }
}
