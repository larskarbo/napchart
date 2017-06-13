
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

      	{this.state.types.map(type => (
      		<Type key={type.name} type={type} elements={this.props.elements}
          onTextChange={this.textChange.bind(null, type)}
          onDeleteType={this.props.onDeleteType.bind(null, type)}
          onSetEditing={this.setEditing.bind(null, type)}
          onFinishedEditing={this.finishedEditing.bind(null, type)} />
      	))}
      		<div className="Element">
      			Unallocated time
        		14h 3m

      		</div>
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
    console.log(type.nameBeforeEditing)
    this.props.onSetTypes(this.state.types)
    // this.props.onEditType(type)
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