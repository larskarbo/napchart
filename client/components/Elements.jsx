
import React from 'react'
import Element from './Element.jsx'
import Button from './Button.jsx'

export default class Elements extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {elements, elementsToShow, types} = this.props
    var disabled = true
    if(elementsToShow.length > 0){
      disabled = false
    }
    return (
      <div>
        <div key={element.id}>
          <Element
            disabled={disabled}
            onElementUpdate={this.props.onElementUpdate.bind({id: element.id, text: element.text})}
            onDeleteElement={this.props.onDeleteElement.bind(null, element.id)}
            onDeselect={this.props.onDeselect}
            element={element} types={types}

          />
        </div>
      </div>
    )
  }
}
