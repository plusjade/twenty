import React            from 'react'
import ReactDOM         from 'react-dom'

import QueryParams      from 'lib/QueryParams'

import Player           from 'components/Player'
import Recorder         from 'components/Recorder'

import Home             from 'containers/Home'
import withPlay         from 'containers/withPlay'
import withRecord       from 'containers/withRecord'

import data from 'db/data'
import { getSubstitutions } from 'db/substitutions'
import Things               from 'lib/Things'

import './index.css'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const QParams = QueryParams()
const videoId = QParams.get("id")
const parts = window.location.pathname.split("/")
let app
let props = {
  resultRendererEnabled: !QParams.get("disable_result")
}

if (parts[1] === "make") {
  app = withRecord(Recorder)
} else if (videoId) {
  const computedThings = Things(data.things, getSubstitutions(QParams.get("p")))

  app = withPlay(Player)
  props = {...props, videoId, things: computedThings}
} else {
  app = Home
}

ReactDOM.render(React.createElement(app, props), document.getElementById('root'))
