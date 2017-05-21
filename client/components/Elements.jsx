

import React from 'react'
import Element from './Element.jsx'

export default ({elements, onDeleteElement=() => {}, onEditElement, ...props}) => {

	return (
     <div>
     	{elements.map((element, index) => 
	  		(
	  			<div key={index}>
	  				<Element element={element}
	  				onDeleteElement={onDeleteElement.bind(null, index)} 
	  				onEditElement={onEditElement.bind(null, index)} />
	  			</div>
	  		)
	  	)}
     </div>
    )
}