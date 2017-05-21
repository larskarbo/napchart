

import React from 'react'
import Header from './Header.jsx'
import Chart from './Chart.jsx'
import Elements from './Elements.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        elements: []
      }
    }
  }

  render() {
    return (
     <div style={{textAlign: 'center'}}>
     	<Header />
        <Chart data= />
        <Elements data={this.state.data} elements={this.state.data.elements}
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

  setData = (data) => {

  }
}