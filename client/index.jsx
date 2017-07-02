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

window.allActions = []
function logger({getState}) {
  return next => action => {
    // console.log('dispatching' , JSON.stringify(action))
    allActions.push(action)
    return next(action)
  }
}

let store = createStore(rootReducer,
	compose(
		applyMiddleware(thunkMiddleware),
    applyMiddleware(logger),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)

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
