import React            from 'react'
import ReactDOM         from 'react-dom'

import QueryParams      from 'lib/QueryParams'
import Player           from 'components/Player'
import withPlay         from 'containers/withPlay'
import Home             from 'containers/Home'
import { videosFind, videosSave, canEditVideo } from 'lib/actions'
import Video from 'lib/Video'
import randomEmoji from 'db/randomEmoji'
import debounce from 'lodash.debounce'

import './index.css'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const QParams = QueryParams()
const videoId = QParams.get("id")
const canEdit = !!QParams.get("edit") && canEditVideo(videoId)
const props = {canEdit}

if (!videoId) {
  window.document.body.style.overflow = 'auto'
  ReactDOM.render(
    React.createElement(
      Home,
      {}
    ),
    document.getElementById('root')
  )
} else {
  videosFind(videoId)
  .then((videoData) => {
    const subscribe = canEdit
      ? (data) => {
          // console.log("monitor SUBSCRIBE")
          // console.log(data)
          videosSave(videoId, data)
        }
      : () => {}
    const debouncedSubscribe = subscribe ? debounce(subscribe, 500) : () => {}
    const video = new Video({...videoData, subscribe: debouncedSubscribe})
    ReactDOM.render(
      React.createElement(
        withPlay(Player),
        {...props, video}
      ),
      document.getElementById('root')
    )
  })
  .catch(() => {
    const video = new Video()
    const sceneId = video.addScene()
    video.addBlock({
      type: "words",
      data: {
        content: "Sorry that video wasn't found",
      },
      style: {
        color: "#FFF",
      },
      position: [0, '-15vh'],
      sceneId: sceneId,
    })
    video.addBlock({
      type: "words",
      data: {
        content: `${randomEmoji(3)}`,
      },
      style: {
        color: "#FFF",
      },
      offset: 200,
      position: [0, '15vh'],
      sceneId: sceneId,
    })

    ReactDOM.render(
      React.createElement(
        withPlay(Player),
        {...props, video}
      ),
      document.getElementById('root')
    )
  })
}
