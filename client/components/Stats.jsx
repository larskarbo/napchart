
import React from 'react'
import StatsElement from './StatsElement.jsx'
import mapObject from '../helpers/mapObject'

export default class Header extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const {elements, types} = this.props
    
    return(
      <div>
        {mapObject(types, type => (
          <StatsElement elements={elements} key={type.id} type={type} />
        ))}
      </div>
    )
  }

}