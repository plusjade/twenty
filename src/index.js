import React            from 'react'
import ReactDOM         from 'react-dom'

import QueryParams      from 'lib/QueryParams'

import Player           from 'components/Player'
import Recorder         from 'components/Recorder'

import Home             from 'containers/Home'
import withPlay         from 'containers/withPlay'
import withRecord       from 'containers/withRecord'

import registerServiceWorker from 'registerServiceWorker'

import 'index.css'

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
