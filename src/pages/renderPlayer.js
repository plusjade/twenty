import React from 'react'
import ReactDOM from 'react-dom'
import debounce from 'lodash.debounce'
import Player from 'components/Player/Player'
import { videosFind, videosSave, dateId } from 'lib/actions'
import BlocksRegistry from 'models/BlocksRegistry'
import Video from 'models/Video'
import renderNotFound from 'pages/renderNotFound'
import { DateTime } from 'luxon'
import training from 'db/training'

const renderPlayer = ({
  videoId,
  canEdit,
  isEmbed,
  isDebug,
  isTest,
}) => {
  videosFind(videoId).then((videoData) => {
    let subscribe = () => {}
    if (canEdit) {
      subscribe = (data) => {
        console.log(data)
        // videosSave(videoId, data)
      }
    }
    const video = new Video({
      ...videoData,
      id: videoId,
      subscribe: debounce(subscribe, 500),
    })

    if (isTest) {
      const scenes = video.getScenes()
      training.forEach((d) => {
        const hasDate = scenes.some(scene => scene && scene.dateId === d.dateId)
        if (!hasDate) {
          const date = DateTime.fromMillis(new Date(d.dateId).getTime())
          const sceneId = video.addScene(date.toLocaleString())
          const scene = video.getScene(sceneId)
          scene.setDate(date.toJSDate())

          if (d.tag) {
            const defaults = BlocksRegistry.defaults('tag')
            video.addBlock({
              ...defaults,
              type: 'tag',
              sceneId,
              content: d.tag,
            })
          }

          if (d.list) {
            const defaults = BlocksRegistry.defaults('list')
            video.addBlock({
              ...defaults,
              type: 'list',
              sceneId,
              content: d.list.join('\n')
            })
          }
        }
      })
    }

    const anchor = DateTime.local().minus({days: 7})
    new Array(8).fill(null).forEach((_, i) => {
      if (i % 2 === 0) { return }
      const date = anchor.plus({days: i})
      const sceneId = video.addScene(date.toLocaleString())
      const scene = video.getScene(sceneId)
      scene.setDate(date.toJSDate())

      const types = ['tag','list']
      types.forEach((type) => {
        const defaults = BlocksRegistry.defaults(type)
        video.addBlock({
          ...defaults,
          type,
          sceneId,
        })
      })

    })

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
  // .catch(() => {
  //   renderNotFound()
  // })
}

export default renderPlayer
