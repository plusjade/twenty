import React            from 'react'
import ReactDOM         from 'react-dom'

import Player           from './components/Player'
import Recorder         from './components/Recorder'
import withRecord       from './withRecord'
import withPlay         from './withPlay'

import registerServiceWorker from './registerServiceWorker'
import './index.css'

const parts = window.location.pathname.split("/")
let app
if (parts[1] === "make") {
  app = withRecord(Recorder)
} else {
  app = withPlay(Player)
}

ReactDOM.render(React.createElement(app), document.getElementById('root'))
registerServiceWorker()
