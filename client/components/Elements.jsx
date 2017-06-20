
import React from 'react'
import Element from './Element.jsx'
import Button from './Button.jsx'

export default class Elements extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {elements, elementsToShow, types} = this.props

    return (
      <div style={{paddingTop: '100px'}}>
        {elementsToShow.map((element) =>
          (
            <div key={element.id}>
              <Element
                onElementUpdate={this.props.onElementUpdate.bind(element)}
                onDeleteElement={this.props.onDeleteElement.bind(null, element.id)}
                onDeselect={this.props.onDeselect}
                element={element} types={types}

              />
            </div>
          )
        )}
      </div>
    )
  }
}
