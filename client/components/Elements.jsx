

import React from 'react'
import Element from './Element.jsx'

export default ({elements, onDeleteElement=() => {}, onEditElement, ...props}) => {
	return (
     <div style={{paddingTop: '100px'}}>
     	{elements.map((element) => 
	  		(
	  			<div key={element.id}>
	  				<Element element={element} types={props.types}
	  				onDeleteElement={onDeleteElement.bind(null, element)} 
	  				onDuplicateElement={props.onDuplicateElement.bind(null, element)} 
	  				onEditElement={onEditElement.bind(null, element)}
	  				onMoveLaneUp={props.onMoveLaneUp.bind(null, element)}
	  				onMoveLaneDown={props.onMoveLaneDown.bind(null, element)}
	  				/>
	  			</div>
	  		)
	  	)}
     </div>
    )
}