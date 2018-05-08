import Radium from 'radium'
import React, { PureComponent }   from 'react'
import { token } from 'lib/actions'
import VideoCard from 'components/VideoCard/VideoCard'

import style                from './Style'

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

   reload = () => {
    this.setState({entropy: Math.random()})
  }

  render() {
    const videos = getVideos()
    return (
      <div style={style.wrap}>
        <div style={style.video}>
          <a
            href={'#new'}
            onClick={this.handleCreateNew}
            style={style.inner}
          >
            <span>{'+ new'}</span>
          </a>
        </div>
        {videos.map((v, i) => (
          <VideoCard
            key={v.videoId}
            videoId={v.videoId}
            reload={this.reload}
            created_at={v.created_at}
            offset={i % 2 === 1}
          />
        ))}
        {true && (
          <div style={style.video}>
            <a
              href={'#new'}
              onClick={this.handleCreateNew}
              style={style.inner}
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
