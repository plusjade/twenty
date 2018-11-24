import React from 'react'
import ReactDOM from 'react-dom'
import debounce from 'lodash.debounce'
import Player from 'components/Player/Player'
import { videosFind, videosSave, dateId } from 'lib/actions'
import BlocksRegistry from 'models/BlocksRegistry'
import Video from 'models/Video'
import renderNotFound from 'pages/renderNotFound'

const renderPlayer = ({
  videoId,
  canEdit,
  isEmbed,
  isDebug
}) => {
  videosFind(videoId).then((videoData) => {
    let subscribe = () => {}
    if (canEdit) {
      subscribe = (data) => {
        console.log(data)
        videosSave(videoId, data)
      }
    }
    const video = new Video({
      ...videoData,
      id: videoId,
      subscribe: debounce(subscribe, 500),
    })

    const todayId = dateId()
    const hasTodaysScene = video.getScenes().some(scene => scene.dateId === todayId)
    if (!hasTodaysScene) {
      const sceneId = video.addScene()
      const types = ['tag','list']
      types.forEach((type) => {
        const defaults = BlocksRegistry.defaults(type)
        video.addBlock({
          ...defaults,
          type,
          sceneId,
        })
      })
    }

    ReactDOM.render(
      React.createElement(Player, {
        video,
        canEdit,
        isEmbed,
        isDebug,
        blocksRegistry: BlocksRegistry.list()
      }),
      document.getElementById('root')
    )
  })
  .catch(() => {
    renderNotFound()
  })
}

export default renderPlayer
