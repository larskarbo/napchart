

import React from 'react'
import Element from './Element.jsx'

export default class Elements extends React.Component {
	constructor(props){
		super(props)
	}

	render() {
    const {elements, types} = this.props
    
    return (
       <div style={{paddingTop: '100px'}}>
        {elements.map((element) => 
          (
            <div key={element.id}>
              <Element 
              onElementUpdate={this.props.onElementUpdate.bind(element)}
              onDeleteElement={this.props.onDeleteElement.bind(null, element.id)}
               element={element} types={types}
              />
            </div>
          )
        )}
       </div>
      )
  }

	
}