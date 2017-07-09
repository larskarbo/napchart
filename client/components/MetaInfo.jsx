
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
      <div className="metaInfo">
        <input type='text' placeholder='Title' onFocus={this.props.onFocus} value={metaInfo.title}
          onChange={this.props.onTitleChange} />
        <textarea type='text' placeholder='Description' onFocus={this.props.onFocus} value={metaInfo.description}
          onChange={this.props.onDescriptionChange} />
      </div>
    )
  }
}
