
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

  render() {
    var nameSign;

    return(
      <div>
        <Button text="Add type" onClick={this.addingNew} />

      	{this.state.types.map(type => (
      		<Type key={type.name} type={type} elements={this.props.elements}
          onTextChange={this.textChange.bind(null, type)} />
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
    type.editing = false
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