
import React from 'react'
import Element from './Element.jsx'
import Button from './Button.jsx'

export default class Elements extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {metaInfo} = this.props

    return (
      <div>
        <input type='text' placeholder='Title' value={metaInfo.title}
          onChange={this.props.onTitleChange} />
        <textarea type='text' placeholder='Description' value={metaInfo.description}
          onChange={this.props.onDescriptionChange} />

      </div>
    )
  }
}
