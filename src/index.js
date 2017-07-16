import React            from 'react'
import ReactDOM         from 'react-dom'

import QueryParams      from 'lib/QueryParams'
import VideosDB         from 'lib/VideosDB'

import Player           from 'components/Player'
import Recorder         from 'components/Recorder'

import Home             from 'containers/Home'
import withPlay         from 'containers/withPlay'
import withRecord       from 'containers/withRecord'

import ConvosDB from 'lib/ConvosDB'
import SlidesDB from 'lib/SlidesDB'
import './index.css'

const Slides = SlidesDB()
const Convos = ConvosDB()

const API_ENDPOINT = (
  (process.env === "prod")
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
  app = withPlay(Player)
  props.videoId = videoId
  props.slides = Slides.data
  props.slides2 = Slides.data2
  props.convo = Convos.messages
} else {
  app = Home
}

ReactDOM.render(React.createElement(app, props), document.getElementById('root'))
