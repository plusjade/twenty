import Radium from 'radium'
import React, { PureComponent }   from 'react'
import QueryParams from 'lib/QueryParams'
import { token, videoRemove } from 'lib/actions'
import EditorButton from 'components/EditorButton/EditorButton'
import VideoCard from 'components/VideoCard/VideoCard'

import style                from './Style'

const QParams = QueryParams()

const getVideos = () => (
  Object.keys(window.localStorage)
    .filter(key => key.startsWith('video_'))
    .map(key => ({
      videoId: key.replace('video_', ''),
      created_at: ""
    }))
)

class VideosList extends PureComponent {
   handleCreateNew = (e) => {
    e.preventDefault()
    window.location = `/?id=${token()}&edit=1`
  }

  render() {
    const videos = getVideos()
    return (
      <div style={style.wrap}>
        <div style={[style.video, style.create]}>
          <a
            href={'#new'}
            onClick={this.handleCreateNew}
            style={[style.inner, style.createInner]}
          >
            <span>{'+ new'}</span>
          </a>
        </div>
        {videos.map((v, i) => (
          <VideoCard
            key={v.videoId}
            videoId={v.videoId}
            created_at={v.created_at}
            offset={i % 2 === 1}
          />
        ))}
        {true && (
          <div style={[style.video, style.create]}>
            <a
              href={'#new'}
              onClick={this.handleCreateNew}
              style={[style.inner, style.createInner]}
            >
              <span>{'+ new'}</span>
            </a>
          </div>
        )}
      </div>
    )
  }
}

export default Radium(VideosList)
