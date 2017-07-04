
import React from 'react'
import HeaderElement from './HeaderElement.jsx'

export default class Header extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    if(this.props.history.past.length == 0){
      var undoElement = (
        <HeaderElement className="disabled">
          Undo
        </HeaderElement>
      )
    }else{
      var undoElement = (
        <HeaderElement onClick={this.props.undo}>
          Undo
        </HeaderElement>
      )
    }
    console.log(this.props.history.future.length)
    if(this.props.history.future.length == 0){
      var redoElement = (
        <HeaderElement className="disabled">
          Redo
        </HeaderElement>
      )
    }else{
      var redoElement = (
        <HeaderElement onClick={this.props.redo}>
          Redo
        </HeaderElement>
      )
    }


    return (
      <div className='header'>
        <HeaderElement className='logo' href="/">
          Napchart
        </HeaderElement>

      	{this.props.data.chartid}
        <HeaderElement onClick={this.props.onSave.bind(this.props.data)}>
          Save
        </HeaderElement>
        <HeaderElement onClick={this.props.onSave.bind(this.props.data)}>
          Export
        </HeaderElement>
        {undoElement}
        {redoElement}
        <HeaderElement style= {{float:'right'}} onClick={this.props.onStartTour.bind(this.props.data)}>
          Start tour
        </HeaderElement>
      </div>

    )
  }
}
