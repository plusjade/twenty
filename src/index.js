import React            from 'react'
import ReactDOM         from 'react-dom'

import QueryParams      from 'lib/QueryParams'
import VideosDB         from 'lib/VideosDB'

import Player           from 'components/Player'
import Recorder         from 'components/Recorder'

import Home             from 'containers/Home'
import withPlay         from 'containers/withPlay'
import withRecord       from 'containers/withRecord'

import TextingDB from 'texting/lib/TextingDB'
import WordsDB   from 'words/lib/WordsDB'

import QuizDB             from 'quiz/lib/QuizDB'
import PersonalizerDB     from 'lib/PersonalizerDB'
import './index.css'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const Words = WordsDB()
const Texting = TextingDB()
const Quiz = QuizDB()

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

let substitutions = PersonalizerDB.francine
if (PersonalizerDB[QParams.get("p") || "__"]) {
  substitutions = PersonalizerDB[QParams.get("p")]
}

if (parts[1] === "make") {
  app = withRecord(Recorder)
} else if (videoId) {
  app = withPlay(Player)
  props.videoId = videoId
  props.substitutions = substitutions
  props.scenes = [
    {
      type: "words",
      data: Words.data,
      out: 1000,
    },
    {
      type: "quiz",
      data: Quiz.one,
      in: 1000,
    },
    {
      type: "words",
      data: Words.agreed,
      in: 1000,
    },
    {
      type: "texting",
      data: Texting.messages,
    },
    {
      type: "words",
      data: Words.data2,
      in: 1000,
    },
    {
      type: "words",
      data: Words.data3,
      in: 1000,
    },
  ]
} else {
  app = Home
}

ReactDOM.render(React.createElement(app, props), document.getElementById('root'))
