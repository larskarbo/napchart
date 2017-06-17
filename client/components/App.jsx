
import update from 'react-addons-update';
import fetch from 'whatwg-fetch'

import React from 'react'
import Header from './Header.jsx'
import ChartContainer from '../containers/ChartContainer.jsx'
import ElementsContainer from '../containers/ElementsContainer.jsx'
import TypesContainer from '../containers/TypesContainer.jsx'
import MetaInfoContainer from '../containers/MetaInfoContainer.jsx'
import HeaderContainer from '../containers/HeaderContainer.jsx'
import Types from './Types.jsx'

import styles from '../styles/index.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      elements: [
      ],
      selected: [],
      types: [
      ]
    }
    props.store.dispatch({
      type:'SET_ELEMENTS',
      elements:[{
        id: 0,
        start: 50,
        end: 150,
        text: 'Very cool app',
        typeId: 0
      },{
        id: 1,
        start: 50,
        end: 150,
        text: 'Very cool app',
        typeId: 1
      }]
    })
    props.store.dispatch({
      type:'SET_TYPES',
      typeElements:{
        0: {
          id:'0',
          name:'Sleep',
          style:'blue',
          lane:1
        },
        1: {
          id:'1',
          name:'Work',
          style:'green',
          lane:0
        }
      }
    })
  }

  componentDidMount() {
    this.checkURLAndGetChart()

  }

  componentWillUpdate(nextProps, nextState){
    // console.log(JSON.parse(JSON.stringify(nextState)))
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
           <TypesContainer />
         </div>
       </div>
     </div>);
  }

  updateData = (data) => {
  	this.setState(data)
  }


  saveChart = () => {
    console.log('saving')
    var data = JSON.parse(JSON.stringify(this.state))

    // data.types.forEach(type => {
    //   type.style = type.style.name
    // })

    data.elements.forEach(element => {
      delete element.type
    })

    // axios.post('/api/create', {
    //   lol: 'lars',
    //   data: JSON.stringify(data)
    // })
    // .then(function (response) {
    //   console.log(response)
    //   var chartid = response.data.id
    //   window.history.pushState(response.data, "", '/c/'+chartid)
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }

  checkURLAndGetChart = () => {
    var url = window.location.href

    if(url.search('/c/') == -1){
      return
    }

    var splitted = url.split('/')
    var chartid = splitted[splitted.length - 1]

    // axios.get(`/api/get?chartid=${chartid}`, )
    // .then(response => {
    //   this.connectTypes(response.data.data)
    //   this.setState(response.data.data)

    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }


}