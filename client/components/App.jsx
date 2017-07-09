
import update from 'react-addons-update'
import fetch from 'whatwg-fetch'

import React from 'react'
import Header from './Header.jsx'
import ChartContainer from '../containers/ChartContainer.jsx'
import MetaInfoContainer from '../containers/MetaInfoContainer.jsx'
import HeaderContainer from '../containers/HeaderContainer.jsx'
import TypesContainer from '../containers/TypesContainer.jsx'
import StatsContainer from '../containers/StatsContainer.jsx'
import ElementsContainer from '../containers/ElementsContainer.jsx'
import ShapesContainer from '../containers/ShapesContainer.jsx'
import Sidebar from './Sidebar.jsx'

import styles from '../styles/index.scss'

export default class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div style={{textAlign: 'center'}} className='grid'>

        <HeaderContainer />

        <div className='grid'>

          <div className='sidebar'>
            <MetaInfoContainer />
            <ShapesContainer />
            <ElementsContainer />
            <Sidebar />
          </div>

          <div className='mainChartArea'>
            <ChartContainer />
          </div>

        </div>
      </div>)
  }
}
