
import update from 'react-addons-update'
import fetch from 'whatwg-fetch'
import MediaQuery from 'react-responsive'

import React from 'react'
import Header from './Header.jsx'
import ChartContainer from '../containers/ChartContainer.jsx'
import MetaInfoContainer from '../containers/MetaInfoContainer.jsx'
import HeaderContainer from '../containers/HeaderContainer.jsx'
import TypesContainer from '../containers/TypesContainer.jsx'
import StatsContainer from '../containers/StatsContainer.jsx'
import SelectedContainer from '../containers/SelectedContainer.jsx'
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
          <div className='mainChartArea'>
            <ChartContainer />
          </div>

          <MediaQuery query='(min-width: 600px)'>
            <div className='sidebar'>
              <MetaInfoContainer />
              <ShapesContainer />
              <SelectedContainer />
              <TypesContainer />
            </div>
          </MediaQuery>

          <MediaQuery query='(max-width: 600px)'>
            <div className='padding'>
              <TypesContainer />
              <SelectedContainer />
              <MetaInfoContainer />
              <ShapesContainer />
            </div>
          </MediaQuery>

          
        </div>
        
        

        
      </div>)
  }
}
