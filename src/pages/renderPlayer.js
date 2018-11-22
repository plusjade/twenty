import React from 'react'
import ReactDOM from 'react-dom'
import debounce from 'lodash.debounce'
import { dateStampGenerate } from 'lib/actions'
import Player from 'components/Player/Player'
import { videosFind, videosSave } from 'lib/actions'
import BlocksRegistry from 'models/BlocksRegistry'
import Video from 'models/Video'
import renderNotFound from 'pages/renderNotFound'

const renderPlayer = ({
  videoId,
  canEdit,
  isEmbed,
  isDebug
}) => {
  const props = {
    canEdit,
    isEmbed,
    isDebug,
    blocksRegistry: BlocksRegistry.list()
  }
  videosFind(videoId).then((videoData) => {
    const subscribe = canEdit
      ? (data) => {
          console.log(data)
          videosSave(videoId, data)
        }
      : () => {}
    const debouncedSubscribe = subscribe
      ? debounce(subscribe, 500)
      : () => {}
    const video = new Video({
      ...videoData,
      subscribe: debouncedSubscribe,
      id: videoId,
    })

    // WIP
    video.getScenes().forEach((scene) => {
      scene.dateStamp = dateStampGenerate()
    })

    ReactDOM.render(
      React.createElement(Player, {...props, video}),
      document.getElementById('root')
    )
  })
  .catch(() => {
    renderNotFound()
  })
}

export default renderPlayer
