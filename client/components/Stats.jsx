
import React from 'react'
import StatsElement from './StatsElement.jsx'
import values from 'lodash/values'


export default class Header extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const {elements, types} = this.props
    
    return(
      <div>
        {values(types).map(type => (
          <StatsElement elements={elements} key={type.id} type={type} />
        ))}
      </div>
    )
  }

}