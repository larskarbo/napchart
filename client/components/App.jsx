
import update from 'react-addons-update';
import axios from 'axios'


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
      elements: [
      ],
      selected: [],
      types: [
      ]
    }
    this.connectTypes(this.state)
  }

  componentDidMount() {
    this.checkURLAndGetChart()

  }

  componentWillUpdate(nextProps, nextState){
    console.log(JSON.parse(JSON.stringify(nextState)))
    
  }

  render() {
    return (
     <div style={{textAlign: 'center'}} className="grid">
     <Header
     chartid={this.state.chartid}
     onSave={this.saveChart} />
     <div className="grid">
     <div className="col-1-2">
     <Chart data={this.state} onSetData={this.updateData} />
     </div>
     <div className="col-1-2">
     <Elements elements={this.state.selected}
     onDeleteElement={this.deleteElement}
     onDuplicateElement={this.duplicateElement}
     onEditElement={this.editElement}
     onMoveLaneUp={this.moveLaneUp}
     onMoveLaneDown={this.moveLaneDown}
     types={this.state.types}
     />
     <Types types={this.state.types}
     onAddType={this.addType}
     onDeleteType={this.deleteType}
     elements={this.state.elements} />
     </div>
     </div>
     </div>);
  }

  defaultType = {
    name: 'default',
    style: 'grey',
    lane: 2
  }

  editElement = (element) => {
    // var value = e.target.value * 1
    console.log(JSON.parse(JSON.stringify(element)))
    this.setState({
      elements: this.state.elements.map(el => {
        if(el.id == element.id){
          return element
        }
        return el
      })
    })

    this.connectTypes(this.state)
  }

  deleteElement = (element, e) => {
    console.log('fsdifsji')
    e.stopPropagation()
    this.setState({
      elements: this.state.elements.filter(el => element.id !== el.id),
      selected: this.state.elements.filter(el => element.id !== el.id)
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
      elements: this.state.elements.concat(newElement)
    })
  }

  updateData = (data) => {
  	this.setState(data)
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

  saveChart = () => {
    console.log('saving')
    var data = JSON.parse(JSON.stringify(this.state))

    // data.types.forEach(type => {
    //   type.style = type.style.name
    // })

    data.elements.forEach(element => {
      delete element.type
    })

    axios.post('/api/create', {
      lol: 'lars',
      data: JSON.stringify(data)
    })
    .then(function (response) {
      console.log(response)
      var chartid = response.data.id
      window.history.pushState(response.data, "", '/c/'+chartid)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  checkURLAndGetChart = () => {
    var url = window.location.href

    if(url.search('/c/') == -1){
      return
    }

    var splitted = url.split('/')
    var chartid = splitted[splitted.length - 1]

    axios.get(`/api/get?chartid=${chartid}`, )
    .then(response => {
      this.connectTypes(response.data.data)
      this.setState(response.data.data)

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  connectTypes = (state) => {
    // connect all elements to their type
    state.elements.forEach(element => {
      element.type = state.types.find(type => type.name == element.typeName)

      if(typeof element.type == 'undefined'){
        if(element.typeName == 'default'){
          element.type = this.defaultType
        }else{
          throw new Error(`Type ${element.typeName} does not exist`)
        }
      }
    })

  }

  deleteType = (type) => {
    // move away all elements from type
    this.setState({
      elements: this.state.elements.map(element => {
        if(type.name == element.typeName){
          element.typeName = 'default'
        }
        return element
      })
    })

    this.connectTypes(this.state)

  // delete type
  this.setState({
    types: this.state.types.filter(tp => tp.name != type.name)
  })
}

addType = (type) => {
  this.setState(update({
    types: {
      $push: type
    }
  }))
}

}