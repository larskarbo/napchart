
import update from 'react-addons-update';

import React from 'react'
import Header from './Header.jsx'
import Chart from './Chart.jsx'
import Elements from './Elements.jsx'
import Types from './Types.jsx'

import styles from '../styles/index.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        elements: [
  	      {id:0, start: 100, end: 480, typeString: 'Workout', text:'First nap'},
  	      {id:1, start: 1000, end: 1020, typeString: 'Sleep', text:'Activity'}
  	    ],
  	    selected: [],
        types: [
          {
            name: 'Sleep',
            style: 'red',
            lane: 3
          },
          {
            name: 'Workout',
            style: 'blue',
            lane: 1,
          },
          {
            name: 'School',
            style: 'green',
            lane: 2,
          },
        ]
      },
    }
  }

  componentWillUpdate(nextProps, nextState){
  	// console.log(JSON.parse(JSON.stringify(nextState)))
  }

  render() {
    return (
     <div style={{textAlign: 'center'}} className="grid">
     	<Header />
     	<div className="grid">
     		<div className="col-1-2">
       			<Chart data={this.state.data} onSetData={this.updateData} />
        	</div>
     		<div className="col-1-2">
		        <Elements elements={this.state.data.selected}
		        onDeleteElement={this.deleteElement}
		        onDuplicateElement={this.duplicateElement}
		        onEditElement={this.editElement}
		        onMoveLaneUp={this.moveLaneUp}
		        onMoveLaneDown={this.moveLaneDown}
            types={this.state.data.types}
            />
            <Types types={this.state.data.types}
            onAddType={this.addType}
            elements={this.state.data.elements} />
		    </div>
        </div>
     </div>);
  }

  addType = (element) => {
    // var value = e.target.value * 1
    this.setState(update(this.state,{
      data:{
        types: {
          $push: element
        }
      }
    }))
  }

  editElement = (element) => {
    // var value = e.target.value * 1
    console.log(JSON.parse(JSON.stringify(element)))
    this.setState(update(this.state,{
      data:{
        $merge: {
          elements: this.state.data.elements.map(el => {
            if(el.id == element.id){
              return element
            }
            return el
          })
        }
      }
    }))
  }

  deleteElement = (element, e) => {
    console.log('fsdifsji')
    e.stopPropagation()
    this.setState({
      data:{
        elements: this.state.data.elements.filter((el) =>
          element.id !== el.id),
        selected: this.state.data.elements.filter((el) =>
          element.id !== el.id),
      }
    })
  }

  addElement = (e) => {
    e.stopPropagation()

    this.state.napchart.addElement()
  }

  duplicateElement = (element, e) => {
    console.log('duplicate')
    e.stopPropagation()
    var newElement = Object.assign({}, element)
    newElement.id = 9
    newElement.start = element.end + 60
    newElement.end = newElement.start + 120
    this.setState({
        data: {
        	...this.state.data,
        	elements: this.state.data.elements.concat(newElement)
        }
    })
  }

  updateData = (data) => {
  	this.setState(update(this.state, {
  		data: {
        $merge: data
      }
  	}))
  }

  moveLaneUp = (data) => {
  	this.setState({
  		data: data
  	})
  }

  moveLaneDown = (data) => {
  	this.setState({
  		data: data
  	})
  }
}