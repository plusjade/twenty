import React            from 'react'
import ReactDOM         from 'react-dom'

import QueryParams      from 'lib/QueryParams'
import Player           from 'components/Player'
import withPlay         from 'containers/withPlay'
import Home             from 'containers/Home'
import { videoFind, videoSave } from 'lib/actions'
import Video from 'lib/Video'
import randomEmoji from 'db/randomEmoji'

import './index.css'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const QParams = QueryParams()
const videoId = QParams.get("id")
const canEdit = !!QParams.get("edit")
let app
let props = {canEdit}

if (videoId) {
  let video
  const subscribe = canEdit
    ? (data) => {
        // console.log("monitor SUBSCRIBE")
        // console.log(data)
        videoSave(videoId, data)
      }
    : () => {}
  const videoData = videoFind(videoId)

  if (videoData) {
    video = new Video({...videoData, subscribe})
  } else {
    video = new Video({subscribe})
    const sceneId = video.addScene()
    video.addBlock({
      type: "words",
      data: {
        content: `${randomEmoji(3)}`,
      },
      style: {
        color: "#FFF",
      },
      sceneId: sceneId,
    })
  }

  app = withPlay(Player)
  props = {...props, video}
} else {
  app = Home
  window.document.body.style.overflow = 'auto'
}

ReactDOM.render(React.createElement(app, props), document.getElementById('root'))
