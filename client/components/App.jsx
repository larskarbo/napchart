

import React from 'react'
import Header from './Header.jsx'
import Chart from './Chart.jsx'
import Elements from './Elements.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        elements: [
	      {start: 100, end: 480, typeString: 'busy'},
	      {start: 1000, end: 1020, typeString: 'sleep'}
	    ]
      }
    }
  }

  render() {
    return (
     <div style={{textAlign: 'center'}}>
     	<Header />
        <Chart data={this.state.data} onSetData={this.updateData} />
        <Elements elements={this.state.data.elements}
        onDeleteElement={this.deleteElement}
        onEditElement={this.editElement} />
     </div>);
  }

  editElement = (id, element) => {
    // var value = e.target.value * 1
    console.log(id, element)
    this.setState({
      data:{
        elements: this.state.data.elements.map((el, index) => {
          if(index == id){
            el = element
          }
          return el
        })
      }
    })
  }

  deleteElement = (id, e) => {
    e.stopPropagation()

    this.setState({
      data:{
        elements: this.state.data.elements.filter((element, index) =>
          id !== index)
      }
    })
  }

  addElement = (e) => {
    e.stopPropagation()

    this.state.napchart.addElement()
  }

  updateData = (data) => {
  	this.setState({
  		data: data
  	})
  }
}