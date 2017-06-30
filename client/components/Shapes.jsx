import React from 'react'
import Button from './Button.jsx'

export default class Chart extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
  	var {shapes} = this.props

  	var shapeButtons = shapes.shapes.map(shape => {
  		return <Button onClick={this.props.onChangeShape.bind(null, shape)} key={shape} text={shape} />
  	})
    return (
      <div>
        {shapeButtons}
      </div>)
  }
}
