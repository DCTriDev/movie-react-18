import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'

import App from './App'
import store from '@redux/store'
import 'antd/dist/antd.min.css'
import './index.css'
import '@styles/antd.custom.css'

const root = createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)

export default store

reportWebVitals()
