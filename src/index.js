import React            from 'react'
import ReactDOM         from 'react-dom'

import QueryParams      from 'lib/QueryParams'

import Player           from 'components/Player'
import Home             from 'containers/Home'
import withPlay         from 'containers/withPlay'

import video from 'db/video'

import './index.css'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const QParams = QueryParams()
const videoId = QParams.get("id")
const parts = window.location.pathname.split("/")
let app
let props = {canEdit: !!QParams.get("edit")}

if (videoId) {
  app = withPlay(Player)
  props = {...props, videoId, video}
} else {
  app = Home
  window.document.body.style.overflow = 'auto'
}

ReactDOM.render(React.createElement(app, props), document.getElementById('root'))
