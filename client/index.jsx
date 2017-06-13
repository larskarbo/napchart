/*
    ./client/index.js
    which is the webpack entry file
*/

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App.jsx'

let store = createStore(todoApp)

render(
  <Provider store={store}>
	  <App store={store} />
	</Provider>,
  document.getElementById('root')
)