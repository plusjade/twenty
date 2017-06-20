import React from 'react'
import ReactDOM from 'react-dom'
import AppPlay from './AppPlay'
import AppRecord from './AppRecord'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
const parts = window.location.pathname.split("/")
let app
if (parts[1] === "make") {
  app = <AppRecord />
} else {
  app = <AppPlay />
}

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
