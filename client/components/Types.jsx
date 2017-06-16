
import update from 'react-addons-update';

import React from 'react'
import Button from './Button.jsx'
import Type from './Type.jsx'


export default class Types extends React.Component {
  constructor(props){
    super(props)

    this.state = {
    	types: props.types
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      types: nextProps.types
    })
  }

  render() {

    return(
      <div>
        <Button text="Add type" onClick={this.addingNew} />

      	{Object.keys(this.state.types).map(type => (
      		<Type key={type} type={this.state.types[type]} elements={this.props.elements}
          onTextChange={this.textChange.bind(null, this.state.types[type])}
          onDeleteType={this.props.onDeleteType.bind(null, type)}
          onCreateElement={this.props.onCreateElement.bind(null, this.props.elements, type)}
          onSetEditing={this.setEditing.bind(null, this.state.types[type])}
          onFinishedEditing={this.finishedEditing.bind(null, this.state.types[type])} />
      	))}
      </div>
    )
  }

  textChange = (type, e) => {
    if(type.name.length == null){

    }
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
  	this.setState(update(this.state,{
  		types: {
  			$push: [{
          name: '',
          style: 'default',
          lane: 2,
          editing: true
        }]
  		}
    }
  	))
  }
}