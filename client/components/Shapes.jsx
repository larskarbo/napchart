import React from 'react'

export default class Chart extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
  	var {shapes} = this.props

  	var shapeButtons = shapes.shapes.map(shape => {
      var className = ""
      if(shapes.activeShape == shape){
        var className = "active"
      }
      return (
        <button style={{width: '30%', height: '30px'}} className={"shapeButton " + className} onClick={this.props.onChangeShape.bind(null, shape)} key={shape}>
          {shape}
        </button>
      )
  	})
    return (
      <div>
        {shapeButtons}
      </div>)
  }
}
