import React from 'react'

export default class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
  	return (
    <button onClick={this.props.toggle} style={{height: '30px', fontSize: '11px', marginBottom: '10px'}} className={"button polytoggle"}>
      Polyphasic sleep schedules
    </button>
    )
  }

}