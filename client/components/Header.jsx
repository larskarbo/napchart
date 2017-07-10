
import React from 'react'
import HeaderElement from './HeaderElement.jsx'
import UndoIcon from 'mdi-react/UndoVariantIcon'
import RedoIcon from 'mdi-react/RedoVariantIcon'

export default class Header extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    if(this.props.history.past.length == 0){
      var undoElement = (
        <div className="headerBtn disabled">
          <UndoIcon />
        </div>
      )
    }else{
      var undoElement = (
        <div className="headerBtn" onClick={this.props.undo}>
          <UndoIcon />
        </div>
      )
    }
    if(this.props.history.future.length == 0){
      var redoElement = (
        <div className="headerBtn disabled">
          <RedoIcon />
        </div>
      )
    }else{
      var redoElement = (
        <div className="headerBtn" onClick={this.props.redo}>
          <RedoIcon />
        </div>
      )
    }

    var chartidIndicator = ''
    if(typeof this.props.data.chartid != 'undefined'){
      chartidIndicator = (
        <div className="chartidIndicator">
          <input spellcheck="false" type="text" value={'https://napchart.com/c/' + this.props.data.chartid} />
        </div>
      )
    }


    return (
      <div className='header'>
        <HeaderElement className='logo' href="/">
          Napchart
        </HeaderElement>

      	
        <HeaderElement onClick={this.props.onSave.bind(null, this.props.data)}>
          Save
        </HeaderElement>
        {chartidIndicator}
        
        {undoElement}
        {redoElement}
        <HeaderElement style= {{marginLeft:'auto'}} onClick={this.props.onStartTour.bind(null, this.props.data)}>
          Start tour
        </HeaderElement>
      </div>

    )
  }
}
