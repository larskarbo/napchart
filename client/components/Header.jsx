
import React from 'react'
import Button from './Button.jsx'

export default class Header extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    console.log(this.props)
    return(
      <div className="header">
      	Napchart
      	{this.props.data.chartid}
        <Button text="save" onClick={this.props.onSave.bind(null, this.props.data)} />
      </div>
    )
  }

}