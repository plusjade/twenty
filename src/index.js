import React            from 'react'
import ReactDOM         from 'react-dom'

import Home             from './Home'
import Player           from './components/Player'
import Recorder         from './components/Recorder'
import withRecord       from './withRecord'
import withPlay         from './withPlay'

import QueryParams      from './lib/QueryParams'

import registerServiceWorker from './registerServiceWorker'
import './index.css'

const QParams = QueryParams()
const videoId = QParams.get("id")
const parts = window.location.pathname.split("/")
let app
let props = {}

if (parts[1] === "make") {
  app = withRecord(Recorder)
} else if (videoId) {
  app = withPlay(Player)
  props.videoId = videoId
} else {
  app = Home
}

ReactDOM.render(React.createElement(app, props), document.getElementById('root'))
registerServiceWorker()
