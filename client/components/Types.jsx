
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
    console.log(this.state.types.valueSeq().map(type => type ).toJS())
    return(
      <div>
        <Button text="Add type" onClick={this.addingNew} />


      	{this.state.types.valueSeq().map(type => {
          return (
      		<Type key={type.get('id')} type={type} elements={this.props.elements}
          onTextChange={this.textChange.bind(null, type)}
          onDeleteType={this.props.onDeleteType.bind(null, type.get('id'))}
          onCreateElement={this.props.onCreateElement.bind(null, this.props.elements, type)}
          onSetEditing={this.setEditing.bind(null, type)}
          onFinishedEditing={this.finishedEditing.bind(null, type)} />
      	)})}
      </div>
    )
  }

  textChange = (type, e) => {
    this.setState({
      types: this.state.types.setIn([type.get('id'), 'name'], e.target.value)
    })
  }

  finishedEditing = (type, e) => {
    
    this.props.onTypeUpdate(type.set('editing', false))
  }

  setEditing = (type) => {
    this.setState({
      types: this.state.types.updateIn([type.get('id'), 'editing'], value => true)
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