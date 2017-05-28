
import React from 'react'
import Button from './Button.jsx'

export default class Header extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <div className="Element">
      	Napchart
      	{this.props.chartid}
        <Button text="save" onClick={this.props.onSave} />
      </div>
    )
  }

}