/*
    ./client/index.js
    which is the webpack entry file
*/

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'

import { fetchChartIfNeeded } from './actions/actions.js'

import App from './components/App.jsx'

window.replayable = []
function logger({getState}) {
  return next => action => {
    // console.log('dispatching' , JSON.stringify(action))
    replayable.push(action)
    return next(action)
  }
}
if(typeof window.__REDUX_DEVTOOLS_EXTENSION__ != 'undefined'){
  var composed = compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}else {
  var composed = compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(logger)
  )
}


let store = createStore(rootReducer, composed)

// if(process.env.NODE_ENV == 'production'){
//   let store = createStore(rootReducer,
//     compose(
//       applyMiddleware(thunkMiddleware),
//       applyMiddleware(logger)
//     )
//   )
// } else {
  
// }




store.dispatch({
  type:"SET_DEFAULT_DATA",
  data: {
    // metaInfo: {
    //   title: '',
    //   description: ''
    // },
    chartData: {
      shape: 'circle',
      types: {
        '0': {
          id: 0,
          name: 'Sleep',
          style: 'gray'
        },
        '2': {
          id: 2,
          name: 'Activities',
          style: 'red'
        },
        '3': {
          id: 3,
          name: '',
          style: 'blue'
        }
      },
      // elements: []
    }
  }
})

store.dispatch(fetchChartIfNeeded())

render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root')
)
