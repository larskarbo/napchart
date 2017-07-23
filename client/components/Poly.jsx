import React from 'react'

export default class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    if(this.props.open){
      var className = 'open'
    } else {
      var className = ''
    }

  	return (
      <div className={"polyBar " + className}>
        <div className="instruction">Clicking on any of theese schedules will overwrite your red elements</div>
  	    {this.props.schedules.map(schedule => (
          <div onClick={this.props.setSchedule.bind(null, this.props.elements, schedule)} className="schedule">{schedule.name}</div>
        ))}
      </div>
    )
  }

}