
import update from 'react-addons-update';
import fetch from 'whatwg-fetch'

import React from 'react'
import Header from './Header.jsx'
import ChartContainer from '../containers/ChartContainer.jsx'
import ElementsContainer from '../containers/ElementsContainer.jsx'
import MetaInfoContainer from '../containers/MetaInfoContainer.jsx'
import HeaderContainer from '../containers/HeaderContainer.jsx'

import styles from '../styles/index.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
     <div style={{textAlign: 'center'}} className="grid">
     
       <HeaderContainer />

       <div className="grid">

         <div className="col-1-4 sidebar">
          <MetaInfoContainer />
         </div>

         <div className="col-1-2">
          <ChartContainer />
         </div>

         <div className="col-1-4">
           <ElementsContainer />
           
         </div>
       </div>
     </div>);
  }
}