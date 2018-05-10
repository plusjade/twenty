import React from 'react'
import ReactDOM from 'react-dom'
import Player from 'components/Player'
import withPlay from 'containers/withPlay'
import { videosFind, videosSave } from 'lib/actions'
import Video from 'lib/Video'
import debounce from 'lodash.debounce'

import notFound from './notFound'

const player = (videoId, canEdit) => {
  const props = {canEdit}
  videosFind(videoId).then((videoData) => {
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
    notFound()
  })
}

export default player
