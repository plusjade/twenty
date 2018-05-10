import React from 'react'
import ReactDOM from 'react-dom'
import Player from 'components/Player'
import withPlay from 'containers/withPlay'
import { videosFind, videosSave } from 'lib/actions'
import Video from 'lib/Video'
import randomEmoji from 'db/randomEmoji'
import debounce from 'lodash.debounce'

const player = (videoId, canEdit) => {
  const props = {canEdit}
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

export default player
