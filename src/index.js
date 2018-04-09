import React            from 'react'
import ReactDOM         from 'react-dom'

import QueryParams      from 'lib/QueryParams'
import VideosDB         from 'lib/VideosDB'

import Player           from 'components/Player'
import Recorder         from 'components/Recorder'

import Home             from 'containers/Home'
import withPlay         from 'containers/withPlay'
import withRecord       from 'containers/withRecord'

import scenes from 'db/scenes'
import { getSubstitutions } from 'db/substitutions'

import './index.css'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const API_ENDPOINT = (
  process.env.NODE_ENV === 'production'
    ? "https://www.getdamon.com/videos"
    : "http://localhost:4000/videos"
)
const videosDB = VideosDB(API_ENDPOINT)
const QParams = QueryParams()
const videoId = QParams.get("id")
const parts = window.location.pathname.split("/")
let app
let props = {
  videosDB: videosDB,
  resultRendererEnabled: !QParams.get("disable_result")
}

if (parts[1] === "make") {
  app = withRecord(Recorder)
} else if (videoId) {
  const substitutions = getSubstitutions(QParams.get("p"))

  app = withPlay(Player)
  props = {...props, videoId, substitutions, scenes}
} else {
  app = Home
}

ReactDOM.render(React.createElement(app, props), document.getElementById('root'))
