
import update from 'react-addons-update';

import React from 'react'
import Button from './Button.jsx'
import Type from './Type.jsx'


export default class Types extends React.Component {
  constructor(props){
    super(props)

    this.state = {
    	types: props.types,
      newTypeBeingCreated: false
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      types: nextProps.types
    })
  }

  render() {
    var newType
    if(this.state.newTypeBeingCreated){
      newType = (
        <div>
          <input autoFocus type="text" key='newType' value={this.state.newTypeBeingCreated.name} onChange={this.newTypeChange} onKeyPress={this.checkEnter} />
          <Button text="add" onClick={this.createType} />
        </div>
      )
    }
    return(
      <div>
        {Object.keys(this.state.types).map(type => (
          <Type key={type} type={this.state.types[type]} elements={this.props.elements}
          onTextChange={this.textChange.bind(null, this.state.types[type])}
          onDeleteType={this.props.onDeleteType.bind(null, type, this.props.elements)}
          onCreateElement={this.props.onCreateElement.bind(null, this.props.elements, type)}
          onDrag={this.props.onStartDrag.bind(null, this.props.elements, type)}
          onSetEditing={this.setEditing.bind(null, this.state.types[type])}
          onFinishedEditing={this.finishedEditing.bind(null, this.state.types[type])} />
        ))}
      </div>
    )
    return(
      <div>
        <Button text="Add type" onClick={this.addingNew} />
        {newType}

      	{Object.keys(this.state.types).map(type => (
      		<Type key={type} type={this.state.types[type]} elements={this.props.elements}
          onTextChange={this.textChange.bind(null, this.state.types[type])}
          onDeleteType={this.props.onDeleteType.bind(null, type, this.props.elements)}
          onCreateElement={this.props.onCreateElement.bind(null, this.props.elements, type)}
          onSetEditing={this.setEditing.bind(null, this.state.types[type])}
          onMoveLaneUp={this.props.onMoveLane.bind(null, this.state.types[type], 1)}
          onMoveLaneDown={this.props.onMoveLane.bind(null, this.state.types[type], -1)}
          onFinishedEditing={this.finishedEditing.bind(null, this.state.types[type])} />
      	))}
      </div>
    )
  }

  checkEnter = (e) => {
    if(e.key === 'Enter') {
      this.createType()
    }
  }

  createType(){
    this.props.onCreateType(this.state.newTypeBeingCreated, this.state.types)
    this.setState({
      newTypeBeingCreated: false
    })
  }

  newTypeChange = (e) => {
    this.setState({
      newTypeBeingCreated:{
        name: e.target.value
      }
    })
  }

  textChange = (type, e) => {
    type.name = e.target.value
    this.setState({
      types: this.state.types
    })
  }

  finishedEditing = (type, e) => {
    type.editing = false
    this.props.onTypeUpdate(type)
  }

  setEditing = (type) => {
    type.editing = true
    type.nameBeforeEditing = type.name
    this.setState({
      types: this.state.types
    })
  }

  addingNew = () => {
  	this.setState({
      types: {
        ...this.state.types
      },
      newTypeBeingCreated: {
        name:''
      }
    })
  }
}